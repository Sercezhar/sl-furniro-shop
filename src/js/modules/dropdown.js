export function dropdown(
  dropdownSelector,
  optionsSelector,
  itemSelector,
  itemActive
) {
  const dropdownButton = document.querySelector(dropdownSelector);
  const options = document.querySelector(optionsSelector);
  const optionsItem = document.querySelectorAll(itemSelector);

  if (!dropdownButton) {
    return;
  }

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
