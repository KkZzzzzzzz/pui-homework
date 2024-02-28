const rolls = {
    "Original": {
        "basePrice": 2.49,
        "imageFile": "../assets/products/original-cinnamon-roll.jpg"
    },
    "Apple": {
        "basePrice": 3.49,
        "imageFile": "../assets/products/apple-cinnamon-roll.jpg"
    },
    "Raisin": {
        "basePrice": 2.99,
        "imageFile": "../assets/products/raisin-cinnamon-roll.jpg"
    },
    "Walnut": {
        "basePrice": 3.49,
        "imageFile": "../assets/products/walnut-cinnamon-roll.jpg"
    },
    "Double-Chocolate": {
        "basePrice": 3.99,
        "imageFile": "../assets/products/double-chocolate-cinnamon-roll.jpg"
    },
    "Strawberry": {
        "basePrice": 3.99,
        "imageFile": "../assets/products/strawberry-cinnamon-roll.jpg"
    }    
};

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

// Define glazing and pack options
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

//add roll to cart
const original = new Roll("Original", "Sugar milk", "1", rolls['Original'].basePrice);
cart.push(original);

const walnut = new Roll("Walnut", "Vanilla milk", "12", rolls['Walnut'].basePrice);
cart.push(walnut);

const raisin = new Roll("Raisin", "Sugar milk", "3", rolls['Raisin'].basePrice);
cart.push(raisin);

const apple = new Roll("Apple", "Keep original", "3", rolls['Apple'].basePrice);
cart.push(apple);

//update the cart items in html
function updateCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        displayCartItem(item);
    });
}

//remove item from cart
function removeItem(type) {
    const index = cart.findIndex(item => item.type === type);
    if (index !== -1) {
        cart.splice(index, 1);
        updateCart();
        updateTotalPrice();
    }
}

//update total price
function updateTotalPrice() {
    const totalPrice = cart.reduce((acc, item) => acc + item.calculatePrice(glazingOptions, packOptions), 0);
    document.getElementById("price").textContent = `$${totalPrice.toFixed(2)}`;
}

//display an item
function displayCartItem(roll) {
    const containerProduct = document.createElement('div');
    containerProduct.classList.add('containerProduct');

    const rollDetails = rolls[roll.type];
    containerProduct.innerHTML = `
        <div class="image">
            <img src="${rollDetails.imageFile}" alt="${roll.type}">
            <h3 class="remove" onclick="removeItem('${roll.type}')">Remove</h3>
        </div>
        <div class="des">
            <h4>${roll.type} Cinnamon Roll</h4>
            <h4>Glazing: ${roll.glazing}</h4>
            <h4>Pack size: ${roll.size}</h4>
        </div>
        <div class="price">
            <h4>$${roll.calculatePrice(glazingOptions, packOptions).toFixed(2)}</h4>
        </div>
    `;

    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.appendChild(containerProduct);
}

// Initial setup
updateCart();
updateTotalPrice();