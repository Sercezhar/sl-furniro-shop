function modal(
  triggerSelector,
  modalSelector,
  hideModal,
  headerCloseSelector,
  footerCloseSelector
) {
  const trigger = document.querySelector(triggerSelector);
  const modal = document.querySelector(modalSelector);
  const headerClose = document.querySelector(headerCloseSelector);
  const footerClose = document.querySelector(footerCloseSelector);

  trigger.addEventListener("click", toggleModal);
  headerClose.addEventListener("click", toggleModal);
  footerClose.addEventListener("click", toggleModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      toggleModal();
    }
  });

  function toggleModal() {
    modal.classList.toggle(hideModal);
    document.body.classList.toggle("locked");
  }
}

modal(
  ".modal-trigger",
  ".backdrop",
  "backdrop--visible",
  ".modal-header__button",
  ".modal-footer__button--secondary"
);
