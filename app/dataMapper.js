const database = require('./database');

const dataMapper = {
  getCardsList: async () =>{
    const query = `SELECT c.*,json_agg(type) AS type
    FROM card AS c
    JOIN card_type ON c.numero = card_type.pokemon_numero
    JOIN type ON card_type.type_id = type.id
    GROUP BY
    c.id,
    c.nom,
    c.pv,
    c.attaque,
    c.defense,
    c.attaque_spe,
    c.defense_spe,
    c.vitesse,
    c.numero
    ORDER BY c.numero`;

    const result = await database.query(query);

    return result.rows;
  },

  getCard: async (id) =>{
    const query = {
      text: `SELECT c.*,json_agg(type) AS type
      FROM card AS c
      JOIN card_type ON c.numero = card_type.pokemon_numero
      JOIN type ON card_type.type_id = type.id
      WHERE c.id = $1
      GROUP BY
      c.id,
      c.nom,
      c.pv,
      c.attaque,
      c.defense,
      c.attaque_spe,
      c.defense_spe,
      c.vitesse,
      c.numero`,
      values: [id]
    }

    const result = await database.query(query);

    return result.rows[0];
  },

  getCardsFromDeck: async (id) => {
    const query = {
      text: `SELECT c.*,json_agg(type) AS type
      FROM inventory AS c
      JOIN card_type ON c.numero = card_type.pokemon_numero
      JOIN type ON card_type.type_id = type.id
      JOIN deck ON c.deck_id = deck.id
      WHERE c.deck_id = $1
      GROUP BY
      c.id,
      c.nom,
      c.pv,
      c.attaque,
      c.defense,
      c.attaque_spe,
      c.defense_spe,
      c.vitesse,
      c.numero`,
      values: [id]
    }

    const result = await database.query(query);

    return result.rows;

  },

  getCardsFromInventory: async (id) =>{
    const query = `SELECT c.*,json_agg(type) AS type
    FROM inventory AS c
    JOIN card_type ON c.numero = card_type.pokemon_numero
    JOIN type ON card_type.type_id = type.id
    WHERE c.user_id = ${id}
    GROUP BY
    c.id,
    c.nom,
    c.pv,
    c.attaque,
    c.defense,
    c.attaque_spe,
    c.defense_spe,
    c.vitesse,
    c.numero,
    c.user_id
    ORDER BY c.numero`;

    const result = await database.query(query);

    return result.rows;
  },

  getAllTypes: async () => {
    const query = `SELECT name, color FROM type JOIN card_type ON type.id = card_type.type_id GROUP BY type.name, type.color ORDER BY type.name`;

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

  addCardToInventory: async (obj) => {
    // await database.query(`INSERT INTO inventory (card_id) VALUES (${id})`);
    await database.query(`INSERT INTO inventory
      (nom, pv, attaque, defense, attaque_spe, defense_spe, vitesse, numero, level, rank, user_id) VALUES
      ('${obj.nom}', '${obj.pv}', '${obj.attaque}', '${obj.defense}',' ${obj.attaque_spe}', '${obj.defense_spe}', '${obj.vitesse}', '${obj.numero}', '${obj.level}', '${obj.rank}', ${obj.user_id})`);
  },

  removeCardFromInventory: async (id) => {
    return await database.query(`DELETE FROM inventory WHERE id = $1`, [id]);
  },

  getAllDecks: async (id) => {
    const query = {
      text: `SELECT * FROM deck WHERE user_id = $1 ORDER BY id`,
      values: [id]
    }

    // const query = (`SELECT * FROM deck ORDER BY id`);
    
    const result = await database.query(query);

    return result.rows;
  },

  getDeck: async (id) => {
    const query = (`SELECT * FROM deck WHERE id = ${id}`);

    const result = await database.query(query);

    return result.rows[0];
  },

  addCardToDeck: async (cardId, deckId) => {
    const query = {
      text: `UPDATE inventory SET deck_id = $2 WHERE id = $1`,
      values: [cardId, deckId]
    }

    await database.query(query);
  },

  createNewDeck: async (obj) => {
    await database.query(`INSERT INTO deck (name, user_id) VALUES ('${obj.name}', ${obj.user_id})`);
  },

  updateDeck: async (name, id) => {
    const query = {
      text: `UPDATE deck SET name = $1 WHERE id = $2`,
      values: [name, id]
    }

    await database.query(query);
  },

  removeDeck: async (id) => {
    const query = {
      text: `DELETE FROM deck WHERE id = $1`,
      values: [id]
    }

    await database.query(query);
  },

  removeCardFromDeck: async (cardId) => {
    const query = {
      text: `UPDATE inventory SET deck_id = NULL WHERE id = $1`,
      values: [cardId]
    }

    await database.query(query);
  },
}

module.exports = dataMapper;