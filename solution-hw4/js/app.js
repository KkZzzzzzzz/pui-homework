const cart = [];
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');

const glazingSelector = document.getElementById("glazingOptions");
const packSelector = document.getElementById("packOptions");
glazingSelector.addEventListener("change", updateTotalPrice);
packSelector.addEventListener("change", updateTotalPrice);
document.getElementById("add").addEventListener("click", addToCart);


//roll class
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

//add and print element to cart
function addToCart() {
    const rollType = params.get('roll');
    const rollGlazing = document.getElementById("glazingOptions").value;
    const packSize = document.getElementById("packOptions").value;
    const basePrice = parseFloat(document.getElementById("price").textContent.replace("$", ""));

    const newRoll = new Roll(rollType, rollGlazing, packSize, basePrice);
    cart.push(newRoll);

    console.log("Cart:", cart);
}

const basePrice = 2.49;
let glazingPrice = 0;
let packPrice = 0;
let totalPrice = 0;

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

//glazing options
for (const option in glazingOptions) {
    const glazingOption = document.createElement("option");
    glazingOption.value = option;
    glazingOption.textContent = option;
    glazingSelector.appendChild(glazingOption);
}

//pack size options
for (const option in packOptions) {
    const packOption = document.createElement("option");
    packOption.value = option;
    packOption.textContent = option;
    packSelector.appendChild(packOption);
}

//based on roll type
const rollDetails = rolls[rollType];
if (rollDetails) {
    document.getElementById("productImage").src = rollDetails.imageFile;
    document.getElementById("text").textContent = "Customize our delicious, hand-made " + rollType + " Cinnamon Roll to your liking!";
    document.getElementById("price").textContent = "$" + rollDetails.basePrice.toFixed(2);
}

function updateTotalPrice() {
    //glazing price and pack price
    glazingPrice = glazingOptions[glazingSelector.value];
    packPrice = packOptions[packSelector.value];
    //total
    totalPrice = (basePrice + glazingPrice) * packPrice;
    //text
    document.getElementById("price").textContent = `$${totalPrice.toFixed(2)}`;
}


