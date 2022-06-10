const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController');
const deckController = require('./controllers/deckController');
const profileController = require('./controllers/profileController');
const adminController = require('./controllers/adminController');
const authController = require('./controllers/authController');

router.get('/', authController.loginPage);
router.post('/', authController.login);

router.get('/signup', authController.signupPage);
router.post('/signup', authController.signup);

router.use((req, res, next) => {
  if(!req.session.user) return res.redirect('/');

  next();
});

router.get('/home', mainController.showAllTypes, mainController.homePage);

router.get('/cards', mainController.showAllTypes, mainController.cardsList);
router.get('/card/:id', mainController.showAllTypes, mainController.cardDetails);

router.get('/type/:type', mainController.showAllTypes, mainController.filterByTypes);

router.get('/deck', mainController.showAllTypes, deckController.deckPage);
router.get('/deck/add/:id', mainController.showAllTypes, deckController.addToDeck);
router.get('/deck/add', deckController.createDeck);
router.post('/deck/add', deckController.updateDeck);

router.get('/profile', profileController.profilePage);
router.get('/admin', adminController.adminPage);

router.get('/logout', authController.logout);


module.exports = router;