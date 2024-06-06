#!/bin/bash
set -e

# Esperar a que PostgreSQL se inicie
while ! pg_isready -q -h localhost -p 5432 -U "postgres"
do
  echo "Waiting for PostgreSQL to start..."
  sleep 2
done

# Restaurar la base de datos desde el archivo de copia de seguridad
psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f /docker-entrypoint-initdb.d/backup.sql
