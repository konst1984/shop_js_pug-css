import '../feature/renderTabCategory.js'

const slideThumb = document.querySelector(".slider-thumb");
const inputRange = document.querySelector(".widget__range");

inputRange?.addEventListener("input", () => {
  let value = inputRange.value;
  const maxVal = inputRange.getAttribute("max");
  slideThumb.textContent = value;

  const thumbPosition = value / maxVal,
    space = inputRange.offsetWidth - slideThumb.offsetWidth / 2;
  slideThumb.style.left = thumbPosition * space + "px";
  slideThumb.classList.add("show");
});

inputRange?.addEventListener("blur", () => {
  slideThumb.classList.remove("show");
});

