const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/plasticc';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  'CREATE TABLE user_classified(id SERIAL PRIMARY KEY, object_id integer, user_target integer)');
query.on('end', () => { client.end(); });
