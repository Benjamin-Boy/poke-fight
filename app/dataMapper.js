const database = require('./database');

const dataMapper = {
  getCardsList: async () =>{
    const query = `SELECT p.*,json_agg(type) AS type
    FROM pokemon_card AS p
    JOIN pokemon_type ON p.numero=pokemon_type.pokemon_numero
    JOIN type ON pokemon_type.type_id=type.id
    GROUP BY
    p.id,
    p.nom,
    p.pv,
    p.attaque,
    p.defense,
    p.attaque_spe,
    p.defense_spe,
    p.vitesse,
    p.numero
    ORDER BY p.numero`;

    const result = await database.query(query);

    return result.rows;
  },
  getCard: async (id) =>{
    const query = {
      text: `SELECT p.*,json_agg(type) AS type
      FROM pokemon_card AS p
      JOIN pokemon_type ON p.numero=pokemon_type.pokemon_numero
      JOIN type ON pokemon_type.type_id=type.id
      WHERE p.id = $1
      GROUP BY
      p.id,
      p.nom,
      p.pv,
      p.attaque,
      p.defense,
      p.attaque_spe,
      p.defense_spe,
      p.vitesse,
      p.numero`,
      values: [id]
    }

    const result = await database.query(query);

    return result.rows[0];
  },
  getAllTypes: async () => {
    const query = `SELECT name, color FROM type JOIN pokemon_type ON type.id = pokemon_type.type_id GROUP BY type.name, type.color ORDER BY type.name`;

    const result = await database.query(query);
    return result.rows;
  },
  getAllUsers: async () => {
    const query = `SELECT * FROM "users"`;

    const result = await database.query(query);
    return result.rows;
  },
  getUserByEmail: async (email) => {
    const query = `SELECT * FROM "users" WHERE email = '${email}'`;

    const result = await database.query(query);
    return result.rows[0];
  },
  getUserByName: async (name) => {
    const query = `SELECT * FROM "users" WHERE name = '${name}'`;

    const result = await database.query(query);
    return result.rows[0];
  },
  createNewUser: async (obj) => {
    await database.query(`INSERT INTO "users" (name, email, password) VALUES ('${obj.name}', '${obj.email}', '${obj.password}')`);
  },
  getInventory: async () =>{
    const query = `SELECT p.*,json_agg(type) AS type
    FROM pokemon_card AS p
    JOIN inventory ON P.id = inventory.card_id
    JOIN pokemon_type ON p.numero=pokemon_type.pokemon_numero
    JOIN type ON pokemon_type.type_id=type.id
    GROUP BY
    p.id,
    p.nom,
    p.pv,
    p.attaque,
    p.defense,
    p.attaque_spe,
    p.defense_spe,
    p.vitesse,
    p.numero
    ORDER BY p.numero`;

    const result = await database.query(query);

    return result.rows;
  },
  addToInventory: async (id) => {
    await database.query(`INSERT INTO inventory (card_id) VALUES (${id})`);
  },
  getAllDecks: async (id) => {
    const query = (`SELECT * FROM decks ORDER BY id`);

    const result = await database.query(query);

    return result.rows;
  },
  getDeck: async (id) => {
    const query = (`SELECT * FROM decks WHERE id = ${id}`);

    const result = await database.query(query);

    return result.rows[0];
  },
  createNewDeck: async (obj) => {
    await database.query(`INSERT INTO decks (name) VALUES ('${obj.name}')`);
  },
  updateDeck: async (name, id) => {
    const query = {
      text: `UPDATE decks SET name = $1 WHERE id = $2`,
      values: [name, id]
    }

    await database.query(query);
  },
  removeDeck: async (id) => {
    const query = {
      text: `DELETE FROM decks WHERE id = $1`,
      values: [id]
    }

    await database.query(query);
  }
}

module.exports = dataMapper;