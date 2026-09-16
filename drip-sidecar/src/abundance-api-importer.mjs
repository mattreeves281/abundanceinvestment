const DEFAULT_ENDPOINTS = [
  {
    sourceName: "loans",
    url: "https://data.abundanceinvestment.com/loans"
  },
  {
    sourceName: "councils",
    url: "https://data.abundanceinvestment.com/councils"
  },
  {
    sourceName: "projects",
    url: "https://data.abundanceinvestment.com/projects"
  }
];

export async function importUseOfFundsData({ pool, endpoints = DEFAULT_ENDPOINTS, now = new Date() }) {
  const results = [];

  for (const endpoint of endpoints) {
    results.push(await importEndpoint({ pool, endpoint, now }));
  }

  return results;
}

async function importEndpoint({ pool, endpoint, now }) {
  const client = await pool.connect();
  let runId;

  try {
    await client.query("begin");

    const run = await client.query(
      `
      insert into sidecar_ingest.import_runs (source_name, status)
      values ($1, 'running')
      returning id
      `,
      [endpoint.sourceName]
    );

    runId = run.rows[0].id;

    const records = await fetchEndpointRecords(endpoint.url);

    for (const record of records) {
      await upsertRawRecord({ client, sourceName: endpoint.sourceName, record, runId, now });

      if (endpoint.sourceName === "loans") {
        await upsertLoan({ client, record, runId, now });
      }

      if (endpoint.sourceName === "councils") {
        await upsertCouncil({ client, record, runId, now });
      }

      if (endpoint.sourceName === "projects") {
        await upsertProject({ client, record, runId, now });
      }
    }

    if (endpoint.sourceName === "loans") {
      await refreshOfferLoanMap({ client });
    }

    await client.query(
      `
      update sidecar_ingest.import_runs
      set status = 'succeeded',
          completed_at = now(),
          records_imported = $2
      where id = $1
      `,
      [runId, records.length]
    );

    await client.query("commit");

    return {
      sourceName: endpoint.sourceName,
      runId,
      recordsImported: records.length
    };
  } catch (error) {
    await client.query("rollback");

    if (runId) {
      await client.query(
        `
        update sidecar_ingest.import_runs
        set status = 'failed',
            completed_at = now(),
            error_message = $2
        where id = $1
        `,
        [runId, error.message]
      );
    }

    throw error;
  } finally {
    client.release();
  }
}

async function refreshOfferLoanMap({ client }) {
  await client.query(
    `
    insert into sidecar_ingest.offer_api_loan_map (
      offer_name,
      api_loan_id,
      mapping_status,
      mapped_at
    )
    select
      investment_name,
      api_loan_id,
      'mapped',
      now()
    from sidecar_ingest.loans_current
    where investment_name is not null
    on conflict (offer_name)
    do update set
      api_loan_id = excluded.api_loan_id,
      mapping_status = excluded.mapping_status,
      mapped_at = excluded.mapped_at
    `
  );
}

async function fetchEndpointRecords(url) {
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`API fetch failed for ${url} with HTTP ${response.status}`);
  }

  const body = await response.json();
  return Array.isArray(body) ? body : body.records || [];
}

async function upsertRawRecord({ client, sourceName, record, runId, now }) {
  await client.query(
    `
    insert into sidecar_ingest.api_records_current (
      source_name,
      source_id,
      source_created_at,
      fields,
      raw_record,
      imported_at,
      import_run_id
    )
    values ($1, $2, $3, $4::jsonb, $5::jsonb, $6, $7)
    on conflict (source_name, source_id)
    do update set
      source_created_at = excluded.source_created_at,
      fields = excluded.fields,
      raw_record = excluded.raw_record,
      imported_at = excluded.imported_at,
      import_run_id = excluded.import_run_id
    `,
    [
      sourceName,
      record.id,
      record.createdTime || null,
      JSON.stringify(record.fields || {}),
      JSON.stringify(record),
      now,
      runId
    ]
  );
}

async function upsertLoan({ client, record, runId, now }) {
  const fields = record.fields || {};

  await client.query(
    `
    insert into sidecar_ingest.loans_current (
      api_loan_id,
      source_created_at,
      investment_name,
      raise_status,
      issuing_council,
      council_api_id,
      rate_of_return,
      target_amount,
      loan_amount,
      total_deployed,
      open_date,
      close_date,
      term_start_date,
      maturity_date,
      investment_url,
      fields,
      imported_at,
      import_run_id
    )
    values (
      $1, $2, $3, $4, $5, $6, $7, $8, $9,
      $10, $11, $12, $13, $14, $15, $16::jsonb, $17, $18
    )
    on conflict (api_loan_id)
    do update set
      source_created_at = excluded.source_created_at,
      investment_name = excluded.investment_name,
      raise_status = excluded.raise_status,
      issuing_council = excluded.issuing_council,
      council_api_id = excluded.council_api_id,
      rate_of_return = excluded.rate_of_return,
      target_amount = excluded.target_amount,
      loan_amount = excluded.loan_amount,
      total_deployed = excluded.total_deployed,
      open_date = excluded.open_date,
      close_date = excluded.close_date,
      term_start_date = excluded.term_start_date,
      maturity_date = excluded.maturity_date,
      investment_url = excluded.investment_url,
      fields = excluded.fields,
      imported_at = excluded.imported_at,
      import_run_id = excluded.import_run_id
    `,
    [
      record.id,
      record.createdTime || null,
      text(fields.investmentName),
      text(fields.raiseStatus),
      firstText(fields.issuingCouncil),
      firstText(fields.councilID),
      numberOrNull(fields.rateOfReturn),
      numberOrNull(fields.targetAmount),
      numberOrNull(fields.loanAmount),
      numberOrNull(fields.totalDeployed),
      dateOrNull(fields.openDate),
      dateOrNull(fields.closeDate),
      dateOrNull(fields.termStartDate),
      dateOrNull(fields.maturityDate),
      text(fields.url),
      JSON.stringify(fields),
      now,
      runId
    ]
  );
}

