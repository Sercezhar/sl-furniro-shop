export function popup(
  modalSelector,
  hideModal,
  headerCloseSelector,
  footerCloseSelector
) {
  const modal = document.querySelector(modalSelector);
  const headerClose = document.querySelector(headerCloseSelector);
  const footerClose = document.querySelector(footerCloseSelector);

  headerClose.addEventListener('click', toggleModal);
  footerClose.addEventListener('click', toggleModal);
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      toggleModal();
    }
  });

  function toggleModal() {
    modal.classList.toggle(hideModal);
    document.body.classList.toggle('locked');
  }
}
