
import {
  checkCartEmpty,
  closeData,
  handleChangeCartMenu,
  updateCartCountForNavIcons,
} from "./common.js";
import store from "../store.js";
import { renderTotalPrice } from "../feature/renderTotalPrice.js";
import {
  renderCardsList,
  renderCartPageCardProduct,
} from "../feature/renderHtml.js";

const cartTableBody = document.querySelector(".cart-table__content");
const totalCartPage = document.querySelector(".sub-total__price");

const openCartMenuBtn = document.querySelector("[data-target=cart-menu]");
const closeCartMenuBtn = document.querySelector(".close-btn__cart-menu");

openCartMenuBtn.addEventListener("click", handleChangeCartMenu);
closeCartMenuBtn.addEventListener("click", () => {
  renderTotalPrice(totalCartPage, store.state.total);
});

const clearCart = () => {
  cartTableBody.innerHTML = "";
  store.clearStore();
  closeData("clear-cart");
  checkCartEmpty();
  updateCartCountForNavIcons();
};

document.querySelector('[data-target="clear-cart"]')?.addEventListener("click", () => {
    document.querySelector('[data-clear = "accept"]')?.addEventListener("click", clearCart);
    document.querySelector('[data-clear = "cancel"]')?.addEventListener("click", () => closeData("clear-cart"));
  });

store.calcTotalPriceStore();
renderTotalPrice(totalCartPage, store.state.total);
renderCardsList(store.state.cart, cartTableBody, renderCartPageCardProduct);