async function upsertCouncil({ client, record, runId, now }) {
  const fields = record.fields || {};

  await client.query(
    `
    insert into sidecar_ingest.councils_current (
      api_council_id,
      source_created_at,
      issuing_council,
      raise_status,
      loans,
      total_raised,
      total_spent,
      total_returned,
      projects_funded,
      renewable_energy_spend,
      energy_efficiency_spend,
      clean_transportation_spend,
      pollution_prevention_spend,
      climate_change_adaptation_spend,
      living_natural_resources_spend,
      council_hub,
      fields,
      imported_at,
      import_run_id
    )
    values (
      $1, $2, $3, $4, $5, $6, $7, $8,
      $9, $10, $11, $12, $13, $14, $15,
      $16, $17::jsonb, $18, $19
    )
    on conflict (api_council_id)
    do update set
      source_created_at = excluded.source_created_at,
      issuing_council = excluded.issuing_council,
      raise_status = excluded.raise_status,
      loans = excluded.loans,
      total_raised = excluded.total_raised,
      total_spent = excluded.total_spent,
      total_returned = excluded.total_returned,
      projects_funded = excluded.projects_funded,
      renewable_energy_spend = excluded.renewable_energy_spend,
      energy_efficiency_spend = excluded.energy_efficiency_spend,
      clean_transportation_spend = excluded.clean_transportation_spend,
      pollution_prevention_spend = excluded.pollution_prevention_spend,
      climate_change_adaptation_spend = excluded.climate_change_adaptation_spend,
      living_natural_resources_spend = excluded.living_natural_resources_spend,
      council_hub = excluded.council_hub,
      fields = excluded.fields,
      imported_at = excluded.imported_at,
      import_run_id = excluded.import_run_id
    `,
    [
      record.id,
      record.createdTime || null,
      text(fields.issuingCouncil),
      text(fields.raiseStatus),
      integerOrNull(fields.loans),
      numberOrNull(fields.totalRaised),
      numberOrNull(fields.totalSpent),
      numberOrNull(fields.totalReturned),
      numberOrNull(fields.projectsFunded),
      numberOrNull(fields.renewableEnergySpend),
      numberOrNull(fields.energyEfficiencySpend),
      numberOrNull(fields.cleanTransportationSpend),
      numberOrNull(fields.pollutionPreventionSpend),
      numberOrNull(fields.climateChangeAdaptationSpend),
      numberOrNull(fields.livingNationalResourcesSpend),
      text(fields.councilHub),
      JSON.stringify(fields),
      now,
      runId
    ]
  );
}

async function upsertProject({ client, record, runId, now }) {
  const fields = record.fields || {};

  await client.query(
    `
    insert into sidecar_ingest.projects_current (
      api_project_id,
      source_created_at,
      project_name,
      description,
      category,
      total_spent,
      loan_name,
      council_name,
      total_left,
      total_raised,
      council_api_id,
      api_loan_id,
      fields,
      imported_at,
      import_run_id
    )
    values (
      $1, $2, $3, $4, $5, $6, $7,
      $8, $9, $10, $11, $12, $13::jsonb, $14, $15
    )
    on conflict (api_project_id)
    do update set
      source_created_at = excluded.source_created_at,
      project_name = excluded.project_name,
      description = excluded.description,
      category = excluded.category,
      total_spent = excluded.total_spent,
      loan_name = excluded.loan_name,
      council_name = excluded.council_name,
      total_left = excluded.total_left,
      total_raised = excluded.total_raised,
      council_api_id = excluded.council_api_id,
      api_loan_id = excluded.api_loan_id,
      fields = excluded.fields,
      imported_at = excluded.imported_at,
      import_run_id = excluded.import_run_id
    `,
    [
      record.id,
      record.createdTime || null,
      text(fields.projectName),
      text(fields.description),
      text(fields.category),
      numberOrNull(fields.totalSpent),
      firstText(fields.loanName),
      firstText(fields.councilName),
      firstNumber(fields.totalLeft),
      firstNumber(fields.totalRaised),
      firstText(fields.councilID),
      firstText(fields.loanID),
      JSON.stringify(fields),
      now,
      runId
    ]
  );
}

function firstText(value) {
  if (Array.isArray(value)) {
    return text(value[0]);
  }

  return text(value);
}

function firstNumber(value) {
  if (Array.isArray(value)) {
    return numberOrNull(value[0]);
  }

  return numberOrNull(value);
}

function text(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  return String(value);
}

function numberOrNull(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const number = Number(String(value).replace(/[^0-9.-]/g, ""));
  return Number.isFinite(number) ? number : null;
}

function integerOrNull(value) {
  const number = numberOrNull(value);
  return number === null ? null : Math.trunc(number);
}

function dateOrNull(value) {
  if (!value) {
    return null;
  }

  return String(value);
}
