const express = require("express");
const router = express.Router();

const mainController = require("./controllers/mainController");
const deckController = require("./controllers/deckController");
const profileController = require("./controllers/profileController");
const adminController = require("./controllers/adminController");
const authController = require("./controllers/authController");

router.get("/", authController.loginPage);
router.post("/", authController.login);

router.get("/signup", authController.signupPage);
router.post("/signup", authController.signup);

router.use((req, res, next) => {
  if (!req.session.user) return res.redirect("/");

  next();
});

router.get("/home", mainController.showAllTypes, mainController.homePage);

// Loads chard shop page
router.get("/cards", mainController.showAllTypes, mainController.cardsList);
// Loads card details page
router.get(
  "/card/:id",
  mainController.showAllTypes,
  mainController.cardDetails
);

router.get(
  "/type/:type",
  mainController.showAllTypes,
  mainController.filterByTypes
);

// Loads deck page
router.get("/deck", mainController.showAllTypes, deckController.deckPage);
// Adds card to deck from card details page
router.get("/deck/add/:id", deckController.addToInventory);
// Adds card to deck from card details page
// router.get("/deck/add/:id", deckController.addToDeck);
// Create a new deck from deck page
router.get("/deck/add", deckController.createDeck);
// Update name of deck from deck page
router.post("/deck/update", deckController.updateDeck);
// Delete name of deck from deck page
router.get("/deck/remove/:id", deckController.removeDeck);

// Loads profile page
router.get("/profile", profileController.profilePage);
// Loads admin page
router.get("/admin", adminController.adminPage);

router.get("/logout", authController.logout);

module.exports = router;
