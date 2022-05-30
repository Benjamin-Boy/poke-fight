const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController');
const deckController = require('./controllers/deckController');

router.get('/', mainController.showAllTypes, mainController.homePage);

router.get('/card/:id', mainController.showAllTypes, mainController.cardDetails);

router.get('/type/:type', mainController.showAllTypes, mainController.filterByTypes);

router.get('/deck', mainController.showAllTypes, deckController.deckPage);
router.get('/deck/add/:id', mainController.showAllTypes, deckController.addToDeck);


module.exports = router;