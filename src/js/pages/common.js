import { delClassForList } from "../feature/delClassForList.js";
import { DropdownList } from "../feature/showDropdownList.js";
import { changeTitleOptionsList } from "../feature/changeTitleOptionsList.js";
import { renderTotalPrice } from "../feature/renderTotalPrice.js";
import { renderCartMenu } from "../feature/renderHtml.js";
import store from "../store.js";
import { checkShippingForPage } from "../feature/checkShippingForPage.js";
import { changeQuantityInCartMenu } from "../feature/changeQuantityInCartMenu.js";

//Open/Close hidden elements//

const triggerOpen = document.querySelectorAll(".open-btn");
const overlay = document.querySelector("[data-overlay]");
const total = document.querySelectorAll("[data-total]");

export const closeData = (id) => {
  document.querySelector(`#${id}`)?.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("overflow-hidden");
};

for (let i = 0; i < triggerOpen.length; i++) {
  let currentId = triggerOpen[i].dataset.target;
  let targetEl = document.querySelector(`#${currentId}`);

  triggerOpen[i].addEventListener("click", function () {
    targetEl?.classList.add("active");
    overlay.classList.add("active");
    document.body.classList.add("overflow-hidden");
  });

  const closeDataById = () => closeData(currentId);
  targetEl
    ?.querySelector(".close-btn")
    ?.addEventListener("click", closeDataById);
  overlay.addEventListener("click", closeDataById,false);
}

//mobile-menu submenu

const submenu = document.querySelectorAll(".has-child");

submenu.forEach((menu) =>
  menu.addEventListener("click", function (e) {
    e.preventDefault();
    submenu.forEach((item) =>
      item !== this
        ? item.closest(".has-child").classList.remove("active")
        : null,
    );
    this.closest(".has-child").classList.toggle("active");
  }),
);

//tabs choose categories

const categoriesDropdownList = new DropdownList("#list-categories");
const gradeParamsDropdownList = new DropdownList("#list-params");

//Change title option list for tabs categories//

const categoriesList = document.querySelector("#list-categories");
const paramsList = document.querySelector("#list-params");

const changeTitleCategoriesOptionsList = changeTitleOptionsList(
  "#list-categories",
  ".option-title",
);
const changeTitleParamsOptionsList = changeTitleOptionsList(
  "#list-params",
  ".option-title",
);
const changeSubHeaderCategory = changeTitleOptionsList(
  ".header-content .subheader__item:last-child",
  "span",
);

categoriesList?.querySelectorAll("li").forEach((item) => {
  item.addEventListener("click", changeTitleCategoriesOptionsList);
});

paramsList?.querySelectorAll("li").forEach((item) => {
  item.addEventListener("click", changeTitleParamsOptionsList);
});

//add a category to the subheader//

document
  .querySelectorAll("#list-categories .options-item__btn")
  .forEach((btn) => btn.addEventListener("click", changeSubHeaderCategory));

//tabs details for single-page//

const detailsBtn = document.querySelectorAll(".detail-link");

detailsBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    delClassForList(detailsBtn, "active");
    this.classList.add("active");
    const tabs = document.querySelectorAll(".product-about");
    delClassForList(tabs, "active");
    document.getElementById(this.dataset.target).classList.add("active");
  });
});

const scrollTopBtn = document.querySelector(".scroll-top_btn");
const scrollTopLinks = document.querySelector("a.scroll-top");

//the behavior of the header during an scroll//

const header = document.getElementById("header");

const isVisibleHeader = () => {
  let lastScrollTop = 80;
  return () => {
    const currentScrollTop = +window.scrollY.toFixed();
    if (currentScrollTop > lastScrollTop) {
      header.className = "hide";
    } else if (currentScrollTop === 0) {
      header.className = "";
    } else {
      header.className = "reveal";
    }
    lastScrollTop = currentScrollTop < 80 ? 80 : currentScrollTop;
  };
};

const scrollShowHeader = isVisibleHeader();

const isVisibleScrollUpBtn = () => {
  if (window.scrollY > 1000 && window.innerWidth > 992) {
    scrollTopBtn.style.display = "flex";
    scrollTopBtn.style.alignItems = "center";
  } else {
    scrollTopBtn.style.display = "none";
  }
};

const headerVisibility = () => {
  scrollShowHeader();
  isVisibleScrollUpBtn();
};

window.addEventListener("scroll", headerVisibility);

//the behavior of the scrollTopBtn during an scroll//


const scrollUp = () => window.scrollTo(0, 0);

scrollTopBtn.addEventListener("click", scrollUp);
scrollTopLinks.addEventListener("click", scrollUp);

//render image from single-page from url params//

const updateCartCountForUi = (classUiElem) => {
  return () => {
    const list = document.querySelectorAll(classUiElem);
    list.forEach((item) => {
      item.textContent = store.state.cart.length;
    });
  };
};

export const updateCartCountForNavIcons = updateCartCountForUi(".cart-icon");

//cart-menu//

