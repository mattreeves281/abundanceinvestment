create or replace view sidecar_publish.investor_impact_summary as
with mapped_holdings as (
  select
    h.investor_id,
    m.api_loan_id,
    h.offer_name,
    sum(h.current_value) as investor_loan_current_value,
    sum(h.original_value) as investor_loan_original_value,
    max(h.investment_created_at) as latest_investment_created_at,
    count(*) as investment_count
  from sidecar_ingest.investment_holdings_current h
  join sidecar_ingest.offer_api_loan_map m
    on m.offer_name = h.offer_name
  where h.current_value > 0
    and m.mapping_status = 'mapped'
  group by h.investor_id, m.api_loan_id, h.offer_name
),
investor_loan as (
  select
    mh.*,
    l.investment_name,
    l.loan_amount,
    l.council_api_id,
    c.issuing_council
  from mapped_holdings mh
  join sidecar_ingest.loans_current l
    on l.api_loan_id = mh.api_loan_id
  left join sidecar_ingest.councils_current c
    on c.api_council_id = l.council_api_id
),
investor_totals as (
  select
    investor_id,
    sum(investor_loan_current_value) as investor_current_value,
    sum(investor_loan_original_value) as investor_original_value,
    max(latest_investment_created_at) as latest_investment_created_at,
    count(*) as loan_count,
    count(distinct council_api_id) as council_count,
    sum(investment_count) as investment_count
  from investor_loan
  group by investor_id
),
project_allocations as (
  select
    il.investor_id,
    it.investor_current_value,
    it.investor_original_value,
    il.api_loan_id,
    il.investment_name,
    il.council_api_id,
    il.issuing_council,
    il.investor_loan_current_value,
    il.investor_loan_original_value,
    il.loan_amount,
    il.investor_loan_current_value / nullif(it.investor_current_value, 0) as portfolio_weight,
    p.api_project_id,
    p.source_created_at as project_source_created_at,
    p.project_name,
    p.description as project_description,
    p.category,
    p.total_spent as project_total_spent,
    least(coalesce(p.total_spent / nullif(il.loan_amount, 0), 0), 1) as loan_project_spend_pct,
    il.investor_loan_current_value
      * least(coalesce(p.total_spent / nullif(il.loan_amount, 0), 0), 1)
      as attributed_spent_amount
  from investor_loan il
  join investor_totals it
    on it.investor_id = il.investor_id
  join sidecar_ingest.projects_current p
    on p.api_loan_id = il.api_loan_id
  where coalesce(p.total_spent, 0) > 0
),
impact_totals as (
  select
    investor_id,
    sum(attributed_spent_amount) as attributed_spent_amount
  from project_allocations
  group by investor_id
),
category_rollup as (
  select
    investor_id,
    coalesce(category, 'Uncategorised') as category,
    sum(attributed_spent_amount) as attributed_spent_amount,
    least(coalesce(sum(attributed_spent_amount) / nullif(max(investor_current_value), 0), 0), 1) as pct_of_original_investment,
    least(coalesce(sum(attributed_spent_amount) / nullif(max(investor_current_value), 0), 0), 1) as pct_of_current_portfolio
  from project_allocations
  group by investor_id, coalesce(category, 'Uncategorised')
),
category_columns as (
  select
    investor_id,
    coalesce(sum(attributed_spent_amount) filter (where category = 'Renewable Energy'), 0) as renewable_energy_spent_amount,
    coalesce(sum(pct_of_original_investment) filter (where category = 'Renewable Energy'), 0) as renewable_energy_pct_of_original_investment,
    coalesce(sum(pct_of_current_portfolio) filter (where category = 'Renewable Energy'), 0) as renewable_energy_pct_of_current_portfolio,
    coalesce(sum(attributed_spent_amount) filter (where category = 'Energy Efficiency'), 0) as energy_efficiency_spent_amount,
    coalesce(sum(pct_of_original_investment) filter (where category = 'Energy Efficiency'), 0) as energy_efficiency_pct_of_original_investment,
    coalesce(sum(pct_of_current_portfolio) filter (where category = 'Energy Efficiency'), 0) as energy_efficiency_pct_of_current_portfolio,
    coalesce(sum(attributed_spent_amount) filter (where category = 'Clean Transportation'), 0) as clean_transportation_spent_amount,
    coalesce(sum(pct_of_original_investment) filter (where category = 'Clean Transportation'), 0) as clean_transportation_pct_of_original_investment,
    coalesce(sum(pct_of_current_portfolio) filter (where category = 'Clean Transportation'), 0) as clean_transportation_pct_of_current_portfolio,
    coalesce(sum(attributed_spent_amount) filter (where category = 'Pollution Prevention and Control'), 0) as pollution_prevention_spent_amount,
    coalesce(sum(pct_of_original_investment) filter (where category = 'Pollution Prevention and Control'), 0) as pollution_prevention_pct_of_original_investment,
    coalesce(sum(pct_of_current_portfolio) filter (where category = 'Pollution Prevention and Control'), 0) as pollution_prevention_pct_of_current_portfolio,
    coalesce(sum(attributed_spent_amount) filter (where category = 'Climate Change Adaptation'), 0) as climate_change_adaptation_spent_amount,
    coalesce(sum(pct_of_original_investment) filter (where category = 'Climate Change Adaptation'), 0) as climate_change_adaptation_pct_of_original_investment,
    coalesce(sum(pct_of_current_portfolio) filter (where category = 'Climate Change Adaptation'), 0) as climate_change_adaptation_pct_of_current_portfolio,
    coalesce(sum(attributed_spent_amount) filter (where category = 'Living and Natural Resources'), 0) as living_natural_resources_spent_amount,
    coalesce(sum(pct_of_original_investment) filter (where category = 'Living and Natural Resources'), 0) as living_natural_resources_pct_of_original_investment,
    coalesce(sum(pct_of_current_portfolio) filter (where category = 'Living and Natural Resources'), 0) as living_natural_resources_pct_of_current_portfolio
  from category_rollup
  group by investor_id
),
category_json as (
  select
    investor_id,
    jsonb_agg(
      jsonb_build_object(
        'category', category,
        'attributed_spent_amount', attributed_spent_amount,
        'pct_of_original_investment', pct_of_original_investment,
        'pct_of_current_portfolio', pct_of_current_portfolio
      )
      order by attributed_spent_amount desc, category
    ) as category_breakdown
  from category_rollup
  group by investor_id
),
project_ranked as (
  select
    pa.*,
    least(coalesce(pa.attributed_spent_amount / nullif(pa.investor_current_value, 0), 0), 1) as pct_of_original_investment,
    least(coalesce(pa.attributed_spent_amount / nullif(pa.investor_current_value, 0), 0), 1) as pct_of_current_portfolio,
    pa.attributed_spent_amount / nullif(sum(pa.attributed_spent_amount) over (partition by pa.investor_id), 0) as pct_of_attributed_spend,
    row_number() over (
      partition by pa.investor_id
      order by pa.attributed_spent_amount desc nulls last, pa.project_name, pa.api_project_id
    ) as project_rank
  from project_allocations pa
),
top_projects_json as (
  select
    investor_id,
    jsonb_agg(
      jsonb_build_object(
        'rank', project_rank,
        'api_project_id', api_project_id,
        'project_name', project_name,
        'project_description', project_description,
        'category', category,
        'api_loan_id', api_loan_id,
        'loan_name', investment_name,
        'api_council_id', council_api_id,
        'council_name', issuing_council,
        'portfolio_weight', portfolio_weight,
        'loan_project_spend_pct', loan_project_spend_pct,
        'attributed_spent_amount', attributed_spent_amount,
        'pct_of_original_investment', pct_of_original_investment,
        'pct_of_current_portfolio', pct_of_current_portfolio,
        'pct_of_attributed_spend', pct_of_attributed_spend
      )
      order by project_rank
    ) filter (where project_rank <= 3) as top_projects
  from project_ranked
  group by investor_id
),
recent_project_ranked as (
  select
    pa.*,
    least(coalesce(pa.attributed_spent_amount / nullif(pa.investor_current_value, 0), 0), 1) as pct_of_original_investment,
    least(coalesce(pa.attributed_spent_amount / nullif(pa.investor_current_value, 0), 0), 1) as pct_of_current_portfolio,
    row_number() over (
      partition by pa.investor_id
      order by pa.project_source_created_at desc nulls last, pa.attributed_spent_amount desc nulls last, pa.project_name, pa.api_project_id
    ) as recent_project_rank
  from project_allocations pa
),
recent_project as (
  select
    investor_id,
    max(api_project_id) filter (where recent_project_rank = 1) as most_recent_project_id,
    max(project_name) filter (where recent_project_rank = 1) as most_recent_project_name,
    max(project_description) filter (where recent_project_rank = 1) as most_recent_project_description,
    max(category) filter (where recent_project_rank = 1) as most_recent_project_category,
    max(project_source_created_at) filter (where recent_project_rank = 1) as most_recent_project_source_created_at,
    max(api_loan_id) filter (where recent_project_rank = 1) as most_recent_project_api_loan_id,
    max(investment_name) filter (where recent_project_rank = 1) as most_recent_project_loan_name,
    max(council_api_id) filter (where recent_project_rank = 1) as most_recent_project_api_council_id,
    max(issuing_council) filter (where recent_project_rank = 1) as most_recent_project_council_name,
    max(attributed_spent_amount) filter (where recent_project_rank = 1) as most_recent_project_attributed_spent_amount,
    max(pct_of_original_investment) filter (where recent_project_rank = 1) as most_recent_project_pct_of_original_investment,
    max(pct_of_current_portfolio) filter (where recent_project_rank = 1) as most_recent_project_pct_of_current_portfolio,
    jsonb_build_object(
      'api_project_id', max(api_project_id) filter (where recent_project_rank = 1),
      'project_name', max(project_name) filter (where recent_project_rank = 1),
      'project_description', max(project_description) filter (where recent_project_rank = 1),
      'category', max(category) filter (where recent_project_rank = 1),
      'source_created_at', max(project_source_created_at) filter (where recent_project_rank = 1),
      'api_loan_id', max(api_loan_id) filter (where recent_project_rank = 1),
      'loan_name', max(investment_name) filter (where recent_project_rank = 1),
      'api_council_id', max(council_api_id) filter (where recent_project_rank = 1),
      'council_name', max(issuing_council) filter (where recent_project_rank = 1),
      'portfolio_weight', max(portfolio_weight) filter (where recent_project_rank = 1),
      'loan_project_spend_pct', max(loan_project_spend_pct) filter (where recent_project_rank = 1),
      'attributed_spent_amount', max(attributed_spent_amount) filter (where recent_project_rank = 1),
      'pct_of_original_investment', max(pct_of_original_investment) filter (where recent_project_rank = 1),
      'pct_of_current_portfolio', max(pct_of_current_portfolio) filter (where recent_project_rank = 1)
    ) as most_recent_project
  from recent_project_ranked
  where recent_project_rank = 1
  group by investor_id
),
top_project_columns as (
  select
    investor_id,
    max(api_project_id) filter (where project_rank = 1) as top_project_1_id,
    max(project_name) filter (where project_rank = 1) as top_project_1_name,
    max(project_description) filter (where project_rank = 1) as top_project_1_description,
    max(category) filter (where project_rank = 1) as top_project_1_category,
    max(attributed_spent_amount) filter (where project_rank = 1) as top_project_1_attributed_spent_amount,
    max(pct_of_original_investment) filter (where project_rank = 1) as top_project_1_pct_of_original_investment,
    max(pct_of_current_portfolio) filter (where project_rank = 1) as top_project_1_pct_of_current_portfolio,
    max(pct_of_attributed_spend) filter (where project_rank = 1) as top_project_1_pct_of_attributed_spend,
    max(api_project_id) filter (where project_rank = 2) as top_project_2_id,
    max(project_name) filter (where project_rank = 2) as top_project_2_name,
    max(project_description) filter (where project_rank = 2) as top_project_2_description,
    max(category) filter (where project_rank = 2) as top_project_2_category,
    max(attributed_spent_amount) filter (where project_rank = 2) as top_project_2_attributed_spent_amount,
    max(pct_of_original_investment) filter (where project_rank = 2) as top_project_2_pct_of_original_investment,
    max(pct_of_current_portfolio) filter (where project_rank = 2) as top_project_2_pct_of_current_portfolio,
    max(pct_of_attributed_spend) filter (where project_rank = 2) as top_project_2_pct_of_attributed_spend,
    max(api_project_id) filter (where project_rank = 3) as top_project_3_id,
    max(project_name) filter (where project_rank = 3) as top_project_3_name,
    max(project_description) filter (where project_rank = 3) as top_project_3_description,
    max(category) filter (where project_rank = 3) as top_project_3_category,
    max(attributed_spent_amount) filter (where project_rank = 3) as top_project_3_attributed_spent_amount,
    max(pct_of_original_investment) filter (where project_rank = 3) as top_project_3_pct_of_original_investment,
    max(pct_of_current_portfolio) filter (where project_rank = 3) as top_project_3_pct_of_current_portfolio,
    max(pct_of_attributed_spend) filter (where project_rank = 3) as top_project_3_pct_of_attributed_spend
  from project_ranked
  where project_rank <= 3
  group by investor_id
)
select
  it.investor_id,
  dim.dripid as drip_id,
  it.investor_current_value,
  it.investor_original_value,
  it.latest_investment_created_at,
  it.loan_count,
  it.council_count,
  it.investment_count,
  coalesce(impact_totals.attributed_spent_amount, 0) as attributed_spent_amount,
  least(coalesce(coalesce(impact_totals.attributed_spent_amount, 0) / nullif(it.investor_current_value, 0), 0), 1) as weighted_spent_pct_of_original_investment,
  least(coalesce(coalesce(impact_totals.attributed_spent_amount, 0) / nullif(it.investor_current_value, 0), 0), 1) as weighted_spent_pct_of_current_portfolio,
  coalesce(category_columns.renewable_energy_spent_amount, 0) as renewable_energy_spent_amount,
  coalesce(category_columns.renewable_energy_pct_of_original_investment, 0) as renewable_energy_pct_of_original_investment,
  coalesce(category_columns.renewable_energy_pct_of_current_portfolio, 0) as renewable_energy_pct_of_current_portfolio,
  coalesce(category_columns.energy_efficiency_spent_amount, 0) as energy_efficiency_spent_amount,
  coalesce(category_columns.energy_efficiency_pct_of_original_investment, 0) as energy_efficiency_pct_of_original_investment,
  coalesce(category_columns.energy_efficiency_pct_of_current_portfolio, 0) as energy_efficiency_pct_of_current_portfolio,
  coalesce(category_columns.clean_transportation_spent_amount, 0) as clean_transportation_spent_amount,
  coalesce(category_columns.clean_transportation_pct_of_original_investment, 0) as clean_transportation_pct_of_original_investment,
  coalesce(category_columns.clean_transportation_pct_of_current_portfolio, 0) as clean_transportation_pct_of_current_portfolio,
  coalesce(category_columns.pollution_prevention_spent_amount, 0) as pollution_prevention_spent_amount,
  coalesce(category_columns.pollution_prevention_pct_of_original_investment, 0) as pollution_prevention_pct_of_original_investment,
  coalesce(category_columns.pollution_prevention_pct_of_current_portfolio, 0) as pollution_prevention_pct_of_current_portfolio,
  coalesce(category_columns.climate_change_adaptation_spent_amount, 0) as climate_change_adaptation_spent_amount,
  coalesce(category_columns.climate_change_adaptation_pct_of_original_investment, 0) as climate_change_adaptation_pct_of_original_investment,
  coalesce(category_columns.climate_change_adaptation_pct_of_current_portfolio, 0) as climate_change_adaptation_pct_of_current_portfolio,
  coalesce(category_columns.living_natural_resources_spent_amount, 0) as living_natural_resources_spent_amount,
  coalesce(category_columns.living_natural_resources_pct_of_original_investment, 0) as living_natural_resources_pct_of_original_investment,
  coalesce(category_columns.living_natural_resources_pct_of_current_portfolio, 0) as living_natural_resources_pct_of_current_portfolio,
  coalesce(category_json.category_breakdown, '[]'::jsonb) as category_breakdown,
  recent_project.most_recent_project,
  recent_project.most_recent_project_id,
  recent_project.most_recent_project_name,
  recent_project.most_recent_project_description,
  recent_project.most_recent_project_category,
  recent_project.most_recent_project_source_created_at,
  recent_project.most_recent_project_api_loan_id,
  recent_project.most_recent_project_loan_name,
  recent_project.most_recent_project_api_council_id,
  recent_project.most_recent_project_council_name,
  recent_project.most_recent_project_attributed_spent_amount,
  recent_project.most_recent_project_pct_of_original_investment,
  recent_project.most_recent_project_pct_of_current_portfolio,
  coalesce(top_projects_json.top_projects, '[]'::jsonb) as top_projects,
  top_project_columns.top_project_1_id,
  top_project_columns.top_project_1_name,
  top_project_columns.top_project_1_description,
  top_project_columns.top_project_1_category,
  top_project_columns.top_project_1_attributed_spent_amount,
  top_project_columns.top_project_1_pct_of_original_investment,
  top_project_columns.top_project_1_pct_of_current_portfolio,
  top_project_columns.top_project_1_pct_of_attributed_spend,
  top_project_columns.top_project_2_id,
  top_project_columns.top_project_2_name,
  top_project_columns.top_project_2_description,
  top_project_columns.top_project_2_category,
  top_project_columns.top_project_2_attributed_spent_amount,
  top_project_columns.top_project_2_pct_of_original_investment,
  top_project_columns.top_project_2_pct_of_current_portfolio,
  top_project_columns.top_project_2_pct_of_attributed_spend,
  top_project_columns.top_project_3_id,
  top_project_columns.top_project_3_name,
  top_project_columns.top_project_3_description,
  top_project_columns.top_project_3_category,
  top_project_columns.top_project_3_attributed_spent_amount,
  top_project_columns.top_project_3_pct_of_original_investment,
  top_project_columns.top_project_3_pct_of_current_portfolio,
  top_project_columns.top_project_3_pct_of_attributed_spend
from investor_totals it
left join sidecar_ingest.drip_id_mapping dim
  on dim.investorid ~ '^[0-9]+$'
  and dim.investorid::bigint = it.investor_id
left join impact_totals
  on impact_totals.investor_id = it.investor_id
left join category_columns
  on category_columns.investor_id = it.investor_id
left join category_json
  on category_json.investor_id = it.investor_id
left join recent_project
  on recent_project.investor_id = it.investor_id
left join top_projects_json
  on top_projects_json.investor_id = it.investor_id
left join top_project_columns
  on top_project_columns.investor_id = it.investor_id;

grant select on sidecar_publish.investor_impact_summary to sidecar_app;
