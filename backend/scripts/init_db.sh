#!/bin/bash

# Creates the development or test database and associated users, 
# based on the NODE_ENV environment variable.
# The .env file must be present in the root directory
# The .env file must contain the following variables:

#   PGPASSWORD (PostgreSQL admin password)

#   DEV_DB_USER (Development database user)
#   DEV_DB_PASSWORD (Development database password)
#   DEV_DB_NAME (Development database name)

#   TEST_DB_USER (Test database user)
#   TEST_DB_PASSWORD (Test database password)
#   TEST_DB_NAME (Test database name)


# Check that the .env file exists
if [ ! -f .env ]; then
    echo "No .env file found!"
    exit 1
fi

# Load the .env file variables
export $(cat .env | xargs)

# Wait for PostgreSQL to be ready
until pg_isready -h localhost -p 5432 -U admin; do
    echo "Waiting for PostgreSQL to be ready..."
    sleep 2
done

if [ "$NODE_ENV" = "test" ]; then
    DB_USER=$TEST_DB_USER
    DB_PASSWORD=$TEST_DB_PASSWORD
    DB_NAME=$TEST_DB_NAME
else
    DB_USER=$DEV_DB_USER
    DB_PASSWORD=$DEV_DB_PASSWORD
    DB_NAME=$DEV_DB_NAME
fi

# Create the database if it does not already exist
psql -h localhost -p 5432 -U admin -v ON_ERROR_STOP=1 <<-EOSQL
    SELECT 'CREATE DATABASE $DB_NAME' WHERE NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = '$DB_NAME') \gexec
EOSQL

# Create the user and grant privileges
psql -h localhost -p 5432 -U admin -v ON_ERROR_STOP=1 <<-EOSQL
    DO \$\$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = '$DB_USER') THEN
            EXECUTE 'CREATE USER $DB_USER WITH PASSWORD ''$DB_PASSWORD''';
        END IF;
    END
    \$\$;

    GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
EOSQL
