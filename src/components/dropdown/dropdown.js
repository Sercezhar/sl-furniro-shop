function dropdown(
  dropdownSelector,
  optionsSelector,
  itemSelector,
  iconSelector,
  iconActive,
  itemActive
) {
  const dropdownButton = document.querySelector(dropdownSelector);
  const options = document.querySelector(optionsSelector);
  const optionsItem = document.querySelectorAll(itemSelector);
  const icon = document.querySelector(iconSelector);

  document.addEventListener("click", handleOptionsVisibility);
  optionsItem.forEach((item) => {
    item.addEventListener("click", () => handleOptionClick(item));
  });

  function hideOptions() {
    options.classList.add("visually-hidden");
    icon.classList.remove(iconActive);
  }

  function handleOptionClick(item) {
    dropdownButton.value = item.dataset.option;
    hideOptions();
    optionsItem.forEach((option) => {
      option.classList.remove(itemActive);
    });
    item.classList.add(itemActive);
  }

  function handleOptionsVisibility(event) {
    if (event.target.matches(dropdownSelector)) {
      options.classList.toggle("visually-hidden");
      icon.classList.toggle(iconActive);
    }

    if (!event.target.matches(dropdownSelector)) {
      hideOptions();
    }
  }
}

dropdown(
  ".dropdown__input",
  ".dropdown-options",
  ".dropdown-options__item",
  ".dropdown__icon",
  "dropdown__icon--rotate",
  "dropdown-options__item--active"
);
