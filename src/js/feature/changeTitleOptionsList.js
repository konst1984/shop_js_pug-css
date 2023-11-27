export const changeTitleOptionsList = function(selectorList, selectorTitle) {
  return (e) => {
    const list = document.querySelector(selectorList);
    if(list){
      const targetTitle = list.querySelector(selectorTitle);
      targetTitle.textContent =  e.target.textContent;
    }
  }
};

