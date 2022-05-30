const dataMapper = require('../dataMapper');

const mainController = {
  homePage: async (req, res) => {
    try {
      const cards = await dataMapper.getCardsList();

      // if(!req.session.filter){
      //   req.session.filter = 'false';
      // }

      // console.log(req.session, 'HOME PAGE');

      res.render('home', { cards, filter: req.session.filter });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  cardDetails: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const card = await dataMapper.getCard(id);
      
      res.render('card', { card });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  filterByTypes: async (req, res) => {
    try {
      const { type } = req.query;
      const cards = await dataMapper.getCardsList();
      const filteredCards = [];
      const activeFilter = [];

      if(!req.session.filter){
        req.session.filter = 'false';
      }

      cards.forEach(card => {
        for(const item of card.type){
          if(item.name == type){
            filteredCards.push(card);
            activeFilter.push(item.name);
          }
        }
      })

      if(req.session.filter){
        req.session.filter = 'true';
      }

      // console.log(req.session, 'FILTER PAGE');

      res.render('home', { cards: filteredCards, filter: req.session.filter });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  showAllTypes: async (req, res, next) => {
    const types = await dataMapper.getAllTypes();

    res.locals.types = types;

    next();
  }
}

module.exports = mainController;