const statSliders = document.querySelectorAll('.stat__slider');
const allTypes = document.querySelectorAll('.poke__type__container');

// Fill stats slider bars with White
statSliders.forEach(statSlider => {
  const statSliderContent = statSlider.textContent;

  statSlider.style.width = `${statSliderContent}%`;
  statSlider.textContent = '';
});

// Modify pokemon types background colors
allTypes.forEach((type) => {
  const color = type.getAttribute('color');
  type.style.backgroundColor = color;
});

// Tooltips of pokemon types
// Appear when pokemon types icons are hovered
var tooltips = document.querySelectorAll('.tooltip');

window.onmousemove = function (e) {
    let x = `${(e.clientX + 20)}px`;
    let y = `${(e.clientY + 20)}px`;

    for (let i = 0; i < tooltips.length; i++) {
        tooltips[i].style.top = y;
        tooltips[i].style.left = x;
    }
};
