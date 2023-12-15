const productCart = [
    { name: "Bread", type: "food", quantity: 1, price: 0.85,image:"https://i.ibb.co/34nxDwf/Bread.png"},
    { name: "Apples", type: "food", quantity: 1, price: 0.5,image:"https://i.ibb.co/ZWZ7BkJ/Apples.png" },
    { name: "Mushrooms", type: "food", quantity: 1, price: 0.1,image:"https://i.ibb.co/hy7Fnq2/mushrooms.png" },
    { name: "Beer", type: "alcohol", quantity: 1, price: 1,image:"https://i.ibb.co/ftJKmvq/Beer-Bottle.png" },
    { name: "Wine", type: "alcohol", quantity: 1, price: 8.99,image:"https://i.ibb.co/fpsdTVb/wine.png"},
    { name: "Steak", type: "food", quantity: 1, price:4,image:"https://i.ibb.co/g6CLFQL/Steak.png" },
    { name: "Blue Cheese", type: "food", quantity: 1, price: 2.99,image:"https://i.ibb.co/M5XYMPR/blue-cheese.png"},
    { name: "Candles", type: "home", quantity: 1, price: 1.99,image:"https://i.ibb.co/gM3tmD0/Candles.png"},
    { name: "Cheesecake", type: "food", quantity: 1, price: 4.99,image:"https://i.ibb.co/JBr64P8/cheesecake.png"},
    { name: "Chopping Board", type: "home", quantity: 1, price: 1.99,image:"https://i.ibb.co/zfFbthC/Chopping-board.png"},
    { name: "Bananas", type: "food", quantity: 1, price: 4.99,image:"https://i.ibb.co/tCd4xXT/Bannas.png"},
    { name: "Onions", type: "food", quantity: 1, price: 0.4 ,image:"https://i.ibb.co/6HShYz5/abhishek-hajare-D9h2-Rx-M1r-E-unsplash.jpg"}
  ];
  
  
  let discountFlag = false
  
  const discountForm =document.getElementById("form")
  const itemContainer = document.getElementById("item-container")
  const addButtons = document.getElementsByClassName('add-button')
  const removeButtons = document.getElementsByClassName('remove-button')
  const basketItems =document.getElementById('basketItems')
  const subtotal =document.getElementById('subtotal')
  const openBasket=document.getElementById('basket-button')
  const closeBasket=document.getElementById('close-basket-button')

const basketArray=[]

const originalPrices = productCart.map(function(item){return item.price})

console.log('These are the original prices' + originalPrices)


const resetButton =document.getElementById('reset-button')

resetButton.addEventListener('click',resetPrices)

