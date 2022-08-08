// Card animation
// function map(val, minA, maxA, minB, maxB) {
//   return minB + ((val - minA) * (maxB - minB)) / (maxA - minA);
// }

// function Card3D(card, ev) {
//   let mouseX = ev.offsetX;
//   let mouseY = ev.offsetY;
//   let rotateY = map(mouseX, 0, 200, -25, 25);
//   let rotateX = map(mouseY, 0, 250, 10, -10);
//   let brightness = map(mouseY + mouseX, 1, 300, 1.8, 1);

//   card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
//   card.style.filter = `brightness(${brightness})`;
// }

// var cards = document.querySelectorAll(".card__deck");

// cards.forEach((card) => {
//   card.addEventListener("mousemove", (ev) => {
//     Card3D(card, ev);
//   });

//   card.addEventListener("mouseleave", (ev) => {
//     card.style.transform = "rotateX(0deg) rotateY(0deg)";
//     card.style.filter = "brightness(1)";
//   });
// });

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


// Allows update of deck name
const deckFormElms = document.querySelectorAll('.deckForm');

Array.from(deckFormElms).forEach(deck => {
  const updateDeckBtn = deck.querySelector('.updateBtn');
  const deleteDeckBtn = deck.querySelector('.deleteBtn');
  const deckNameInput = deck.querySelector('.deckNameInput');

  updateDeckBtn.addEventListener('click', () => {
    deckNameInput.style.cursor = 'auto';
    deckNameInput.removeAttribute('readonly');
    updateDeckBtn.style.display = 'none';
    deleteDeckBtn.style.display = 'none';
  });
});

// Allows choosing which deck to add card to
const addCardBtns = document.querySelectorAll('.card__deck');

addCardBtns.forEach(cardBtn => {
  cardBtn.addEventListener('click', () => {
    const cardDeckList = cardBtn.querySelector('.card__deck__list');

    if (cardDeckList.style.opacity !== "1") {
      cardDeckList.style.opacity = "1"; 
    }
    else {
      cardDeckList.style.opacity = "0"; 
    }
  });
});

// Show cards from deck on left
const deckElms = document.querySelectorAll('.deck');

deckElms.forEach(deck => {
  deck.addEventListener('click', () => {
    const deckCardList = deck.querySelector('.deck__card__list');

    deckCardList.classList.toggle('is-hidden');
  });
});

// Drag and drop cards
const cards = document.querySelectorAll('.deck__card');

// Attach the dragstart event handler
cards.forEach(card => {
  card.addEventListener('dragstart', dragStart);
});

// Handle the dragstart
function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id);

  const id = e.dataTransfer.getData('text/plain');

  console.log(id);
  console.log(e.dataTransfer);

  // setTimeout(() => {
  //     e.target.classList.add('is-hidden');
  // }, 0);
}

const decks = document.querySelectorAll('.deck');

decks.forEach(deck => {
  deck.addEventListener('dragenter', dragEnter)
  deck.addEventListener('dragover', dragOver);
  deck.addEventListener('dragleave', dragLeave);
  deck.addEventListener('drop', drop);
});

function dragEnter(e) {
  e.preventDefault();
  e.target.classList.add('drag-over');
}

function dragOver(e) {
  e.preventDefault();
  e.target.classList.add('drag-over');
}

function dragLeave(e) {
  e.target.classList.remove('drag-over');
}

function drop(e) {
  e.preventDefault();
  e.target.classList.remove('drag-over');

  // get the draggable element
  const id = e.dataTransfer.getData('text/plain');
  const draggable = document.getElementById(id);

  // add it to the drop target
  const test = e.target.closest('.deck').querySelector('.deck__card__list');
  test.append(draggable);

  e.stopPropagation();
}

