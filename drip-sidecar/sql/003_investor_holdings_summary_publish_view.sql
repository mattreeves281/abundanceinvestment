create or replace view sidecar_publish.investor_holdings_summary as
with mapped_holdings_detail as (
  select
    h.investor_id,
    dim.dripid as drip_id,
    h.investment_id,
    h.current_value,
    h.original_value,
    h.number_of_units,
    h.investment_created_at,
    m.api_loan_id,
    l.investment_name as loan_name,
    l.council_api_id,
    c.issuing_council as council_name
  from sidecar_ingest.investment_holdings_current h
  join sidecar_ingest.offer_api_loan_map m
    on m.offer_name = h.offer_name
  join sidecar_ingest.loans_current l
    on l.api_loan_id = m.api_loan_id
  left join sidecar_ingest.councils_current c
    on c.api_council_id = l.council_api_id
  left join sidecar_ingest.drip_id_mapping dim
    on dim.investorid ~ '^[0-9]+$'
    and dim.investorid::bigint = h.investor_id
  where h.current_value > 0
    and m.mapping_status = 'mapped'
),
investor_totals as (
  select
    investor_id,
    max(drip_id) as drip_id,
    sum(current_value) as investor_current_value,
    sum(original_value) as investor_original_value,
    count(*) as investment_count,
    count(distinct api_loan_id) as loan_count,
    count(distinct council_api_id) as council_count,
    max(investment_created_at) as latest_investment_created_at
  from mapped_holdings_detail
  group by investor_id
),
loan_rollup as (
  select
    investor_id,
    api_loan_id,
    loan_name,
    council_api_id,
    council_name,
    sum(current_value) as current_value,
    sum(original_value) as original_value,
    count(*) as investment_count,
    max(investment_created_at) as latest_investment_created_at
  from mapped_holdings_detail
  group by investor_id, api_loan_id, loan_name, council_api_id, council_name
),
loan_ranked as (
  select
    lr.*,
    lr.current_value / nullif(it.investor_current_value, 0) as pct_of_current_portfolio,
    row_number() over (
      partition by lr.investor_id
      order by lr.current_value desc nulls last, lr.loan_name, lr.api_loan_id
    ) as loan_rank
  from loan_rollup lr
  join investor_totals it
    on it.investor_id = lr.investor_id
),
council_rollup as (
  select
    investor_id,
    council_api_id,
    council_name,
    sum(current_value) as current_value,
    sum(original_value) as original_value,
    count(distinct api_loan_id) as loan_count,
    count(*) as investment_count,
    max(investment_created_at) as latest_investment_created_at
  from mapped_holdings_detail
  group by investor_id, council_api_id, council_name
),
council_ranked as (
  select
    cr.*,
    cr.current_value / nullif(it.investor_current_value, 0) as pct_of_current_portfolio,
    row_number() over (
      partition by cr.investor_id
      order by cr.current_value desc nulls last, cr.council_name, cr.council_api_id
    ) as council_rank
  from council_rollup cr
  join investor_totals it
    on it.investor_id = cr.investor_id
),
latest_investment_ranked as (
  select
    mhd.*,
    row_number() over (
      partition by mhd.investor_id
      order by mhd.investment_created_at desc nulls last, mhd.investment_id desc
    ) as latest_investment_rank
  from mapped_holdings_detail mhd
),
top_loans_json as (
  select
    investor_id,
    jsonb_agg(
      jsonb_build_object(
        'rank', loan_rank,
        'api_loan_id', api_loan_id,
        'loan_name', loan_name,
        'api_council_id', council_api_id,
        'council_name', council_name,
        'current_value', current_value,
        'original_value', original_value,
        'pct_of_current_portfolio', pct_of_current_portfolio,
        'investment_count', investment_count
      ) order by loan_rank
    ) filter (where loan_rank <= 3) as top_loans
  from loan_ranked
  group by investor_id
),
top_councils_json as (
  select
    investor_id,
    jsonb_agg(
      jsonb_build_object(
        'rank', council_rank,
        'api_council_id', council_api_id,
        'council_name', council_name,
        'current_value', current_value,
        'original_value', original_value,
        'pct_of_current_portfolio', pct_of_current_portfolio,
        'loan_count', loan_count,
        'investment_count', investment_count
      ) order by council_rank
    ) filter (where council_rank <= 3) as top_councils
  from council_ranked
  group by investor_id
),
top_loan_columns as (
  select
    investor_id,
    max(api_loan_id) filter (where loan_rank = 1) as top_loan_1_id,
    max(loan_name) filter (where loan_rank = 1) as top_loan_1_name,
    max(council_api_id) filter (where loan_rank = 1) as top_loan_1_council_id,
    max(council_name) filter (where loan_rank = 1) as top_loan_1_council_name,
    max(current_value) filter (where loan_rank = 1) as top_loan_1_current_value,
    max(pct_of_current_portfolio) filter (where loan_rank = 1) as top_loan_1_pct_of_current_portfolio,
    max(api_loan_id) filter (where loan_rank = 2) as top_loan_2_id,
    max(loan_name) filter (where loan_rank = 2) as top_loan_2_name,
    max(council_api_id) filter (where loan_rank = 2) as top_loan_2_council_id,
    max(council_name) filter (where loan_rank = 2) as top_loan_2_council_name,
    max(current_value) filter (where loan_rank = 2) as top_loan_2_current_value,
    max(pct_of_current_portfolio) filter (where loan_rank = 2) as top_loan_2_pct_of_current_portfolio,
    max(api_loan_id) filter (where loan_rank = 3) as top_loan_3_id,
    max(loan_name) filter (where loan_rank = 3) as top_loan_3_name,
    max(council_api_id) filter (where loan_rank = 3) as top_loan_3_council_id,
    max(council_name) filter (where loan_rank = 3) as top_loan_3_council_name,
    max(current_value) filter (where loan_rank = 3) as top_loan_3_current_value,
    max(pct_of_current_portfolio) filter (where loan_rank = 3) as top_loan_3_pct_of_current_portfolio
  from loan_ranked
  where loan_rank <= 3
  group by investor_id
),
top_council_columns as (
  select
    investor_id,
    max(council_api_id) filter (where council_rank = 1) as top_council_1_id,
    max(council_name) filter (where council_rank = 1) as top_council_1_name,
    max(current_value) filter (where council_rank = 1) as top_council_1_current_value,
    max(pct_of_current_portfolio) filter (where council_rank = 1) as top_council_1_pct_of_current_portfolio,
    max(council_api_id) filter (where council_rank = 2) as top_council_2_id,
    max(council_name) filter (where council_rank = 2) as top_council_2_name,
    max(current_value) filter (where council_rank = 2) as top_council_2_current_value,
    max(pct_of_current_portfolio) filter (where council_rank = 2) as top_council_2_pct_of_current_portfolio,
    max(council_api_id) filter (where council_rank = 3) as top_council_3_id,
    max(council_name) filter (where council_rank = 3) as top_council_3_name,
    max(current_value) filter (where council_rank = 3) as top_council_3_current_value,
    max(pct_of_current_portfolio) filter (where council_rank = 3) as top_council_3_pct_of_current_portfolio
  from council_ranked
  where council_rank <= 3
  group by investor_id
),
latest_investment as (
  select
    investor_id,
    investment_id as latest_investment_id,
    investment_created_at as latest_investment_created_at,
    current_value as latest_investment_current_value,
    original_value as latest_investment_original_value,
    api_loan_id as latest_investment_api_loan_id,
    loan_name as latest_investment_loan_name,
    council_api_id as latest_investment_api_council_id,
    council_name as latest_investment_council_name,
    jsonb_build_object(
      'investment_id', investment_id,
      'created_at', investment_created_at,
      'current_value', current_value,
      'original_value', original_value,
      'api_loan_id', api_loan_id,
      'loan_name', loan_name,
      'api_council_id', council_api_id,
      'council_name', council_name
    ) as latest_investment
  from latest_investment_ranked
  where latest_investment_rank = 1
)
select
  it.investor_id,
  it.drip_id,
  it.investor_current_value,
  it.investor_original_value,
  it.loan_count,
  it.council_count,
  it.investment_count,
  it.latest_investment_created_at as latest_mapped_holding_created_at,
  coalesce(top_loans_json.top_loans, '[]'::jsonb) as top_loans,
  coalesce(top_councils_json.top_councils, '[]'::jsonb) as top_councils,
  latest_investment.latest_investment,
  latest_investment.latest_investment_id,
  latest_investment.latest_investment_created_at,
  latest_investment.latest_investment_current_value,
  latest_investment.latest_investment_original_value,
  latest_investment.latest_investment_api_loan_id,
  latest_investment.latest_investment_loan_name,
  latest_investment.latest_investment_api_council_id,
  latest_investment.latest_investment_council_name,
  top_loan_columns.top_loan_1_id,
  top_loan_columns.top_loan_1_name,
  top_loan_columns.top_loan_1_council_id,
  top_loan_columns.top_loan_1_council_name,
  top_loan_columns.top_loan_1_current_value,
  top_loan_columns.top_loan_1_pct_of_current_portfolio,
  top_loan_columns.top_loan_2_id,
  top_loan_columns.top_loan_2_name,
  top_loan_columns.top_loan_2_council_id,
  top_loan_columns.top_loan_2_council_name,
  top_loan_columns.top_loan_2_current_value,
  top_loan_columns.top_loan_2_pct_of_current_portfolio,
  top_loan_columns.top_loan_3_id,
  top_loan_columns.top_loan_3_name,
  top_loan_columns.top_loan_3_council_id,
  top_loan_columns.top_loan_3_council_name,
  top_loan_columns.top_loan_3_current_value,
  top_loan_columns.top_loan_3_pct_of_current_portfolio,
  top_council_columns.top_council_1_id,
  top_council_columns.top_council_1_name,
  top_council_columns.top_council_1_current_value,
  top_council_columns.top_council_1_pct_of_current_portfolio,
  top_council_columns.top_council_2_id,
  top_council_columns.top_council_2_name,
  top_council_columns.top_council_2_current_value,
  top_council_columns.top_council_2_pct_of_current_portfolio,
  top_council_columns.top_council_3_id,
  top_council_columns.top_council_3_name,
  top_council_columns.top_council_3_current_value,
  top_council_columns.top_council_3_pct_of_current_portfolio
from investor_totals it
left join top_loans_json
  on top_loans_json.investor_id = it.investor_id
left join top_councils_json
  on top_councils_json.investor_id = it.investor_id
left join top_loan_columns
  on top_loan_columns.investor_id = it.investor_id
left join top_council_columns
  on top_council_columns.investor_id = it.investor_id
left join latest_investment
  on latest_investment.investor_id = it.investor_id;

grant select on sidecar_publish.investor_holdings_summary to sidecar_app;
