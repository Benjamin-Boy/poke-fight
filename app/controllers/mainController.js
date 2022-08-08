const dataMapper = require('../dataMapper');

const mainController = {
  homePage: (req, res) => {
    res.render('home');
  },
  cardsList: async (req, res) => {
    try {
      const cards = await dataMapper.getCardsList();

      res.render('cards', { cards });
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
  }
}

module.exports = mainController;