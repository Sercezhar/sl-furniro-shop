const buttonNext = document.querySelector('.rooms-slider__button-next');
const buttonPrev = document.querySelector('.rooms-slider__button-prev');
const slider = document.querySelector('.rooms-slider__wrapper');
const slides = document.querySelectorAll('.rooms-slider__item');
const indicatorContainer = document.querySelector('.slider-indicators');

// add active class to the first slide
slides[0].classList.add('rooms-slider__item--active');

// add indicators for each slide
slides.forEach(_ => {
  indicatorContainer.insertAdjacentHTML(
    'beforeend',
    `<span class="slider-indicators__bullet"></span>`
  );
});

const indicators = document.querySelectorAll('.slider-indicators__bullet');
// add active class to the first indicator
indicators[0].classList.add('slider-indicators__bullet--active');

let step = 0;
let currentIndex = 0;
const stepSize = 344;
const gap = 24;

// hide buttonPrev on first page load
buttonPrev.style.display = currentIndex == 0 ? 'none' : 'flex';

buttonPrev.addEventListener('click', onButtonPrev);
buttonNext.addEventListener('click', onButtonNext);

function onButtonPrev() {
  if (step <= stepSize) {
    return;
  }

  step -= stepSize + gap;

  currentIndex -= 1;

  handleButtonsVisibility();

  slides[currentIndex].classList.add('rooms-slider__item--active');
  slides[currentIndex + 1].classList.remove('rooms-slider__item--active');

  indicators[currentIndex].classList.add('slider-indicators__bullet--active');
  indicators[currentIndex + 1].classList.remove(
    'slider-indicators__bullet--active'
  );

  slider.style.left = -step + 'px';
}

function onButtonNext() {
  if (step >= stepSize * 3) {
    return;
  }

  currentIndex += 1;

  handleButtonsVisibility();

  slides[currentIndex].classList.add('rooms-slider__item--active');
  slides[currentIndex - 1].classList.remove('rooms-slider__item--active');

  indicators[currentIndex].classList.add('slider-indicators__bullet--active');
  indicators[currentIndex - 1].classList.remove(
    'slider-indicators__bullet--active'
  );

  step += stepSize + gap;

  slider.style.left = -step + 'px';
}

function handleButtonsVisibility() {
  buttonPrev.style.display = currentIndex == 0 ? 'none' : 'flex';
  buttonNext.style.display = currentIndex == 3 ? 'none' : 'flex';
}
