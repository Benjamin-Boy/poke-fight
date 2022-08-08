// TODO Filter cards
// const deckCardsPanel = document.querySelector("#deckCardsPanel");
const cardsList = document.querySelectorAll(".card");

// Filter by name
const filterNameInput = document.querySelector("#deckCardName");

filterNameInput.addEventListener("input", (e) => {
  cardsList.forEach((card) => {
    const cardName = card.querySelector("#cardName");

    if (!cardName.innerHTML.toLowerCase().includes(e.target.value.toLowerCase())) {
      card.style.display = "none";
    } else {
      card.style.display = "block";
    }
  });
});

// Filter by type
const typesList = document.querySelectorAll(".cardType");

let arrayTypes = [];
let activeCards = [];

// Fill the array with every type of the current card
cardsList.forEach((card) => {
  if (card.style.display !== "none") {
    activeCards.push(card);
  }
});

function filterCardsByType(card) {
  // Creates an array to fill with every type of the current card
  const types = [];

  // Fill the array with every type of the current card
  Array.from(card.querySelectorAll(".deck__tooltip h3")).forEach((cardType) => {
    const typeName = cardType.textContent;

    types.push(typeName);
  });

  // Compare current card types with type filters enabled
  types.forEach((cardType) => {
    arrayTypes.forEach((type) => {
      if (arrayTypes.length > 1) {
        if (cardType === type) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      } else {
        if (types.includes(type)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      }
    });
  });
}

typesList.forEach((type) => {
  let filterActive = false;

  type.addEventListener("click", (e) => {
    if (!filterActive) {
      arrayTypes.push(e.target.querySelector('h3').textContent);

      cardsList.forEach((card) => {
        // Filter will only consider visible cards
        if (card.style.display === "none") {
          return;
        }

        filterCardsByType(card);
      });

      e.target.classList.add("cardType-active");

      filterActive = true;
    } else {
      arrayTypes = arrayTypes.filter(
        (arrayType) => arrayType !== type.querySelector('h3').textContent
      );

      cardsList.forEach((card) => {
        // Make all cards visible
        if (card.style.display === "none") {
          card.style.display = "block";
        }

        filterCardsByType(card);
      });

      e.target.classList.remove("cardType-active");

      filterActive = false;
    }

    activeCards = [];

    cardsList.forEach((card) => {
      if (card.style.display !== "none") {
        activeCards.push(card);
      }
    });
  });
});

// Filter by rank
const rankElms = document.querySelectorAll('.cardRank');

rankElms.forEach(rank => {

  rank.addEventListener('click', e => {
    if (!rank.classList.contains('cardRank-active')) {
      
      rankElms.forEach(rank => {
        rank.classList.remove('cardRank-active');
      });

      e.currentTarget.classList.add('cardRank-active');

      cardsList.forEach((card) => {
        // Make all cards visible
        if (card.style.display === "none") {
          card.style.display = "block";
        }

        filterCardsByRank(card, e.currentTarget);
      });

    } else {
      e.currentTarget.classList.remove('cardRank-active');

      cardsList.forEach((card) => {
        // Make all cards visible
        if (card.style.display === "none") {
          card.style.display = "block";
        }

        filterCardsByType(card, e.currentTarget);
      });
      
    }
  });
});

function filterCardsByRank(card, rank) {
  const cardRankElm = card.querySelector('.card__rank');
  const rankElm = rank.querySelector('h3');

  if (cardRankElm.textContent !== rankElm.textContent.toLowerCase()) {
    card.style.display = 'none';
  }
}

// Filter if in deck or not
const cardInDeckInput = document.querySelector('#card__InDeck input');
const cardNotInDeckInput = document.querySelector('#card__NotInDeck input');

cardInDeckInput.addEventListener('change', () => {
  if (cardInDeckInput.checked) {
    if (cardNotInDeckInput.checked) {
      cardNotInDeckInput.checked = false;
    }

    cardsList.forEach((card) => {
      // Make all cards visible
      if (card.style.display === "none") {
        card.style.display = "block";
      }

      filterCardsByInDeck(card);
    });
  } else {
    cardsList.forEach((card) => {
      card.style.display = "block";
    });
  }
});

cardNotInDeckInput.addEventListener('change', () => {
  if (cardNotInDeckInput.checked) {
    if (cardInDeckInput.checked) {
      cardInDeckInput.checked = false;
    }

    cardsList.forEach((card) => {
      // Make all cards visible
      if (card.style.display === "none") {
        card.style.display = "block";
      }

      filterCardsByInDeck(card);
    });
  } else {
    cardsList.forEach((card) => {
      card.style.display = "block";
    });
  }
});

function filterCardsByInDeck(card, deckId) {
  const cardDeckIdElm = card.querySelector('.card__deckId');

  if (cardInDeckInput.checked) {
    if (!cardDeckIdElm.textContent) {
      card.style.display = 'none';
    } else {
      card.style.display = 'block';
    }
  }

  if (cardNotInDeckInput.checked) {
    if (!cardDeckIdElm.textContent) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  }
}