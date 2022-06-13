// Card animation
function map(val, minA, maxA, minB, maxB) {
  return minB + ((val - minA) * (maxB - minB)) / (maxA - minA);
}

function Card3D(card, ev) {
  let mouseX = ev.offsetX;
  let mouseY = ev.offsetY;
  let rotateY = map(mouseX, 0, 200, -25, 25);
  let rotateX = map(mouseY, 0, 250, 10, -10);
  let brightness = map(mouseY + mouseX, 1, 300, 1.8, 1);

  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  card.style.filter = `brightness(${brightness})`;
}

var cards = document.querySelectorAll(".card__deck");

cards.forEach((card) => {
  card.addEventListener("mousemove", (ev) => {
    Card3D(card, ev);
  });

  card.addEventListener("mouseleave", (ev) => {
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
    card.style.filter = "brightness(1)";
  });
});

// Tooltips of pokemon types
// Appear when pokemon types icons are hovered
// var tooltips = document.querySelectorAll('.deck__tooltip');

// window.onmousemove = function (e) {
//     let x = `${(e.clientX + 20)}px`;
//     let y = `${(e.clientY + 20)}px`;

//     for (let i = 0; i < tooltips.length; i++) {
//         tooltips[i].style.top = y;
//         tooltips[i].style.left = x;
//     }
// };

// Add new empty decks
// const addDeck = document.querySelector('.add__deck');
// const deckList = document.querySelector('.deckList ul');
// let id = 1;

// addDeck.addEventListener('click', () => {
//   const newDeckTag = document.createElement('li');
//   const newDeckTextTag = document.createElement('h3');
//   newDeckTextTag.textContent = `Deck ${id}`;

//   newDeckTag.classList.add('deck');

//   newDeckTag.appendChild(newDeckTextTag);

//   // Allows selecting each deck to show its cards
//   newDeckTag.addEventListener('click', (e) => {
//     showDeckCards(e);
//   })

//   deckList.insertBefore(newDeckTag, addDeck)

//   id++;
// });
// function showDeckCards(deck){
//   console.log(deck.toElement.innerText);
// }

// TODO Filter cards
const filterNameInput = document.querySelector("#deckCardName");
const deckCardsPanel = document.querySelector("#deckCardsPanel");
const cardsList = document.querySelectorAll(".card__deck");
const typesList = document.querySelectorAll(".cardType");

// Filter by name
filterNameInput.addEventListener("input", (e) => {
  cardsList.forEach((card) => {
    const cardName = card.querySelector("#cardName");

    if (!cardName.innerHTML.toLocaleLowerCase().includes(e.target.value)) {
      card.style.display = "none";
    } else {
      card.style.display = "block";
    }
  });
});

let arrayTypes = [];
let activeCards = [];

// console.log(Array.from(cardsList).length);

// Fill the array with every type of the current card
cardsList.forEach((card) => {
  if (card.style.display !== "none") {
    activeCards.push(card);
  }
});

console.log(activeCards.length);

function filterCards(card) {
  // Creates an array to fill with every type of the current card
  const types = [];

  // Fill the array with every type of the current card
  Array.from(card.querySelectorAll(".deck__tooltip h3")).forEach((cardType) => {
    const typeName = cardType.innerHTML;

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

// Filter by type
typesList.forEach((type) => {
  let filterActive = false;

  type.addEventListener("click", (e) => {
    if (!filterActive) {
      arrayTypes.push(e.target.innerHTML);

      cardsList.forEach((card) => {
        // Filter will only consider visible cards
        if (card.style.display === "none") {
          return;
        }

        filterCards(card);
      });

      e.target.classList.add("cardType-active");

      filterActive = true;
    } else {
      arrayTypes = arrayTypes.filter(
        (arrayType) => arrayType !== type.innerHTML
      );

      cardsList.forEach((card) => {
        // Make all cards visible
        if (card.style.display === "none") {
          card.style.display = "block";
        }

        filterCards(card);
      });

      e.target.classList.remove("cardType-active");

      filterActive = false;
    }

    // console.log(arrayTypes.length);

    activeCards = [];

    cardsList.forEach((card) => {
      if (card.style.display !== "none") {
        activeCards.push(card);
      }
    });

    console.log(activeCards.length);
  });
});
