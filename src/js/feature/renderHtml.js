import { currency } from "./constants.js";

const PAGE_LINK = "./product.html";
export const renderCardProduct = (product) => {
  const image = require(`./../../images/${product.image}`);
  const imageHover = require(`./../../images/${product.imageHover}`);
  return `<div class='card' data-id=${product.id}>
              <div class="card__box-image">
                <a class="permalink" href=${PAGE_LINK}?category=${
                  product.category
                }&id=${product.id} aria-label="go to the product page"></a>
                <div class="card__thumbnail">
                  <img src=${image} alt=${
                    product.category
                  } loading="lazy">
                </div>
                <div class="card__thumbnail card__thumbnail_hover"><img src=${imageHover} alt=${product.category} ></div>
                  <div class="actions">
                    <ul>
                      <li><a class="actions__link" href="#0"><i class="ri-star-line"></i></a></li>
                      <li><a class="actions__link" href="#0"><i class="ri-arrow-left-right-line"></i></a></li>
                      <li><button class="actions__link zoom-image open-btn " data-target='swiper-zoom'><i class="ri-eye-line"></i></button></li>
                    </ul>
                  </div>
                ${
                  product.sale
                    ? `<div class="label"><span>${product.sale}%</span></div>`
                    : ""
                }
              </div>
              <div class="card__info">
                <h2 class="card__title block-title"><a class="permalink" href=${PAGE_LINK}?category=${
                  product.category
                }&id=${product.id}>${product.title}</a></h2>
                <div class="card__price">
                  ${
                    product.oldPrice
                      ? `<span class="price-before">${currency}${product.oldPrice}</span>`
                      : ""
                  }
                  <span class="current text_bold">${currency}${
                    product.price
                  }</span>
                </div>
            </div>
          </div>`;
};

export const renderCarouselCard = (data) => {
  return `<div class='card-slide swiper-slide'>
              ${renderCardProduct(data)}
          </div>`;
};

export const renderCartMenu = (cartList) => {
  const cartMenuList = document.querySelector(".cart-menu__list");
  const cartMenuHtml = cartList.map((product) => {
    const image = require(`./../../images/${product.image}`);
    return `<li class="cart-menu__item" data-id="${product.id}-${product.color}-${product.size}">
              <div class="cart-menu__item-wrapper">
                <div class="product-quantity flex-ac">
                  <button class="product-quantity__btn" data-action="decrease-cart" type="button" aria-label="add item quantity">-</button>
                  <label class="label">
                    <input class="input" data-quantity type="text" value=${product.quantity}>
                  </label>
                  <button class="product-quantity__btn" data-action="increase-cart" type="button" aria-label="remove item quantity">+</button>
                </div>
                <div class="card-thumbnail">
                  <a class="permalink" href="#0"><img src=${image} alt="Product" loading="lazy"></a>
                </div>
                <div class="variants variants_pl">
                  <h4 class="variants__title">${product.title}</h4>
                  <div class="variants__item color text text_gray"><span>Color:</span><span class="text color__value">${product.color}</span></div>
                  <div class="variants__item size text text_gray"><span>Size:</span><span class="text text_upper size__value">${product.size}</span></div>
                  <div class="variants__item price text text_gray">Price: <span>${currency}</span><span class="text text_bold">${product.price}</span></div>
                </div>
              </div>
              <button class="btn btn__secondary btn__remove" data-remove><i class="ri-delete-bin-6-line"></i></button>
            </li>`;
  });

  cartMenuList.innerHTML = cartMenuHtml.join("");
};

