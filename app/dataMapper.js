const database = require('./database');

const dataMapper = {
  getCardsList: async () =>{
    // const query = `SELECT * FROM pokemon`;

    // const query = `SELECT pokemon.id, pokemon.nom, pokemon.pv, pokemon.attaque, pokemon.defense, pokemon.attaque_spe, pokemon.defense_spe, pokemon.vitesse, pokemon.numero, type.name AS type_names
    //   FROM pokemon
    //   JOIN pokemon_type
    //   ON pokemon.numero = pokemon_type.pokemon_numero
    //   JOIN type
    //   ON pokemon_type.type_id = type.id`;

    const query = `SELECT p.*,json_agg(type) AS type
    FROM pokemon AS p
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

    // console.log(result.rows);
    return result.rows;
  },
  getCard: async (id) =>{
    // const query = {
    //   text: `SELECT * FROM pokemon WHERE id = $1`,
    //   values: [id]
    // }
    
    const query = {
      text: `SELECT p.*,json_agg(type) AS type
      FROM pokemon AS p
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

    // if(result.rows.length > 1){
    //   for(let i=0 ; i < result.rows.length ; i++){

    //     if(i+1 <= result.rows.length-1){
    //       const keys = Object.keys(result.rows[i+1]);

    //       keys.forEach(key => {
    //         if(result.rows[i][key] !== result.rows[i+1][key]) {
    //           result.rows[i][key] = [result.rows[i][key], result.rows[i+1][key]];
    //         }
    //         else {
    //           result.rows[i][key] = result.rows[i][key];
    //         }
    //       })
    //     }
    //   }
    // }

    return result.rows[0];
  },
  getAllTypes: async () => {
    const query = `SELECT name, color FROM type JOIN pokemon_type ON type.id = pokemon_type.type_id GROUP BY type.name, type.color ORDER BY type.name`;

    const result = await database.query(query);
    return result.rows;
  }
}

module.exports = dataMapper;