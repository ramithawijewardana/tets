let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners for the Add to Cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.getAttribute('data-product');
            const price = parseFloat(button.getAttribute('data-price'));
            const unit = button.getAttribute('data-unit');
            addToCart(product, price, unit);
        });
    });

    // Add event listeners for cart actions
    document.querySelector('.iconCart').addEventListener('click', toggleCart);
    document.querySelector('.close').addEventListener('click', toggleCart);
    document.getElementById('buyNowButton').addEventListener('click', buyNow);
    document.getElementById('saveToFavoritesButton').addEventListener('click', saveToFavorites);
    document.getElementById('applyFavoritesButton').addEventListener('click', applyFavorites);

    // Clear cart on page load
    clearCartOnLoad();
});

function clearCartOnLoad() {
    // Clear local storage
    localStorage.removeItem('cart');
    // Clear the cart array
    cart = [];
    // Update the cart display
    updateCart();
}

function toggleCart() {
    const cart = document.querySelector('.cart');
    const container = document.querySelector('.container');
    if (cart.style.right === '0px') {
        cart.style.right = '-100%';
        container.classList.remove('transformed');
    } else {
        cart.style.right = '0';
        container.classList.add('transformed');
    }
}

function addToCart(product, price, unit) {
    const quantityInput = document.getElementById(product.toLowerCase());
    const quantity = parseFloat(quantityInput.value);
    if (!isNaN(quantity) && quantity > 0) {
        const totalPrice = price * quantity;
        cart.push({ product, quantity, unit, price, totalPrice });
        updateCart();
        quantityInput.value = '';
    }
}

function updateCart() {
    const cartTableBody = document.querySelector('#cartTable tbody');
    const listCartHTML = document.querySelector('.listCart');
    const totalQuantityHTML = document.querySelector('.totalQuantity');
    const totalPriceHTML = document.querySelector('.totalPrice');
    cartTableBody.innerHTML = '';
    listCartHTML.innerHTML = '';

    let cartTotal = 0;
    let totalQuantity = 0;

    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.product}</td>
            <td>${item.quantity} ${item.unit}</td>
            <td>£${item.price.toFixed(2)}</td>
            <td>£${item.totalPrice.toFixed(2)}</td>
        `;
        cartTableBody.appendChild(row);

        const cartItem = document.createElement('div');
        cartItem.classList.add('item');
        cartItem.innerHTML = `
            <img src="default-image.png" alt="${item.product}">
            <div class="content">
                <div class="name">${item.product}</div>
                <div class="price">£${item.price} / 1 ${item.unit}</div>
            </div>
            <div class="quantity">
                <button onclick="changeQuantity('${item.product}', '-')">-</button>
                <span class="value">${item.quantity}</span>
                <button onclick="changeQuantity('${item.product}', '+')">+</button>
            </div>
        `;
        listCartHTML.appendChild(cartItem);

        cartTotal += item.totalPrice;
        totalQuantity += 1; // Count each product once, regardless of its quantity or unit
    });

    document.getElementById('cartTotalPrice').textContent = `£${cartTotal.toFixed(2)}`;
    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = `£${cartTotal.toFixed(2)}`;

    // Update the cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

function changeQuantity(product, type) {
    const item = cart.find(item => item.product === product);
    if (type === '+') {
        item.quantity++;
    } else if (type === '-') {
        item.quantity--;
        if (item.quantity <= 0) {
            cart = cart.filter(cartItem => cartItem.product !== product);
        }
    }
    item.totalPrice = item.quantity * item.price;
    updateCart();
}

function buyNow() {
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'checkout.html';
}

function saveToFavorites() {
    localStorage.setItem('favoriteCart', JSON.stringify(cart));
    alert('Order saved to favourites!');
}

function applyFavorites() {
    const favoriteCart = JSON.parse(localStorage.getItem('favoriteCart'));
    if (favoriteCart) {
        cart = favoriteCart;
        updateCart();
    } else {
        alert('No favourite order found.');
    }
}

function loadCart() {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
        cart = savedCart;
        updateCart();
    }
}
