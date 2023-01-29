let CartIcon = document.querySelector("#cart-icon");
let Cart = document.querySelector(".cart");
let CloseCart = document.querySelector("#close");

CartIcon.onclick = () => {
    Cart.classList.add("active");
};

CloseCart.onclick = () => {
    Cart.classList.remove("active");
};


//cart working

if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);

} else {
    ready();
}


//remove items
function ready() {
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);

    for(var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    var quantityInput = document.getElementsByClassName("quantity");

    for(var i = 0; i < quantityInput.length; i++) {
        var input = quantityInput[i];
        input.addEventListener("change", quantityChange);
    }

    //Add to Cart
    var addCart = document.getElementsByClassName("add-cart");
    for(var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClick);
    }

    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyBtnClick);
}

function buyBtnClick() {
    var cartContent = document.getElementsByClassName("content-cart")[0];
    while(cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}


function removeCartItem(event) {
    var buttonClick = event.target;
    buttonClick.parentElement.remove();
    updateTotal();
}

//quantity
function quantityChange(event) {
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}


function addCartClick(event) {
    var button = event.target;
    var shopProduct = button.parentElement;
    var title = shopProduct.getElementsByClassName("product-title")[0].innerText;
    var price = shopProduct.getElementsByClassName("price")[0].innerText;
    var productImg = shopProduct.getElementsByClassName("img-product")[0].src;
    addProductCart(title,price,productImg);
    updateTotal();
}


function addProductCart(title,price,productImg){
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add("cart-box");
    var cartItem = document.getElementsByClassName("content-cart")[0];
    var cartItemName = cartItem.getElementsByClassName("cart-product-title");
    
    for(var i = 0; i < cartItemName.length; i++) {
        if(cartItemName[i].innerText == title) {
            alert("already this item to cart");
            return;
        }
    }


var cartBoxContent = `
        <img src="${productImg}" alt="img-cart">
                            
        <div class="box-detail">
            <div class="cart-product-title">${title}</div>
            
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="quantity">
        </div>

        <!--------remove cart--------->
        <i class="fa fa-trash cart-remove"></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItem.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('quantity')[0].addEventListener('change', quantityChange);
}

//update total 
function updateTotal() {
    var cartContent = document.getElementsByClassName("content-cart")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;

    for(var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var cartPrice = cartBox.getElementsByClassName("cart-price")[0];
        var cartQuantity = cartBox.getElementsByClassName("quantity")[0];
        var price = parseFloat(cartPrice.innerText.replace("$", ""));
        var quantity = cartQuantity.value;

        total = total + price * quantity;
    }
        total = Math.round(total * 100) / 100;
        document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}