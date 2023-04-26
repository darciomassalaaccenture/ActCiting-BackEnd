export DB_USER=postgres # default
export DB_SERVER=${DB_SERVER}
export DB_NAME=postgres # default one
export DB_PORT=5432 # default one

# USING A ENV VAR FOR THIS IS NOT SECURE, MKAY!!!!
 export DB_PWD=${POSTGRES_PASSWORD} # from the other script
# ^^ the space before keeps it out of your bash history though

echo ""
echo "Waiting for postgres at ${DB_SERVER} ${DB_PORT}..."
wait_time=1
while ! nc -z ${DB_SERVER} ${DB_PORT}; do
   sleep ${wait_time}
   echo "Waiting ${wait_time} more secs for for postgres."
done
sleep ${wait_time}
echo "...postgres ready at ${DB_SERVER} ${DB_PORT}."
echo ""

echo ""
echo "Setting up postgres schema and data..."

psql "postgresql://${DB_USER}:${DB_PWD}@${DB_SERVER}/${DB_NAME}" --file setup-tables.sql --echo-all

psql "postgresql://${DB_USER}:${DB_PWD}@${DB_SERVER}/${DB_NAME}" --file setup-data.sql --echo-all

echo "... done"
echo ""

