const glazingSelector = document.getElementById("glazingOptions");
const packSelector = document.getElementById("packOptions");
glazingSelector.addEventListener("change", updateTotalPrice);
packSelector.addEventListener("change", updateTotalPrice);

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

function updateTotalPrice() {
    const glazingSelector = document.getElementById("glazingOptions");
    const packSelector = document.getElementById("packOptions");
    //update glazing price and pack price
    glazingPrice = glazingOptions[glazingSelector.value];
    packPrice = packOptions[packSelector.value];
    //total price
    totalPrice = (basePrice + glazingPrice) * packPrice;
    //change text
    document.getElementById("price").textContent = `$${totalPrice.toFixed(2)}`;
}