function resetPrices()
{
  for(let i=0;i<productCart.length;i++){
    productCart[i].price=originalPrices[i]
  }
  displayAlert('Discount Removed', 'removed');
  discountFlag = false;
  renderCart()
}
  // Basket badge
  const badgeAmount=document.getElementById('badge-amount')

  
  let itemCount= 0

 function badgeIncrease(){
  itemCount++
  badgeAmount.textContent = itemCount
 }
 function badgeDecrease(){
  itemCount--
  badgeAmount.textContent = itemCount
 }

  
  // modal functions
  
  
  openBasket.addEventListener('click',openBasketModal)
  closeBasket.addEventListener('click',closeBasketModal)
  
  function openBasketModal() {
  basketModal.style.display = 'block';}
  
  function closeBasketModal() {
  const basketModal = document.getElementById('basketModal');
  basketModal.style.display = 'none';
  }
  // 
  
  function render(){
  let itemsHTML =""
  productCart.forEach(function(item,index){
  itemsHTML += `<div class='item shadow p-3 mb-5 rounded d-flex flex-column align-items-center'>
        <img class='image' src='${item.image}'><img>
        <p class='title'>${item.name}</p>
        <p class='price'>$${item.price}</p>
        <button class='add-button' id="${index}">Add to basket</button>
      </div>`
  })
  itemContainer.innerHTML = itemsHTML
  }
  
  render()
  
  for (let btn of addButtons){
  btn.addEventListener('click',addItemToCart)
  }
  
  
  function addItemToCart(){
  console.log(this.id)
  if(basketArray[this.id]){ 
  basketArray[this.id].quantity++; 
  } else {
  basketArray[this.id] = productCart[this.id]
  }
  console.log(productCart[this.id])
  badgeIncrease()
  renderCart()
  // note for self , 'this' in a function refers to the event 
  }
  
  function renderCart() {
    let itemsHTML = "";
    basketArray.forEach(function (item, index) {
      itemsHTML += 
      `<div class='row mb-4 shadow p-3 mb-5 bg-body-tertiary rounded d-flex align-items-center'>
      <div class='col-12 col-md-3'>
          <img class='img-fluid' src='${item.image}' alt='Item Image'>
      </div>
      <div class='item-container col-12 col-md-3'>
          <div class='basket-info'>
              <p class='title'>${item.name}</p>
              <p class='price'>Price = $${item.price}</p>
          </div>
      </div>
      <div class='button-container col-12 col-md-3'>
          <button class='btn btn-danger decrease-button'>-</button>
          <p class='quantity'>Quantity x ${item.quantity}</p>
          <button class='btn btn-success increase-button'>+</button>
          <button class='btn btn-secondary remove-button ms-2' data-index="${index}">
              <i class="bi bi-trash3 rounded"></i>
          </button>
      </div>
  </div>`;
    });
  
    basketItems.innerHTML = itemsHTML;
    
  // remove items
    const removeButtons = document.getElementsByClassName('remove-button');
    
    for (let btn of removeButtons) {
      btn.addEventListener('click', removeItemFromCart);
      }
  // decrease items
    const decreaseButton = document.getElementsByClassName('decrease-button');
    
      for (let btn of decreaseButton) {
      btn.addEventListener('click', decreaseItemQuantity);
      }
  // increase items
    const increaseButton = document.getElementsByClassName('increase-button');
    
      for (let btn of increaseButton) {
      btn.addEventListener('click', increaseItemQuantity);
      }
    cartCalculator(basketArray); 
  
}
  
  
  function removeItemFromCart() {
    const index = this.getAttribute('data-index');
    
    const currentQuantity =basketArray[index].quantity
    itemCount -= currentQuantity

    

    basketArray[index].quantity = 1;
   
    basketArray.splice(index, 1);

    badgeAmount.textContent = itemCount
    renderCart();
  }
  
  function decreaseItemQuantity(event) {
    const target=event.currentTarget.parentElement.parentElement
    const element = target.querySelector('.remove-button')
    const index= element.getAttribute('data-index')
    if(basketArray[index].quantity>1){
    basketArray[index].quantity--;
    }else{
      basketArray.splice(index, 1);
    }
    badgeDecrease()
    renderCart()
    cartCalculator(basketArray);  
  }
  
  function increaseItemQuantity(event) {
    const target=event.currentTarget.parentElement.parentElement
    const element = target.querySelector('.remove-button')
    const index= element.getAttribute('data-index')
    
    basketArray[index].quantity++;
    badgeIncrease()
    renderCart()
    cartCalculator(basketArray);  
  }
  
  // clearItems
  const clearItems = document.getElementsByClassName('clear');
  for (let btn of clearItems) {
    btn.addEventListener('click', clearBasket);
  }
  
  function clearBasket(event) {
    basketArray.forEach(function (arrayItem) {
      arrayItem.quantity=1;
      console.log(basketArray);
  });
  basketArray.length=0
  itemCount= 0
  badgeAmount.textContent = itemCount
  renderCart(); 
  }
  
  // subtotal calculator
  function cartCalculator(array){
  subtotal.innerHTML = array
  .reduce(function(accumulator, cur) { return accumulator + (cur.quantity * cur.price)}, 0)
  .toFixed(2)
  }
  
  
  
  // discounts
  
  const input =document.getElementById('discount-input')
  const addDiscount=document.getElementById('add-discount')
  const discountCheck=document.getElementById('discount-check')
  addDiscount.addEventListener('click',cartDiscountCalculator)
  
  
  function cartDiscountCalculator(event){
    event.preventDefault()
    
      

      if(input.value=="food" && discountFlag===false){
        for(let i=0;i < productCart.length;i++){
          if(productCart[i].type==="food"){
            let itemSum= productCart[i].price
            const percentageDiscount= (itemSum/100)*20;
            productCart[i].price -= percentageDiscount
            productCart[i].price =productCart[i].price.toFixed(2)
          }
        }
      displayAlert('Discount Applied','valid')
      discountFlag=true
      }else{
      displayAlert('Invalid code','invalid')
      }

      renderCart()
      input.value="";
    }
// Alert  

  function displayAlert(text, action) {
    discountCheck.textContent = text;

    discountCheck.classList.add(`alert-${action}`);

    
    setTimeout(function () {
      discountCheck.textContent = '';
      discountCheck.classList.remove(`alert-${action}`);
    }, 1000);
  
}