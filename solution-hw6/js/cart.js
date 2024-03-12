// Roll class
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }

    calculatePrice(glazingOptions, packOptions) {
        let glazingPrice = glazingOptions[this.glazing];
        let packPrice = packOptions[this.size];
        return (this.basePrice + glazingPrice) * packPrice;
    }
}

//glazing & packing 
const glazingOptions = {
    "Keep original": 0.00,
    "Sugar milk": 0.00,
    "Vanilla milk": 0.50,
    "Double chocolate": 1.50
};

const packOptions = {
    "1": 1,
    "3": 3,
    "6": 5,
    "12": 10
};

const cart = [];

// update html container
function updateCart() {
    const cartItemsContainer = document.querySelector('.cart-wrapper');
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        displayCartItem(item);
    });

    updateCartBadge();
}

// remove from cart
function removeItem(type) {
    const index = cart.findIndex(item => item.type === type);
    if (index !== -1) {
        cart.splice(index, 1);
        updateCart();
        updateTotalPrice();
        saveCartToLocalStorage();
    }
}

// save local storage
function addItem(roll) {
    cart.push(roll);
    updateCart();
    updateTotalPrice();
    saveCartToLocalStorage();
}


function updateTotalPrice() {
    const totalPrice = cart.reduce((acc, item) => acc + item.calculatePrice(glazingOptions, packOptions), 0);
    document.querySelector(".total-price").textContent = `$${totalPrice.toFixed(2)}`;
}

function displayCartItem(roll) {
    const containerProduct = document.createElement('div');
    containerProduct.classList.add('cart-item');

    const rollDetails = rolls[roll.type];
    containerProduct.innerHTML = `
        <div>
            <img class="product-image" src="images/products/${rollDetails.imageFile}" alt="${roll.type}">
            <p class="remove" onclick="removeItem('${roll.type}')">Remove</p>
        </div>
        <div class="item-detail">
            <p>${roll.type} Cinnamon Roll</p>
            <p>Glazing: ${roll.glazing}</p>
            <p>Pack Size: ${roll.size}</p>
        </div>
        <div class="item-price">
            <p>$${roll.calculatePrice(glazingOptions, packOptions).toFixed(2)}</p>
        </div>
    `;

    const cartItemsContainer = document.querySelector('.cart-wrapper');
    cartItemsContainer.appendChild(containerProduct);
}

// Save cart to local storage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Cart saved to local storage:', cart);
}


//load and display
function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        const storedItems = JSON.parse(storedCart);
        // Clear cart
        cart.length = 0;
        
        storedItems.forEach(item => {
            const roll = new Roll(item.type, item.glazing, item.size, item.basePrice);
            cart.push(roll);
        });
        console.log('Cart loaded from local storage:', cart);
    } else {
        console.log('No cart found in local storage');
    }
}

loadCartFromLocalStorage();
updateCart();
updateTotalPrice();
