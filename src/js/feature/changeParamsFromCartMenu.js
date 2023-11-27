export const changeParamsFromCartMenu = (e, cardElem) => {
  if(window.location.href.search('cart') < 0 && window.location.href.search('checkout') < 0) return;
  const color = cardElem.querySelector('.color__value').textContent;
  const size = cardElem.querySelector('.size__value').textContent;
  const quantityValue = cardElem.querySelector('[data-quantity]').value;
  const price = cardElem.querySelector('.price .text').textContent;
  const id = cardElem.dataset.id;
  const selector = window.location.href.search('.cart') < 0 ? '.checkout-products__list' : '.cart-table__content';
  const cartCardForChange = document.querySelector(`${selector} [data-id='${id}'][data-params='${color}${size}']`);
  if(cartCardForChange && cartCardForChange.closest('.cart')){
    const prodQuantity = e.target.dataset.action === 'decrease-cart' ? quantityValue - 1 : +quantityValue
    cartCardForChange.querySelector('[data-quantity]').value = prodQuantity;
    cartCardForChange.querySelector('.price__total-value').textContent = parseInt(prodQuantity * price);
    return;
  }
  if(cartCardForChange && cartCardForChange.closest('.checkout')){
    document.querySelector('.checkout-products__total .total .value').textContent = document.querySelector('.cart-menu [data-total]').textContent;
    cartCardForChange.querySelector('.item-floating').textContent = e.target.dataset.action === 'decrease-cart' ? quantityValue - 1 : +quantityValue;
  }
}
