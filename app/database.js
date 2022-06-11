const { Client } = require('pg');

const client = new Client('postgresql://postgres:Arizonacards83@localhost/Pokedex');
// const client = new Client(process.env.PG_URL);

client.connect();

module.exports = client;