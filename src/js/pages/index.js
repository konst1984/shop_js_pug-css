import '../feature/renderTabCategory.js'
import { getData } from "../api/api.js";
import {
  renderCardsList,
  renderCarouselCard,
  renderErrorBLock,
} from "../feature/renderHtml.js";
import store from "../store.js";

const sliderContainer = document.getElementById("carousel");
const slider = sliderContainer?.querySelector(".swiper-wrapper");
const sliderZoom = sliderContainer?.querySelector(".swiper-zoom");

//Swipers//

const swiperBanner = new Swiper(".slider", {
  loop: true,
  effect: "fade",
  autoHeight: true,
  // autoplay: {
  //   delay: 5000,
  // },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

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

//render cards//

export const registerErrorAndRenderWarn = (wrapper) => {
  store.state.error = true;
  store.writeToStorage();
  store.update();
  renderErrorBLock(wrapper);
};

const renderCarouselList = () => {
  let products = [];
  Promise.all([getData("sweaters"), getData("shirts"), getData("hoodies")])
    .then(([data1, data2, data3]) => {
      products = products.concat(data1, data2, data3);
      renderCardsList(products, slider, renderCarouselCard);
    })
    .catch(() => {
      registerErrorAndRenderWarn(slider);
    });
};

renderCarouselList();