const cartMenu = document.getElementById("cart-menu");

const totalCartMenu = document.querySelector(
  ".cart-menu .math-pricing .total .value",
);

export const checkCartEmpty = () => {
  if (window.location.href.search("cart") < 0) return;
  if (store.state.cart.length === 0) {
    document.querySelector(".cart-empty")?.classList.add("active");
    document.querySelector(".cart-table").style.display = "none";
    document.querySelector(".cart-total").style.display = "none";
  } else {
    document.querySelector(".cart-empty")?.classList.remove("active");
    document.querySelector(".cart-table").style.display = "grid";
    document.querySelector(".cart-total").style.display = "block";
  }
};

const updateInfoAppOrder = () => {
  store.calcTotalPriceStore();
  store.writeToStorage();
  store.update();
  total.forEach((item) => renderTotalPrice(item, store.state.total));
}

export const changeQuantityCartMenuItem = (e, value) => {
  const elem = e.target.closest(`[data-id]`);
  const [id, color, size] = elem.dataset.id.split('-');
  const productIdx = store.state.cart.findIndex(
    (item) => item.id === +id && item.size === size && item.color === color,
  );
  if (productIdx > -1) {
    store.state.cart[productIdx].quantity = Number(value);
  }

  checkCartEmpty();
  updateInfoAppOrder();
  updateCartCountForNavIcons();
};

const openCartMenuBtn = document.querySelector("[data-target=cart-menu]");

export const handleChangeCartMenu = () => {
  if (store.state.cart.length && cartMenu.matches(".active")) {
    renderCartMenu(store.state.cart);
    store.calcTotalPriceStore();
    renderTotalPrice(totalCartMenu, store.state.total);
  }
};

openCartMenuBtn.addEventListener("click", handleChangeCartMenu);

//carousel

const swiperCarousel = new Swiper(".carousel-swiper", {
  spaceBetween: 30,
  slidesPerView: "auto",
  centeredSlides: true,
  speed: 1000,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    481: {
      slidesPerView: 2,
      slidesPerGroup: 1,
      centeredSlides: false,
    },
    640: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      centeredSlides: false,
    },
    992: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      centeredSlides: false,
    },
  },
});


export const delProductFromStateAndUpdateStorage = (e) => {
  const prodWrapper = e.target.closest("[data-id]");
  const id = parseInt(prodWrapper.dataset.id);
  const color = prodWrapper.querySelector(".color__value").innerText.toLowerCase();
  const size = prodWrapper.querySelector(".size__value").innerText.toLowerCase();
  const productParamsForCompare = { id, color, size };
  store.removeFromStateCart(productParamsForCompare);
  const cartPageProd = document.querySelector(`.cart [data-id="${id}-${color}-${size}"]`);
  prodWrapper.remove();
  cartPageProd?.remove();
  updateCartCountForNavIcons();
};


window.addEventListener("click", function (e) {
  const dataCounter = e.target.closest("[data-id]")?.querySelector(".product-quantity [data-quantity]");
  const buttonCounters =["decrease","increase","decrease-cart","increase-cart"]

  if (e.target.dataset.action === "increase-cart") {
    dataCounter.value = Number(dataCounter.value) + 1;
  }

  if (
    (e.target.dataset.action === "increase-cart" ||
      e.target.dataset.action === "decrease-cart") &&
    e.target.closest(".cart-menu")
  ) {
    changeQuantityInCartMenu(e);
  }

  if (e.target.dataset.action === "decrease-cart") {
    changeQuantityCartMenuItem(e, parseInt(dataCounter.value));
    updateCartCountForNavIcons();
  }

  if (
    e.target.dataset.action === "increase-cart"
  ) {
    changeQuantityCartMenuItem(e, parseInt(dataCounter.value));
    if (e.target.closest(".cart-card")) {
      let priceItem = e.target
        .closest(".cart-card")
        .querySelector(".price__item-value");
      let totalItem = e.target
        .closest(".cart-card")
        .querySelector(".price__total-value");
      totalItem.textContent = String(
        Number(priceItem.textContent) * Number(dataCounter.value),
      );
    }
  }

  if(buttonCounters.includes(e.target.dataset.action)){
    updateInfoAppOrder();
  }

  if (e.target.closest(".btn__remove[data-remove]")) {
    delProductFromStateAndUpdateStorage(e);
    checkCartEmpty();
    updateInfoAppOrder();
    updateCartCountForNavIcons();
  }

  if (e.target.closest("[data-shipping]")) {
    if (e.target.closest('[data-shipping="flat"]')) {
      store.setShipping(10);
    }
    if (e.target.closest('[data-shipping="free"]')) {
      store.setShipping(0);
    }
    updateInfoAppOrder();
  }

});

checkShippingForPage(store.state.shipping);

renderTotalPrice(totalCartMenu, store.state.total);
checkCartEmpty();
updateCartCountForNavIcons();
window.addEventListener("storage", () => {
  updateCartCountForNavIcons();
});

