let searchForm = document.querySelector('.search-form');
let shoppingCart = document.querySelector('.shopping-cart');
let loginForm = document.querySelector('.login-form');
let navbar = document.querySelector('.navbar');

// Toggling sections
document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
};

document.querySelector('#cart-btn').onclick = () => {
    shoppingCart.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
};

document.querySelector('#login-btn').onclick = () => {
    loginForm.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    navbar.classList.remove('active');
};

document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
};

window.onscroll = () => {
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
};

// Swiper setup
var swiper = new Swiper(".product-slider", {
    loop: true,
    spaceBetween: 20,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    centeredSlides: true,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1020: {
            slidesPerView: 3,
        },
    },
});

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product) {
    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const product = JSON.parse(button.getAttribute('data-product'));
        addToCart(product);
        alert(`${product.name} has been added to the cart!`);
    });
});

// On cart.html, load the cart data
if (window.location.pathname.endsWith('cart.html')) {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    function loadCart() {
        cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            cartTotal.textContent = '0.00';
        } else {
            let total = 0;
            cartItemsContainer.innerHTML = '';
            cart.forEach(item => {
                const itemTotal = (item.price * item.quantity).toFixed(2);
                total += parseFloat(itemTotal);
                const cartItem = document.createElement('div');
                cartItem.innerHTML = `
                    <div class="cart-item">
                        <span>${item.name} (${item.quantity})</span>
                        <span>$${itemTotal}</span>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
            cartTotal.textContent = total.toFixed(2);
        }
    }

    loadCart();
}


// Function to get cart from localStorage or initialize it
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

// Function to save cart to localStorage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Add product to cart
function addToCart(productName, price) {
  let cart = getCart();
  
  const existingProduct = cart.find(item => item.name === productName);
  
  if (existingProduct) {
      existingProduct.quantity++;
  } else {
      cart.push({ name: productName, price: price, quantity: 1 });
  }

  saveCart(cart);
  alert(`${productName} added to cart!`);
}

// Remove product from cart
function removeFromCart(productName) {
  let cart = getCart();
  cart = cart.filter(item => item.name !== productName);
  saveCart(cart);
  updateCart();
}
