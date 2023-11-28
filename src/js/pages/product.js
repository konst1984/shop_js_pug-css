import { getData } from "../api/api.js";
import { delClassForList } from "../feature/delClassForList.js";
import { updateCartCountForNavIcons } from "./common.js";
import store from "../store.js";
import { currency } from "../feature/constants.js";
import {
  renderSlideFromBigSwiper,
  renderSlideFromVerticalSwiper,
  addHtmlData,
  renderCardsList,
  renderCarouselCard,
} from "../feature/renderHtml.js";
import { registerErrorAndRenderWarn } from "./index.js";

const productContent = document.querySelector(".product");
const mainSlider = document.querySelector(".outer-main__wrapper");
const verticalSlider = document.querySelector(".outer-card__wrapper");

const productId = new URLSearchParams(window.location.search).get("id");
const category = new URLSearchParams(window.location.search).get("category");
const initActiveSlideIndex = ((productId - 1) % 4) * 2;

const subheaderCategoryName = document.querySelector(
  ".subheader__item:nth-child(3) span",
);
const subheaderProductTitle = document.querySelector(
  ".subheader__item:last-child span",
);
const carousel = document.querySelector(".carousel .box-grid.swiper-wrapper");
const summary = document.querySelector(".summary");
const summaryContent = document.querySelector(".summary-content");
const titleSection = document.querySelector(".summary .title");
const currentPriceBox = document.querySelector(".summary .current-price");
const oldPriceBox = document.querySelector(".summary .price-before");
const saleBox = document.querySelector(".summary .price-discount");
const colorsBox = document.querySelector(".color");
const sizeBox = document.querySelector(".size");
const quantity = document.querySelector("[data-quantity]");
const addToCartBtn = document.getElementById("addToCart");
const productDetailsTitle = document.querySelector("#product-description h3");

let productFromBuy = {};

//render info about product//

const renderImagesListFromSliders = (prodlist) => {
  let htmlMainSlider = "";
  let htmlVerticalSlider = "";
  prodlist.forEach((product) => {
    htmlMainSlider += renderSlideFromBigSwiper(product);
    htmlVerticalSlider += renderSlideFromVerticalSwiper(product);
  });
  addHtmlData(htmlMainSlider, mainSlider);
  addHtmlData(htmlVerticalSlider, verticalSlider);
};

const renderColorVariants = (colors, container) => {
  container.innerHTML = colors
    .map(
      (item) =>
        `<button class = "color__btn color__btn_hover" aria-label=${item} data-param=${item} style="background-color: ${
          item === "ocean" ? "#81b8cc" : item
        }"></button>`,
    )
    .join("");
};
const renderSizeVariants = (colors, container) => {
  container.innerHTML = colors
    .map(
      (item) =>
        `<button class="size__btn size__btn_hover" data-param=${item}>${item}</button>`,
    )
    .join("");
};

const renderCardDetail = (product) => {
  document.querySelector(".summary").setAttribute("data-id", product.id);
  subheaderCategoryName.textContent = product.category;
  subheaderProductTitle.textContent = product.title;
  titleSection.textContent = product.title;
  productDetailsTitle.textContent = product.title;
  currentPriceBox.textContent = `${currency}${product.price}`;
  oldPriceBox.textContent = `${
    product.oldPrice === undefined ? "" : currency + product.oldPrice
  }`;
  saleBox.textContent = `${
    product.sale === undefined ? "not sale" : `-${product.sale}%`
  }`;
  renderColorVariants(product.color, colorsBox);
  renderSizeVariants(product.size, sizeBox);
  quantity.value = product.quantity;
};

//Fetch product info//
const getProduct = () => {
  Promise.all([getData(`${category}/${productId}`), getData(`${category}`)])
    .then(([prodItem, prodlist]) => {
      store.setCurrentProduct(prodItem);
      store.setProducts(prodlist);
      renderCardDetail(prodItem);
      renderImagesListFromSliders(prodlist);
      summaryContent.classList.remove("hide");
      summary.querySelector(".single-loader").classList.add("hide");
    })
    .catch(() => {
      summary.classList.add("hide");
      summary.querySelector(".single-loader").classList.add("hide");
      registerErrorAndRenderWarn(productContent);
    });
};

const renderCarouselListNewProducts = () => {
  Promise.all([getData("sweaters"), getData("shirts"), getData("hoodies")])
    .then(([data1, data2, data3]) => {
      let products = [...data1, ...data2, ...data3].filter((item) => item.new);
      renderCardsList(products, carousel, renderCarouselCard);
    })
    .catch(() => {
      registerErrorAndRenderWarn(carousel);
    });
};

//Swipers//

const thumbnailImageSlider = new Swiper(".outer-card__swiper", {
  initialSlide: initActiveSlideIndex,
  direction: "vertical",
  spaceBetween: 10,
  slidesPerView: 1,
  freeMode: true,
  watchSlidesProgress: true,
  breakpoints: {
    481: {
      direction: "vertical",
      slidesPerView: 4,
    },
    648: {
      direction: "vertical",
      slidesPerView: 4,
    },
    769: {
      direction: "vertical",
      slidesPerView: 2,
    },
    840: {
      direction: "vertical",
      slidesPerView: 2.5,
    },
    980: {
      direction: "vertical",
      slidesPerView: 3.5
    },
  },
});

const mainImageSlider = new Swiper(".outer-main__swiper", {
  initialSlide: initActiveSlideIndex,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  scrollbar: {
    el: ".swiper-scrollbar",
  },
  keyboard: true,
  wheel: true,
  thumbs: {
    swiper: thumbnailImageSlider,
  },
});

mainImageSlider.on("activeIndexChange", function () {
  const index = Math.floor(this.activeIndex / 2);
  const prod = store.state.products.find((elem, i) => i === index);

  if (prod && prod.id !== store.state.product.id) {
    store.state.product = prod;
    productFromBuy = {
      ...prod,
      color: "",
      size: "",
    };
    renderCardDetail(prod);
    addToCartBtn.disabled = true;
  }
});

//create product from cart//

const setParamsProductForOrder = (btnClass, param) => (e) => {
  const buttonsChoice = document.querySelectorAll(btnClass);

  if (e.target.matches(btnClass)) {
    const valueParam = e.target.dataset.param;
    delClassForList(buttonsChoice, "selected");
    e.target.classList.add("selected");
    productFromBuy = { ...productFromBuy, [param]: valueParam };
  }
};

const setColor = setParamsProductForOrder(".color__btn", "color");
const setSize = setParamsProductForOrder(".size__btn", "size");

//check condition addToCart button(disabled)

const isCanBuyProduct = (product) => {
  addToCartBtn.disabled = !(product.size && product.color);
};

colorsBox.addEventListener("click", (e) => {
  setColor(e);
  isCanBuyProduct(productFromBuy);
});
sizeBox.addEventListener("click", (e) => {
  setSize(e);
  isCanBuyProduct(productFromBuy);
});

//add to cart product

const createProduct = () => {
  const quantity = +document.querySelector("#single-page [data-quantity]")
    .value;

  productFromBuy = {
    ...store.state.product,
    ...productFromBuy,
    quantity,
  };

  store.setCurrentProduct(productFromBuy);
  store.addItem(productFromBuy);

  store.writeToStorage();
  updateCartCountForNavIcons();
};

getProduct();
renderCarouselListNewProducts();
addToCartBtn.addEventListener("click", createProduct);
