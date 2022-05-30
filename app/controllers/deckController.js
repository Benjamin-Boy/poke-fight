const dataMapper = require('../dataMapper');

const deckController ={
  deckPage: (req, res) =>{

    if(!req.session.deck){
      req.session.deck = [];
    }

    console.log(res.session, 'DECK PAGE');

    res.render('deck', { cards: req.session.deck, filter: req.session.filter })
  },
  addToDeck: async (req, res) => {
    try {
      if(!req.session.deck){
        req.session.deck = [];
      }
  
      const id = Number(req.params.id);
      const card = await dataMapper.getCard(id);
  
      const existingCard = req.session.deck.find(card => card.id === id);
  
      if(!existingCard && req.session.deck.length < 5){
        req.session.deck.push(card);
      }
  
      console.log(req.session, 'ADD CARD');
  
      res.redirect('/deck');
    } catch (error) {
      res.status(500).send(error.message);
    }

  }
}

module.exports = deckController;