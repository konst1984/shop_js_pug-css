import {
  addHtmlData,
  renderCardProductCheckoutPage,
  renderCardsList,
} from "../feature/renderHtml.js";
import { renderTotalPrice } from "../feature/renderTotalPrice.js";
import store from "../store.js";
import { checkShippingForPage } from "../feature/checkShippingForPage.js";
import { closeData, updateCartCountForNavIcons } from "./common.js";
import { getDataFromStorage } from "../feature/localStorageActions.js";

let checkoutState = store.getState() || getDataFromStorage("checkout");
localStorage.setItem("checkout", JSON.stringify(checkoutState));

const checkoutListCard = document.querySelector(".checkout-products__list");
const htmlContentList = checkoutState.cart
  .map((item) => renderCardProductCheckoutPage(item))
  .join("");
addHtmlData(htmlContentList, checkoutListCard);

const totalPrice = document.querySelector(
  ".checkout .math-pricing .total .value",
);
const closeCartMenuBtn = document.querySelector(".close-btn__cart-menu");

totalPrice.textContent = checkoutState.total;
closeCartMenuBtn.addEventListener("click", () => {
  store.calcTotalPriceStore();
  renderTotalPrice(totalPrice, store.state.total);
});

const clearData = () => {
  let timer = setTimeout(() => {
    store.clearStore();
    localStorage.removeItem("checkout");
    renderCardsList(
      store.state.cart,
      checkoutListCard,
      renderCardProductCheckoutPage,
    );
    window.location.href = "../../../../index.html";
    clearTimeout(timer);
  }, 3000);
};

const clearCheckoutData = () => {
  localStorage.removeItem("checkout");
  checkoutListCard.innerHTML = "";
  closeData("order-cancel");
  window.location.href = "../../../../index.html";
};

const buttons = document.querySelectorAll(".checkout [data-target]");

const checkActiveButtons = () => {
  if (checkoutState.cart.length) {
    buttons.forEach((btn) => btn.removeAttribute("disabled"));
  } else {
    buttons.forEach((btn) => btn.setAttribute("disabled", "true"));
  }
};

document
  .querySelector('[data-target="order-accept"]')
  ?.addEventListener("click", () => {
    let timerClose = setTimeout(() => {
      clearData();
      clearTimeout(timerClose);
    }, 3000);
  });

document
  .querySelector('[data-target="order-cancel"]')
  ?.addEventListener("click", () => {
    document
      .querySelector('[data-clear = "accept"]')
      ?.addEventListener("click", clearCheckoutData);
    document
      .querySelector('[data-clear = "cancel"]')
      ?.addEventListener("click", () => closeData("order-cancel"));
  });

const updateShipping = () => {
  checkShippingForPage(store.state.shipping);
  checkoutState.shipping = store.state.shipping;
  checkoutState.total = store.state.total;
  localStorage.setItem("checkout", JSON.stringify(checkoutState));
};

window.addEventListener("click", (e) => {
  if (e.target.closest("[data-shipping]")) {
    updateShipping();
  }
});

updateShipping();
updateCartCountForNavIcons();
checkActiveButtons();
