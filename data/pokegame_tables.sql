DROP TABLE IF EXISTS "users", "deck", "card", "inventory", "card_rank", "card_type", "type";

--
-- Structure de la table 'user'
--

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "email" varchar(255) NOT NULL,
  "password" varchar(255) NOT NULL,
  "role" varchar(255) NOT NULL DEFAULT 'player',
  "parties" int NOT NULL DEFAULT 0,
  "victories" int NOT NULL DEFAULT 0,
  "victory_ratio" int NOT NULL DEFAULT 0,
  "cards_owned" int NOT NULL DEFAULT 0,
  "cards_bought" int NOT NULL DEFAULT 0,
  "cards_level" int NOT NULL DEFAULT 0,
  "card_most_played" int
);

--
-- Structure de la table 'deck'
--

CREATE TABLE "deck" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "user_id" int REFERENCES users(id)
);

--
-- Structure de la table 'card'
--

CREATE TABLE "card" (
  "id" int PRIMARY KEY,
  "nom" varchar(255) NOT NULL,
  "pv" int NOT NULL,
  "attaque" int NOT NULL,
  "defense" int NOT NULL,
  "attaque_spe" int NOT NULL,
  "defense_spe" int NOT NULL,
  "vitesse" int NOT NULL,
  "numero" int NOT NULL,
  "level" int NOT NULL DEFAULT 0 ,
  "rank" varchar(50) NOT NULL DEFAULT 'common',
  "price" varchar(50) NOT NULL DEFAULT 5
);

--
-- Structure de la table 'inventory'
--

CREATE TABLE "inventory" (
  "id" SERIAL PRIMARY KEY,
  "nom" varchar(255) NOT NULL,
  "pv" int NOT NULL,
  "attaque" int NOT NULL,
  "defense" int NOT NULL,
  "attaque_spe" int NOT NULL,
  "defense_spe" int NOT NULL,
  "vitesse" int NOT NULL,
  "numero" int NOT NULL,
  "level" int NOT NULL,
  "rank" varchar(50) NOT NULL DEFAULT 'common',
  "price" varchar(50) NOT NULL DEFAULT 5,
  "xp" varchar(50) NOT NULL DEFAULT 0,
  "deck_id" int REFERENCES deck(id),
  "user_id" int REFERENCES users(id),
  "card_id" int REFERENCES "card"(id)
);

--
-- Structure de la table 'card_rank'
--

CREATE TABLE "card_rank" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "card_id" int REFERENCES card(id)
);

--
-- Structure de la table 'card_type'
--

CREATE TABLE "card_type" (
  "id" int NOT NULL,
  "pokemon_numero" int NOT NULL,
  "type_id" int NOT NULL
);
 
--
-- Structure de la table 'type'
--

CREATE TABLE "type" (
  "id" int NOT NULL,
  "name" varchar(255) NOT NULL,
  "color" varchar(6) NOT NULL
);