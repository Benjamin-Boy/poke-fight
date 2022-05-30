// Toggle entre la vue des cartes en thumbnails et la vue en liste
const cardsContainerTumbnails = document.querySelector('.container__thumbnails');
const cardsContainerList = document.querySelector('.container__list');
const listToggleBtn = document.querySelector('.list__toggle');

listToggleBtn.addEventListener('click', () => {
  if(cardsContainerTumbnails.style.display !== 'none'){
    cardsContainerTumbnails.style.display = 'none';
    cardsContainerList.style.display = 'flex';
  }
  else{
    cardsContainerTumbnails.style.display = 'flex';
    cardsContainerList.style.display = 'none';
  }
});

// Affiche les filtres
const showFilters = document.querySelector('.show__filters');
const filterTop = document.querySelector('.filter__top');
const filterBottom = document.querySelector('.filter__bottom');
const allFilters = document.querySelectorAll('.pokeType');
const activeFilters = document.querySelectorAll('#filter');
const nameFilter = document.querySelector('#pokeName');

activeFilters.forEach(filter => {
  let activeFilter = filter.getAttribute('filter');

  if(activeFilter === 'true'){
    filterTop.style.display = 'flex';
    filterBottom.style.display = 'flex';
  }

});

showFilters.addEventListener('click', () => {
  activeFilters.forEach(filter => {
    let activeFilter = filter.getAttribute('filter');

    if(activeFilter === 'true'){
      filter.setAttribute('filter', 'false');
      filterTop.style.display = 'none';
      filterBottom.style.display = 'none';
    }
    else{
      filter.setAttribute('filter', 'true');
      filterTop.style.display = 'flex';
      filterBottom.style.display = 'flex';
    }
  });

});

allFilters.forEach((type) => {
  const color = type.getAttribute('color');
  type.style.backgroundColor = color;
});

