# Drip Sidecar

Small proof-of-concept utilities for pushing Postgres-derived enrichment data into Drip.

## Ingest Abundance API data into Postgres

Run the schema once as a database owner/admin:

```sh
psql "$ADMIN_DATABASE_URL" -f drip-sidecar/sql/001_sidecar_ingest_schema.sql
```

That creates:

- `sidecar_ingest.import_runs`
- `sidecar_ingest.api_records_current`
- `sidecar_ingest.loans_current`
- `sidecar_ingest.councils_current`
- `sidecar_ingest.projects_current`

The importer currently pulls:

- `https://data.abundanceinvestment.com/loans`
- `https://data.abundanceinvestment.com/councils`
- `https://data.abundanceinvestment.com/projects`

Set a scoped app connection string:

```sh
export DATABASE_URL="postgres://sidecar_app:..."
```

Then run:

```sh
npm run import:use-of-funds --prefix drip-sidecar
```

There is also a Netlify function version at:

```text
/.netlify/functions/import-use-of-funds
```

Required Netlify environment variables:

- `DATABASE_URL`
- `SIDECAR_IMPORT_SECRET`

Call it with:

```sh
curl -X POST "https://your-site.netlify.app/.netlify/functions/import-use-of-funds" \
  -H "x-sidecar-secret: your-secret"
```

## Prove Drip subscriber-id updates

Set these environment variables:

```sh
export DRIP_API_TOKEN="..."
export DRIP_ACCOUNT_ID="..."
export DRIP_TEST_SUBSCRIBER_ID="..."
```

Then run:

```sh
npm run test:update-subscriber --prefix drip-sidecar
```

The test writes these proof fields/tags:

- `council_interest`
- `sidecar_custom_variable_test`
- `ab_sidecar_test_updated_at`
- `AU_PROCESS_SS_ONBOARDING`
- `sidecar-test-tag`

It also attempts to remove:

- `Welcome popup`

No email address is required for this test. The update is addressed using Drip's subscriber `id`.

## Netlify proof function

The same proof can be run as a Netlify function at:

```text
/.netlify/functions/drip-proof-update
```

Required Netlify environment variables:

- `DRIP_API_TOKEN`
- `DRIP_ACCOUNT_ID`
- `SIDECAR_TEST_SECRET`

Example request:

```sh
curl -X POST "https://your-site.netlify.app/.netlify/functions/drip-proof-update" \
  -H "content-type: application/json" \
  -H "x-sidecar-secret: your-secret" \
  -d '{"subscriber_id":"drip_subscriber_id_here"}'
```
