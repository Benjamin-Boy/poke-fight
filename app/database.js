const { Client } = require("pg");

const client = new Client(
  // "postgresql://postgres:Arizonacards83@localhost/Pokedex"
  "postgres://zwqjexrxoqvctp:e9832285daa4dadb556dea28c146f2a6831fa69534f1888a9f39b2878b23a64b@ec2-99-80-170-190.eu-west-1.compute.amazonaws.com:5432/d1mv73vvlt1l4a"
);

client.connect();

module.exports = client;
