function tabs(
  headerSelector,
  tabSelector,
  contentSelector,
  activeClass,
  display = "flex"
) {
  const header = document.querySelector(headerSelector),
    tab = document.querySelectorAll(tabSelector),
    content = document.querySelectorAll(contentSelector);
  function hideTabContent() {
    content.forEach((item) => {
      item.style.display = "none";
    });
    tab.forEach((item) => {
      item.classList.remove(activeClass);
    });
  }
  function showTabContent(i = 0) {
    content[i].style.display = display;
    tab[i].classList.add(activeClass);
  }
  hideTabContent();
  showTabContent();
  header.addEventListener("click", (e) => {
    const target = e.target;
    if (
      target.classList.contains(tabSelector.replace(/\./, "")) ||
      target.parentNode.classList.contains(tabSelector.replace(/\./, ""))
    ) {
      tab.forEach((item, i) => {
        if (target == item || target.parentNode == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

// FIRST argument is the class of our entire tab header.
// SECOND argument - the class of a specific element, when clicked, the tab will switch.
// THIRD argument is the class of the block that will be switched.
// FOURTH argument is the activity class that will be added for the currently active tab.
tabs(
  ".tabs__header",
  ".tabs__header-item",
  ".tabs__content-item",
  "tabs__header-item--active"
);
