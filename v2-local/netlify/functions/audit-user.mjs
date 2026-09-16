import pg from "pg";
import { jsonResponse, requireEnv, verifyTokenFromEvent } from "./_audit-auth.mjs";

const { Pool } = pg;

export async function handler(event) {
  if (event.httpMethod !== "GET") {
    return jsonResponse(405, { error: "method_not_allowed" });
  }

  if (!verifyTokenFromEvent(event)) {
    return jsonResponse(401, { error: "unauthorized" });
  }

  const investorId = event.queryStringParameters?.investor_id || "";

  if (!/^\d{1,20}$/.test(investorId)) {
    return jsonResponse(400, { error: "invalid_investor_id" });
  }

  const pool = new Pool({
    connectionString: requireEnv("DATABASE_URL"),
    ssl: { rejectUnauthorized: false },
    max: 2
  });

  try {
    const [holdings, impact, demographics, rawCoverage] = await Promise.all([
      pool.query(
        "select * from sidecar_publish.investor_holdings_summary where investor_id = $1",
        [investorId]
      ),
      pool.query(
        "select * from sidecar_publish.investor_impact_summary where investor_id = $1",
        [investorId]
      ),
      pool.query(
        `
        select *
        from sidecar_ingest.demographics
        where userid = $1
           or (userid ~ '^[0-9]+$' and userid::bigint = $1::bigint)
        limit 1
        `,
        [investorId]
      ),
      pool.query(
        `
        select
          count(*)::int as raw_holding_rows,
          count(*) filter (where m.mapping_status = 'mapped')::int as mapped_holding_rows,
          coalesce(sum(h.current_value), 0)::text as raw_current_value,
          coalesce(sum(h.current_value) filter (where m.mapping_status = 'mapped'), 0)::text as mapped_current_value
        from sidecar_ingest.investment_holdings_current h
        left join sidecar_ingest.offer_api_loan_map m
          on m.offer_name = h.offer_name
        where h.investor_id = $1
        `,
        [investorId]
      )
    ]);

    const councilNames = collectCouncilNames(holdings.rows[0], impact.rows[0], demographics.rows[0]);
    const councils = councilNames.length
      ? await pool.query(
          `
          select
            api_council_id,
            issuing_council,
            fields->>'hex' as hex,
            fields->>'whiteLogo' as white_logo_url,
            council_hub
          from sidecar_ingest.councils_current
          where issuing_council = any($1::text[])
          order by issuing_council
          `,
          [councilNames]
        )
      : { rows: [] };

    const found = Boolean(holdings.rows[0] || impact.rows[0] || demographics.rows[0]);
    const coverage = rawCoverage.rows[0] || null;

    return jsonResponse(200, {
      ok: true,
      found,
      investor_id: investorId,
      holdings: holdings.rows[0] || null,
      impact: impact.rows[0] || null,
      demographics: demographics.rows[0] || null,
      councils: councils.rows,
      diagnostics: {
        holdings_summary_rows: holdings.rowCount,
        impact_summary_rows: impact.rowCount,
        demographics_rows: demographics.rowCount,
        raw_holding_rows: coverage?.raw_holding_rows || 0,
        mapped_holding_rows: coverage?.mapped_holding_rows || 0,
        raw_current_value: coverage?.raw_current_value || "0",
        mapped_current_value: coverage?.mapped_current_value || "0"
      }
    });
  } catch (error) {
    return jsonResponse(500, {
      error: "audit_lookup_failed",
      message: error.message
    });
  } finally {
    await pool.end();
  }
}

function collectCouncilNames(...records) {
  const names = new Set();

  for (const record of records.filter(Boolean)) {
    for (const [key, value] of Object.entries(record)) {
      if (!value) continue;
      if (key.endsWith("council_name") || key === "council_name") {
        names.add(String(value));
      }
    }
  }

  return [...names];
}
