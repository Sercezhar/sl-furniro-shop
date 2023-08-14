function accordion(triggerClass, itemClass, itemActive) {
  const items = document.querySelectorAll(triggerClass);

  items.forEach((item) => {
    item.addEventListener("click", () => {
      const parent = item.parentNode;
      if (parent.classList.contains(itemActive)) {
        parent.classList.remove(itemActive);
      } else {
        document
          .querySelectorAll(itemClass)
          .forEach((child) => child.classList.remove(itemActive));
        parent.classList.add(itemActive);
      }
    });
  });
}

accordion(".trigger", ".accordion__item", "accordion__item--active");
