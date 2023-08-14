function counterOnScroll(
  counterContainer,
  counterSelector,
  attributeSelector,
  speed = 1000
) {
  function counterFunc(counterSelector, attributeSelector, speed) {
    const counters = document.querySelectorAll(counterSelector);

    const interval = speed;

    counters.forEach((counter) => {
      let startsValue = 0;
      const endValue = parseInt(counter.getAttribute(attributeSelector));
      const duration = Math.floor(interval / endValue);

      const counterHandler = setInterval(() => {
        startsValue += 1;
        counter.textContent = startsValue;

        if (startsValue == endValue) {
          clearInterval(counterHandler);
        }
      }, duration);
    });
  }

  // play animation on scroll
  const counterSection = document.querySelectorAll(counterContainer);

  function counterTrigger(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        counterFunc(counterSelector, attributeSelector, speed);
      }
    });
  }

  const observer = new IntersectionObserver(counterTrigger);

  counterSection.forEach((box) => {
    observer.observe(box);
  });
}
