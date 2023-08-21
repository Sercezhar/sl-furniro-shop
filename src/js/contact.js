import { popup } from './modules/popup';

const form = document.querySelector('.contact-form');
const inputs = document.querySelectorAll('.contact-form__input');
const textarea = document.querySelector('.contact-form__textarea');
const popupMessage = document.querySelector('.backdrop');

form.addEventListener('submit', e => {
  e.preventDefault();

  popupMessage.classList.add('backdrop--visible');
  document.body.classList.add('locked');

  inputs.forEach(input => (input.value = ''));
  textarea.value = '';
});

popup(
  '.backdrop',
  'backdrop--visible',
  '.popup-header__button',
  '.popup-footer__button--secondary'
);
