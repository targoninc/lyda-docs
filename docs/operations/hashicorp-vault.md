# HashiCorp Vault configuration

The API and worker can load every configuration value from a HashiCorp Vault KV
secret. Environment variables remain the fallback for any key that is not in the
secret, and are used directly when Vault is not configured.

The backend reads the Vault secret once at startup. Restart the API and worker
after changing values.

## Path mapping

For the `targoninc-kv-exp` KV v2 mount and `apps/lyda-api` secret:

| Setting | Value |
| --- | --- |
| Vault API path | `/v1/targoninc-kv-exp/data/apps/lyda-api` |
| Vault CLI path | `-mount="targoninc-kv-exp" "apps/lyda-api"` |
| `HASHI_MOUNT` | `targoninc-kv-exp` |
| `HASHI_PATH` | `apps/lyda-api` |
| `HASHI_KV_VERSION` | `2` |

Use the CLI path in Lyda's configuration. Do not include `/v1/`, `/data/`, or a
leading slash in `HASHI_PATH`.

## 1. Bootstrap with the root token

```bash
export VAULT_ADDR="https://vault.example.com"
export VAULT_TOKEN="hvs.ROOT_TOKEN"
vault status
```

The root token is only used for the setup below. Do not configure the API or
worker with it.

If the KV v2 mount does not exist yet:

```bash
vault secrets enable -path=targoninc-kv-exp -version=2 kv
```

To check whether it already exists:

```bash
vault secrets list
```

## 2. Store the application configuration

Secret keys use the same names as the normal environment variables. Start with
the required values and add any optional provider, storage, realtime, or worker
settings from [`.env.example`](https://github.com/targoninc/lyda-backend/blob/preview/.env.example).

```bash
vault kv put -mount=targoninc-kv-exp apps/lyda-api \
  SESSION_SECRET="$(openssl rand -hex 32)" \
  MARIADB_HOST="mariadb" \
  MARIADB_PORT="3306" \
  MARIADB_USER="lyda" \
  MARIADB_PASSWORD="change-me" \
  MARIADB_NAME="lyda" \
  MARIADB_SESSION_DB="sessions" \
  CACHE_HOST="redis" \
  CACHE_PORT="6379" \
  CACHE_TYPE="redis" \
  APP_URL="https://lyda.app" \
  BASE_URL="https://lyda.app" \
  CORS_ORIGIN="https://lyda.app,https://preview.lyda.app" \
  STORAGE_BACKEND="s3" \
  S3_ACCESS_KEY="example-access-key" \
  S3_SECRET_KEY="example-secret-key" \
  S3_BUCKET="lyda-media" \
  S3_REGION="eu-central-1" \
  JOB_QUEUE_HOST="redis" \
  JOB_QUEUE_PORT="6379" \
  WORKER_QUEUES="uploads,royalties,replication" \
  WORKER_CONCURRENCY="2" \
  MAIL_HOST="smtp.example.com" \
  MAIL_PORT="587" \
  MAIL_USER="example@example.com" \
  MAIL_PASSWORD="change-me" \
  MAIL_REPLYTO="administration@targoninc.com" \
  MAIL_INTERNAL="ops@targoninc.com" \
  METRICS_TOKEN="$(openssl rand -hex 32)" \
  STRIPE_KEY="sk_live_example" \
  STRIPE_PUBLIC_KEY="pk_live_example" \
  STRIPE_WEBHOOK_SECRET="whsec_example" \
  STRIPE_CONNECT_WEBHOOK_SECRET="whsec_connect_example"
```

Add provider credentials only when those features are enabled, for example
`APPLE_APP_STORE_*`, `APPLE_MUSIC_*`, `YOUTUBE_API_KEY`, `TIDAL_CLIENT_ID`,
`TIDAL_CLIENT_SECRET`, `DDEX_INGEST_*`, and the replication/S3 settings.

## 3. Create a least-privilege policy

```bash
vault policy write lyda-api - <<'EOF'
path "targoninc-kv-exp/data/apps/lyda-api" {
  capabilities = ["read"]
}
EOF
```

The API and worker only read the current secret version. They do not list,
write, or read KV metadata.

## 4. Create the API and worker token

```bash
export HASHI_TOKEN="$(vault token create \
  -policy=lyda-api \
  -display-name=lyda-api \
  -ttl=720h \
  -renewable=true \
  -field=token)"
```

This prints only the new token. Use a new token for the API and worker; both can
share the same least-privilege token.

The backend does not renew tokens itself. Renew it externally or rotate it
before the TTL expires, then update `HASHI_TOKEN` and restart both services.
For a permanent deployment, use a periodic token with an external renewal job
or add an AppRole-backed implementation to the secret loader.

## 5. Verify the token

```bash
VAULT_TOKEN="$HASHI_TOKEN" vault kv get -mount=targoninc-kv-exp apps/lyda-api
VAULT_TOKEN="$HASHI_TOKEN" vault token capabilities targoninc-kv-exp/data/apps/lyda-api
```

The capability check should print `read`.

## 6. Configure the API and worker

Set these variables on both the API and worker deployments:

```env
HASHI_ADDR=https://vault.example.com
HASHI_TOKEN=hvs.CAES...
HASHI_MOUNT=targoninc-kv-exp
HASHI_PATH=apps/lyda-api
HASHI_KV_VERSION=2
# Optional for Vault Enterprise namespaces:
# HASHI_NAMESPACE=team-a
```

`HASHI_TOKEN` is the bootstrap credential and must be supplied by the
orchestrator's secret mechanism. Do not store it inside the secret it is used to
read.

Both processes load the same secret. Keep the full configuration in Vault and
leave provider-specific environment keys only as temporary overrides while
migrating.

## 7. Change a value later

```bash
vault kv put -mount=targoninc-kv-exp apps/lyda-api \
  SESSION_SECRET="new-secret" \
  STRIPE_KEY="sk_live_new"
```

`kv put` replaces the whole secret, so include every key again or use
`vault kv patch` if your Vault version supports it. Restart the API and worker
after the update.

## Startup behavior

- `HASHI_ADDR`, `HASHI_TOKEN`, and `HASHI_PATH` missing: environment variables
  only.
- Vault configured and a key present in Vault: the Vault value wins.
- Vault configured and a key missing: the environment variable is used.
- Vault configured but the request fails: startup fails instead of silently
  using an incomplete environment configuration.
