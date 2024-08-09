document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});

function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    addCartToHTML(cart);
}

function addCartToHTML(cart) {
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';

    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');
    let totalQuantity = 0;
    let totalPrice = 0;

    if (cart.length > 0) {
        cart.forEach(product => {
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.innerHTML = 
                `<div class="info">
                    <div class="name">${product.product}</div>
                    <div class="price">£${product.price}/1 ${product.unit}</div>
                </div>
                <div class="quantity">${product.quantity}</div>
                <div class="returnPrice">£${(product.price * product.quantity).toFixed(2)}</div>`;
            listCartHTML.appendChild(newCart);
            totalQuantity += product.quantity;
            totalPrice += product.price * product.quantity;
        });
    }

    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = '$' + totalPrice.toFixed(2);
}
