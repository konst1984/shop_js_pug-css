import {delProductFromStateAndUpdateStorage} from "../pages/common.js";

export const changeQuantityInCartMenu = (e) => {
  const card = e.target.closest("[data-id]");
  const dataCounter = card?.querySelector(".product-quantity [data-quantity]");
  if(window.location.href.search('cart') < 0 && window.location.href.search('checkout') < 0) return;

  const quantityValue = dataCounter.value;
  const price = card.querySelector('.price .text').textContent;
  const id = card.dataset.id;

  const selector = window.location.href.search('.cart') < 0 ? '.checkout-products__list' : '.cart-table__content';
  const cartCardForChange = document.querySelector(`${selector} [data-id='${id}']`);
  const prodQuantity = e.target.dataset.action === 'decrease-cart' ? quantityValue - 1 : +quantityValue;

  dataCounter.value = Number(prodQuantity);
  if(prodQuantity < 1){
    delProductFromStateAndUpdateStorage(e);
  }

  if(cartCardForChange?.closest('.cart')){
    cartCardForChange.querySelector('[data-quantity]').value = prodQuantity;
    cartCardForChange.querySelector('.price__total-value').textContent = parseInt(prodQuantity * price);
    return;
  }

  if(cartCardForChange?.closest('.checkout')){
    if(prodQuantity < 1) {
      cartCardForChange.remove();
      return;
    }
    document.querySelector('.checkout-products__total .total .value').textContent = document.querySelector('.cart-menu [data-total]').textContent;
    cartCardForChange.querySelector('.item-floating .count').textContent = prodQuantity;
  }
}
