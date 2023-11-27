export const getDataFromStorage = (key) => {
  const data= JSON.parse(localStorage.getItem(key));
  if(!data) return false
  return data;
}
