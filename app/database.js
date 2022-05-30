const { Client } = require('pg');

const client = new Client('postgresql://ben:ben@localhost/pokedex');

client.connect();

module.exports = client;