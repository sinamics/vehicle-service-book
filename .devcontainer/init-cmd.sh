#!/bin/bash

set -e

env_file=".env"

# Function to check and add env variables
add_env_variable() {
  local var_name="$1"
  local var_value="$2"
  if ! grep -q "^${var_name}=" "$env_file"; then
    echo "Adding ${var_name}..."
    echo "${var_name}=${var_value}" >> "$env_file"
  fi
}

# Create .env file if it doesn't exist
if [ ! -f "$env_file" ]; then
  touch "$env_file"
fi

# Add environment variables if they don't exist
add_env_variable "DATABASE_URL" "mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}"
add_env_variable "NEXTAUTH_SECRET" "randomstring"
add_env_variable "NEXTAUTH_URL" "${NEXT_PUBLIC_URL}"
add_env_variable "GOOGLE_CLIENT_ID" ""
add_env_variable "GOOGLE_CLIENT_SECRET" ""
add_env_variable "FACEBOOK_CLIENT_ID" ""
add_env_variable "FACEBOOK_CLIENT_SECRET" ""
add_env_variable "GITHUB_ID" ""
add_env_variable "GITHUB_SECRET" ""
add_env_variable "NEXT_PUBLIC_URL" "${NEXT_PUBLIC_URL}"

# Wait for MySQL to become available
until mysqladmin ping -h "$DB_HOST" --silent; do
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 1
done


# apply migrations to the database
echo "Applying migrations to the database..."
npx prisma migrate deploy
echo "Migrations applied successfully!"

while sleep 1000; do :; done