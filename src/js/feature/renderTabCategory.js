import { getData } from "../api/api.js";
import { renderCardProduct, renderCardsList } from "./renderHtml.js";
import { registerErrorAndRenderWarn } from "../pages";
const tabbedContentBox = document.querySelector(".tabbed .box-grid");
let category = "sweaters";

const dropDownList = document.querySelector(".options-list");

const renderCategoryTabContent = (query) => {
  getData(query)
    .then((data) => {
      renderCardsList(data, tabbedContentBox, renderCardProduct);
    })
    .catch(() => {
      registerErrorAndRenderWarn(tabbedContentBox);
    });
};

const loadCategory = (e) => {
  if (e.target.classList.contains("options-item__btn")) {
    if (category === e.target.textContent.toLowerCase()) return;
    category = e.target.textContent.toLowerCase();
    renderCategoryTabContent(category);
  }
};
dropDownList?.addEventListener("click", loadCategory);
renderCategoryTabContent(category);
