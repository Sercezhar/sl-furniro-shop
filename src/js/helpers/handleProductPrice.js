export function handleProductPrice() {
  const price = document.querySelectorAll('.prices__basic');
  const discount = document.querySelectorAll('.products-info__discount');
  const discountedPrice = document.querySelectorAll('.prices__discounted');

  let index = 0;

  price.forEach(item => {
    const priceValue = Number(item.innerText);

    item.innerHTML = `$${priceValue.toFixed(2)}`;

    if (item.classList.contains('prices__basic--discounted')) {
      const discountValue = Number(discount[index].innerText);
      const priceWithDiscount = priceValue - (priceValue * discountValue) / 100;

      discount[index].innerHTML = `-${discountValue}%`;
      discountedPrice[index].innerHTML = `$${priceWithDiscount.toFixed(2)}`;

      index += 1;
    }
  });
}
