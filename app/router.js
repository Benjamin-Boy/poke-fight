const express = require("express");
const router = express.Router();

const mainController = require("./controllers/mainController");
const deckController = require("./controllers/deckController");
const profileController = require("./controllers/profileController");
const adminController = require("./controllers/adminController");
const authController = require("./controllers/authController");
const gameController = require("./controllers/gameController");

router.get("/", authController.loginPage);
router.post("/", authController.login);

router.get("/signup", authController.signupPage);
router.post("/signup", authController.signup);

router.use((req, res, next) => {
  if (!req.session.user) return res.redirect("/");

  next();
});

// Loads home page
router.get("/home", mainController.homePage);

// Loads game page
router.get("/game", gameController.gamePage);

// Loads card shop page
router.get("/cards", mainController.cardsList);
// Loads card details page
router.get("/card/:id", mainController.cardDetails);

// Loads deck page
router.get("/deck", deckController.deckPage);
// Adds card to inventory from card details page
router.get("/deck/add/:id", deckController.addCardToInventory);
// Adds card to inventory from card details page
router.get("/deck/remove/card/:cardId", deckController.removeCardFromInventory);
// Adds card to deck from card deck page
router.get("/deck/add/:cardId/:deckId", deckController.addCardToDeck);
// Removes card from deck
router.get("/deck/remove/:cardId/:deckId", deckController.removeCardFromDeck);
// Create a new deck from deck page
router.get("/deck/add", deckController.createDeck);
// Update name of deck from deck page
router.post("/deck/update", deckController.updateDeck);
// Delete name of deck from deck page
router.get("/deck/remove/:deckId", deckController.removeDeck);

// Loads profile page
router.get("/profile", profileController.profilePage);
// Loads admin page
router.get("/admin", adminController.adminPage);

router.get("/logout", authController.logout);

module.exports = router;
