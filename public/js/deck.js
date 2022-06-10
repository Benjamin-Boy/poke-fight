function map(val, minA, maxA, minB, maxB) {
  return minB + ((val - minA) * (maxB - minB)) / (maxA - minA);
}

function Card3D(card, ev) {
  let mouseX = ev.offsetX;
  let mouseY = ev.offsetY;
  let rotateY = map(mouseX, 0, 200, -25, 25);
  let rotateX = map(mouseY, 0, 250, 10, -10);
  let brightness = map(mouseY+mouseX, 1, 300, 1.8, 1);
  
  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  card.style.filter = `brightness(${brightness})`;
}

var cards = document.querySelectorAll('.card__deck');

cards.forEach((card) => {
  card.addEventListener('mousemove', (ev) => {
    Card3D(card, ev);
  });
  
  card.addEventListener('mouseleave', (ev) => {    
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    card.style.filter = 'brightness(1)';
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