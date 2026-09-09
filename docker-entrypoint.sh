#!/bin/sh
set -e

DB_ADMIN_URL="${DIRECT_URL:-$DATABASE_URL}"

DATABASE_URL="$DB_ADMIN_URL" ./node_modules/.bin/prisma migrate deploy
DATABASE_URL="$DB_ADMIN_URL" node dist/prisma/seed

exec "$@"
