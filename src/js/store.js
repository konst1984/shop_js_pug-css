import {getDataFromStorage} from "./feature/localStorageActions.js";


export const initialState = {
  product: {},
  products: {},
  cart: [],
  total: 0,
  shipping: 0,
  error: false
};

class Store{
  constructor(list) {
    this.state = list;
  }
  getState() {
    return this.state;
  }

  update() {
    return this.state = this.readFromStorage() ;
  }
  addItem(product){
    const isExist = this.isExistItem(product)

    if (isExist) {
      const idx = this.state.cart.findIndex(item => this.isEqualProducts(item, product))
      this.state.cart[idx]={...this.state.cart[idx], quantity: this.state.cart[idx].quantity + product.quantity}

    } else {
      this.state.cart.push(product);
    }
  }
  setCurrentProduct(data){
    this.state.product = data || {};
  }
  setProducts(data){
      this.state.products = data || [];
  }

  setShipping(value){
    this.state.shipping = value;
  }

  removeFromStateCart(product){
    return this.state.cart = this.state.cart.filter(item => !this.isEqualProducts(item, product))
  }

  isEqualProducts (item, product){
    return item.id === product.id && item.size === product.size && item.color === product.color
  };
  isExistItem (product) {
   return !!this.state.cart.find((item) => this.isEqualProducts(item, product))
  }

  readFromStorage(){
    const data= JSON.parse(localStorage.getItem('state'));
    if(!data) return {};
    return data;
  }
  writeToStorage(){
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  calcTotalPriceStore(){
    this.state.total = this.state.cart.reduce((acc, item) => {
      acc += parseInt(item.quantity * item.price)
      return acc
    }, this.state.shipping)
  }
  clearStore(){
    this.state = initialState;
    this.writeToStorage()
    this.calcTotalPriceStore()
    this.update();
  }
}


const state = new Store(getDataFromStorage('state') || initialState)

export default state;
