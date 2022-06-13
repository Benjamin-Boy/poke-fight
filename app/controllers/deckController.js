const dataMapper = require("../dataMapper");

const deckController = {
  deckPage: async (req, res) => {
    try {
      const cards = await dataMapper.getCardsList();
      const decks = await dataMapper.getAllDecks();

      // for(const deck of decks){
      //   req.session.decks.push(deck);
      // }

      // if(!req.session.deck){
      //   req.session.deck = [];
      // }

      // console.log(res.session, 'DECK PAGE');

      res.render("deck", { cards, decks, filter: req.session.filter });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  createDeck: async (req, res) => {
    try {
      req.session.decks = [];

      dataMapper.createNewDeck({ name: "Nouveau deck" });

      const decks = await dataMapper.getAllDecks();

      for (const deck of decks) {
        req.session.decks.push(deck);
      }

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
  addToDeck: async (req, res) => {
    try {
      // if(!req.session.deck){
      //   req.session.deck = [];
      // }

      // const id = Number(req.params.id);
      // const card = await dataMapper.getCard(id);

      // const existingCard = req.session.deck.find(card => card.id === id);

      // if(!existingCard && req.session.deck.length < 10){
      //   req.session.deck.push(card);
      // }

      // console.log(req.session, 'ADD CARD');

      res.redirect("/deck");
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  // TODO Filter cards for current deck,
  // TODO Filter by type,
  // TODO Filter by rank
  // TODO Ajouter fonctio modifier nom deck
  // TODO Ajouter fonctio supprimer deck
  // TODO Ajouter fonctio ajout de carte au deck
  // TODO Ajouter fonctio changer carte de deck
  // TODO Ajouter cartes sans deck dans inventaire
};

module.exports = deckController;
