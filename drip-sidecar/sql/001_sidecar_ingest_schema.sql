-- Run this as a database owner/admin, then create a Netlify DATABASE_URL
-- using the sidecar app role. Replace the password placeholder first.

create schema if not exists sidecar_ingest;

create table if not exists sidecar_ingest.import_runs (
  id bigserial primary key,
  source_name text not null,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  status text not null default 'running',
  records_imported integer not null default 0,
  error_message text
);

create table if not exists sidecar_ingest.api_records_current (
  source_name text not null,
  source_id text not null,
  source_created_at timestamptz,
  fields jsonb not null,
  raw_record jsonb not null,
  imported_at timestamptz not null default now(),
  import_run_id bigint references sidecar_ingest.import_runs(id),
  primary key (source_name, source_id)
);

create table if not exists sidecar_ingest.loans_current (
  api_loan_id text primary key,
  source_created_at timestamptz,
  investment_name text,
  raise_status text,
  issuing_council text,
  council_api_id text,
  rate_of_return numeric,
  target_amount numeric,
  loan_amount numeric,
  total_deployed numeric,
  open_date date,
  close_date date,
  term_start_date date,
  maturity_date date,
  investment_url text,
  fields jsonb not null,
  imported_at timestamptz not null default now(),
  import_run_id bigint references sidecar_ingest.import_runs(id)
);

create table if not exists sidecar_ingest.councils_current (
  api_council_id text primary key,
  source_created_at timestamptz,
  issuing_council text,
  raise_status text,
  loans integer,
  total_raised numeric,
  total_spent numeric,
  total_returned numeric,
  projects_funded numeric,
  renewable_energy_spend numeric,
  energy_efficiency_spend numeric,
  clean_transportation_spend numeric,
  pollution_prevention_spend numeric,
  climate_change_adaptation_spend numeric,
  living_natural_resources_spend numeric,
  council_hub text,
  fields jsonb not null,
  imported_at timestamptz not null default now(),
  import_run_id bigint references sidecar_ingest.import_runs(id)
);

create table if not exists sidecar_ingest.projects_current (
  api_project_id text primary key,
  source_created_at timestamptz,
  project_name text,
  description text,
  category text,
  total_spent numeric,
  loan_name text,
  council_name text,
  total_left numeric,
  total_raised numeric,
  council_api_id text,
  api_loan_id text,
  fields jsonb not null,
  imported_at timestamptz not null default now(),
  import_run_id bigint references sidecar_ingest.import_runs(id)
);

create table if not exists sidecar_ingest.offer_api_loan_map (
  offer_name text primary key,
  api_loan_id text not null references sidecar_ingest.loans_current(api_loan_id),
  mapping_status text not null default 'mapped',
  notes text,
  mapped_at timestamptz not null default now()
);

create index if not exists api_records_current_source_name_idx
  on sidecar_ingest.api_records_current (source_name);

create index if not exists loans_current_council_api_id_idx
  on sidecar_ingest.loans_current (council_api_id);

create index if not exists councils_current_issuing_council_idx
  on sidecar_ingest.councils_current (issuing_council);

create index if not exists projects_current_api_loan_id_idx
  on sidecar_ingest.projects_current (api_loan_id);

create index if not exists projects_current_council_api_id_idx
  on sidecar_ingest.projects_current (council_api_id);

create index if not exists projects_current_category_idx
  on sidecar_ingest.projects_current (category);

create index if not exists offer_api_loan_map_api_loan_id_idx
  on sidecar_ingest.offer_api_loan_map (api_loan_id);

alter table sidecar_ingest.loans_current
  add column if not exists source_created_at timestamptz;

alter table sidecar_ingest.councils_current
  add column if not exists source_created_at timestamptz;

alter table sidecar_ingest.projects_current
  add column if not exists source_created_at timestamptz;

-- Optional app role. Run once, with a real strong password.
-- create role sidecar_app login password 'replace-with-a-strong-password';
-- grant usage on schema sidecar_ingest to sidecar_app;
-- grant select, insert, update, delete on all tables in schema sidecar_ingest to sidecar_app;
-- grant usage, select on all sequences in schema sidecar_ingest to sidecar_app;
-- alter default privileges in schema sidecar_ingest grant select, insert, update, delete on tables to sidecar_app;
-- alter default privileges in schema sidecar_ingest grant usage, select on sequences to sidecar_app;
