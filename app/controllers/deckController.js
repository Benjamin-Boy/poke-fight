const dataMapper = require("../dataMapper");
const Card = require('../models/card');

const deckController = {
  deckPage: async (req, res) => {
    try {
      const userId = req.session.user.id;

      const cards = await dataMapper.getCardsFromInventory(userId);
      const decks = await dataMapper.getAllDecks(userId);

      res.render("deck", { cards, decks });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  createDeck: async (req, res) => {
    try {
      dataMapper.createNewDeck({
        name: "Nouveau deck",
        user_id: req.session.user.id
      });

      res.redirect("/deck");
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  updateDeck: async (req, res) => {
    try {
      const propertyName = Object.keys(req.body);
      const deckId = propertyName[0].slice(5);

      await dataMapper.updateDeck(req.body[`name_${deckId}`], Number(deckId));

      req.session.decks = [];

      const decks = await dataMapper.getAllDecks();

      for (const deck of decks) {
        req.session.decks.push(deck);
      }

      res.redirect("/deck");
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  removeDeck: async (req, res) => {
    try {
      const deckId = Number(req.params.deckId);
      
      const cards = await dataMapper.getCardsFromDeck(deckId);
      
      cards.forEach(card => {
        dataMapper.removeCardFromDeck(card.id);
      });

      await dataMapper.removeDeck(deckId);

      res.redirect("/deck");
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  addCardToInventory: async (req, res) => {
    try {
      // On récupère l'id de la carte cliquée
      const id = Number(req.params.id);

      const cards = await dataMapper.getCardsList();

      const cardFound = cards.find(card => card.id === id);

      const newCard = new Card(cardFound.nom, cardFound.numero);

      newCard.generateRank();
      newCard.generateHp(cardFound.pv);
      newCard.generateAttack(cardFound.attaque);
      newCard.generateDefense(cardFound.defense);
      newCard.generateAttackSpe(cardFound.attaque_spe);
      newCard.generateDefenseSpe(cardFound.defense_spe);
      newCard.generateSpeed(cardFound.vitesse);
      newCard.generateLevel(cardFound.level);
      newCard.generatePrice(cardFound.price);

      dataMapper.addCardToInventory({
        nom: newCard.name,
        pv: newCard.hp,
        attaque: newCard.attack,
        defense: newCard.defense,
        attaque_spe: newCard.attack_spe,
        defense_spe: newCard.defense_spe,
        vitesse: newCard.speed,
        numero: newCard.numero,
        level: newCard.level,
        rank: newCard.rank,
        user_id: req.session.user.id
      });

      // On envoie la carte dans la table 'inventory' de la base de données si elle n'est pas déjà présente
      // if (!cardFound) {
      //   dataMapper.addCardToInventory(nom, pv, attaque, defense, attaque_spe, defense_spe, vitesse, numero, level, rank);
      // }

      res.redirect("/deck");
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  removeCardFromInventory: async (req, res) => {
    try {
      const cardId = Number(req.params.cardId);
      // const deckId = Number(req.params.deckId);

      // console.log(cardId);

      // const cards = await dataMapper.getCardsFromDeck(deckId);

      // const existingCard = cards.find(card => card.id === cardId);

      // console.log(existingCard);

      // if(existingCard){
      //   dataMapper.removeCardFromDeck(cardId);
      // }

      await dataMapper.removeCardFromInventory(cardId);

      return res.redirect("/deck");
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  addCardToDeck: async (req, res) => {
    try {
      const cardId = Number(req.params.cardId);
      const deckId = Number(req.params.deckId);

      const cards = await dataMapper.getCardsFromDeck(deckId);

      const existingCard = cards.find(card => card.id === cardId);

      if(!existingCard){
        await dataMapper.addCardToDeck(cardId, deckId);
      }

      res.redirect("/deck");
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  removeCardFromDeck: async (req, res) => {
    try {
      const cardId = Number(req.params.cardId);
      const deckId = Number(req.params.deckId);

      const cards = await dataMapper.getCardsFromDeck(deckId);

      const existingCard = cards.find(card => card.id === cardId);

      if(existingCard){
        await dataMapper.removeCardFromDeck(cardId);
      }

      res.redirect("/deck");
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  // handleCardDragNDrop: () => {

  // }

  
  // TODO Filtrer carte par niveau de carte

  // TODO Afficher détails de la carte quand on clique sur carte dans deck
  // TODO Ajouter fonctio changer carte de deck avec drag and drop
  // TODO Mettre en place système de devise et paiement cartes (Pokédollar)
  
  // TODO Mettre en place le jeu de deck building

};

module.exports = deckController;
