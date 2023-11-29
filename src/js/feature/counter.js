class Counter {
  constructor(selector,initCount = 0,step = 1) {
    const quantity =  document.querySelector(selector);
    this.count =  initCount;
    this.step = step;
    this.refs= {
      btnDecrease: quantity.querySelector('[data-action="decrease"]'),
      btnIncrease: quantity.querySelector('[data-action="increase"]'),
      countBlock: quantity.querySelector('[data-quantity]'),
    }
    this.refs.countBlock.value=this.count;
    this.addListener();
  }

  onDecrement(){
    this.count -= this.step;
    this.refs.countBlock.value = this.count < 1 ? 0 : this.count;
  }
  onIncrement(){
    this.count += this.step;
    this.refs.countBlock.value = this.count;
  }
  addListener(){
    this.refs.btnDecrease.addEventListener('click', this.onDecrement.bind(this))
    this.refs.btnIncrease.addEventListener('click', this.onIncrement.bind(this))
  }
}

export default Counter;