export const renderCartPageCardProduct = (prod) => {
  if (!prod) return;
  const image = require(`./../../images/${prod.image}`);
  return `<div class="cart-card" data-id="${prod.id}-${prod.color}-${prod.size}">
              <div class="card-thumbnail">
              <a class="permalink" href=${PAGE_LINK}?category=${
                prod.category
              }&id=${
                prod.id
              } aria-label="go to the product page"><img src=${image} alt="Product" loading="lazy"></a>
              </div>
              <div class="variants">
                <h4 class="variants__title">Inner sweater in office</h4>
                <div class="variants__item color text_gray"><span>Color:</span><span class="color__value">${
                  prod.color
                }</span></div>
                <div class="variants__item size text_gray"><span>Size:</span><span class="size__value">${
                  prod.size
                }</span></div>
                <div class="variants__item price-mobile"><span class="text text_gray">Price:</span><span class="currency">${currency}</span><span class="text text_bold  price-mobile__value">${
                  prod.price
                }</span></div>
                <div class="variants__item total-mobile"><span class="text text_gray">Total:</span><span class="currency">${currency}</span><span class="text text_bold total-mobile__value">${
                  prod.price * prod.quantity
                }</span></div>
              </div>
              <div class="price price__item"><span class="currency">${currency}</span><span class="price__item-value">${
                prod.price
              }</span></div>
              <div class="product-quantity flex-ac">
                <button class="product-quantity__btn" data-action="decrease-cart" type="button">-</button>
                <label class="label">
                  <input class="input" data-quantity type="text" value="${
                    prod.quantity
                  }">
                </label>
                <button class="product-quantity__btn" data-action="increase-cart" type="button">+</button>
              </div>
              <div class="price price__total"><span class="currency">${currency}</span><span class="price__total-value">${
                prod.price * prod.quantity
              }</span></div>
              <button class="btn btn__secondary btn__remove" data-remove><i class="ri-delete-bin-6-line"></i></button>
            </div>`;
};
//single-page
export const renderSlideFromBigSwiper = (product) => {
  const image = require(`./../../images/${product.image}`);
  const imageHover = require(`./../../images/${product.imageHover}`);
  return `<div class="image-item swiper-slide" data-id=${product.id}>
                 <img src=${image} alt=${product.category}>
               </div>
               <div class="image-item swiper-slide" data-id=${product.id}>
                  <img src=${imageHover} alt=${product.category}>
              </div>`;
};

export const renderSlideFromVerticalSwiper = (product) => {
  const image = require(`./../../images/${product.image}`);
  const imageHover = require(`./../../images/${product.imageHover}`);
  return `<div class="image-item swiper-slide" >
              <div class="card__thumbnail" data-id=${product.id}>
                <img src=${image} alt=${product.category}>
              </div>
           </div>
           <div class="image-item swiper-slide">
              <div class="card__thumbnail" data-id=${product.id}>
                <img src=${imageHover} alt=${product.category}>
              </div>
          </div>`;
};

export const addHtmlData = (htmlData, container) => {
  if (container) {
    container.innerHTML = htmlData;
  }
};

export const renderCardsList = (data, container, renderFn) => {
  if (!data) return;
  let html = "";
  for (let i = 0; i < data.length; i++) {
    html += `${renderFn(data[i])}`;
  }
  addHtmlData(html, container);
};

export const renderCardProductCheckoutPage = (product) => {
  const image = require(`./../../images/${product.image}`);
  return `<div class="checkout-products__item box-grid" data-id="${product.id}-${product.color}-${product.size}">
            <div class="card-thumbnail">
              <span class="item-floating flex-center">x<span class="count">${product.quantity}</span></span>
              <a class="permalink" href=${PAGE_LINK}?category=${product.category}&id=${product.id} aria-label="go to the product page">
              <img src=${image} alt=${product.category} loading="lazy">
              </a>
            </div>
            <div class="variants">
              <h4 class="variants__title">${product.title}</h4>
              <div class="color text_gray"><span>Color:</span><span class="color__value">${product.color}</span></div>
              <div class="size text_gray"><span>Size:</span><span class="size__value">${product.size}</span></div>
              <div class="price text_gray"><span>Price:</span>${currency}${product.price}</div>
              <button class="btn btn__remove" aria-label="delete product" data-remove>
                <i class="ri-delete-bin-6-fill"></i>
              </button>
            </div>
          </div>`;
};

export const renderErrorBLock = (wrapper) => {
  if(!wrapper) return;
  wrapper.innerHTML = `<div class='error-block'>
                          <h3 class="title">Sorry, something went wrong:(</h3>
                          <h4>Try to reload the page or come back later.</h4>
                      </div>`;
};
