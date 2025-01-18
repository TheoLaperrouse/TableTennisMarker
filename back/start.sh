wait_for_postgres() {
  until pg_isready -h localhost -p 5432 -U postgres -t 30
  do
    echo "Waiting for database connection..."
    sleep 1
  done
}

wait_for_postgres

npx knex migrate:latest --knexfile knexfile.js

npx knex seed:run --knexfile knexfile.js

pg_isready --host=$DB_HOST --port='5432' --username=$DB_USER --dbname=$DB_NAME --timeout='30'