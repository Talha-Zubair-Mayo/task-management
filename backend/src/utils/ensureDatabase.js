// src/utils/ensureDatabase.js
const { Client } = require('pg');

const config = require('../config');
async function ensureDatabase() {
  const client = new Client({
    user:config.db.user,
    password:config.db.password,
    host:config.db.host,
    port:config.db.port,
    database: config.db.dialect
  });
  await client.connect();
  const res = await client.query(
    'SELECT 1 FROM pg_database WHERE datname = $1',
    [config.db.name]
  );
  if (res.rowCount === 0) {
    await client.query(`CREATE DATABASE "${config.db.name}"`);
    console.log(`Database "${config.db.name}" created.`);
  } else {
    console.log(`Database "${config.db.name}" already exists.`);
  }
  await client.end();
}

module.exports = ensureDatabase;
