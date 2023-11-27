export const delClassForList = (list, classname) =>
  list.forEach((item) => item.classList.remove(`${classname}`));
