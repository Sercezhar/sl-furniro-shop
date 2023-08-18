function dropdown(dropdownSelector, optionsSelector, itemSelector, itemActive) {
  const dropdownButton = document.querySelector(dropdownSelector);
  const options = document.querySelector(optionsSelector);
  const optionsItem = document.querySelectorAll(itemSelector);

  document.addEventListener('click', handleOptionsVisibility);
  optionsItem.forEach(item => {
    item.addEventListener('click', () => handleOptionClick(item));
  });

  function hideOptions() {
    options.classList.add('visually-hidden');
  }

  function handleOptionClick(item) {
    dropdownButton.value = item.dataset.option;
    hideOptions();
    optionsItem.forEach(option => {
      option.classList.remove(itemActive);
    });
    item.classList.add(itemActive);
  }

  function handleOptionsVisibility(event) {
    if (event.target.matches(dropdownSelector)) {
      options.classList.toggle('visually-hidden');
    }

    if (!event.target.matches(dropdownSelector)) {
      hideOptions();
    }
  }
}

dropdown(
  '.cp-show__input',
  '.cp-show__list',
  '.cp-show__item',
  'cp-show__item--active'
);
dropdown(
  '.cp-sort__input',
  '.cp-sort__list',
  '.cp-sort__item',
  'cp-sort__item--active'
);
