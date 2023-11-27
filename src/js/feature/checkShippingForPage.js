export const checkShippingForPage = (value) => {
  const flatShippingCheckers = document.querySelectorAll('[data-shipping="flat"] .checker')
  const freeShippingCheckers = document.querySelectorAll('[data-shipping="free"] .checker')
  if(value > 0){
    flatShippingCheckers.forEach(checker => checker.checked = 'true')
  }else{
    freeShippingCheckers.forEach(checker => checker.checked = 'true')
  }
}
