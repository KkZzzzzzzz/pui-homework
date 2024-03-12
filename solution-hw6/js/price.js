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

	const glazingPrices = {
		"Keep original": 0.0,
		"Sugar milk": 0.0,
		"Vanilla milk": 0.50,
		"Double chocolate": 1.50
	};

	const packPrices = {
		"1": 1,
		"3": 3,
		"6": 5,
		"12": 10
	};

	let glazingOption = "Keep original";
	let packOption = "1";
	let basePrice = 0;
	let rollType = "";

	populateCinnamonData();
	populateSelectOptions();
	loadCartFromLocalStorage();

	function populateCinnamonData() {
		const params = new URLSearchParams(window.location.search);
		rollType = params.get("roll");
		const imagePath = "images/products/" + rolls[rollType]["imageFile"];
		const price = rolls[rollType]["basePrice"];

		const bannerElement = document.querySelector("#banner");
		bannerElement.innerText = rollType + " Cinnamon Roll";

		const imageElement = document.querySelector("img.product-image");
		imageElement.src = imagePath;

		basePrice = parseFloat(price);
		updateTotalPrice();
	}

	function populateSelectOptions() {
		// Populate glazing options with corresponding price adaptation values
		const glazingSelect = document.querySelector("select#glazing-options");

		for (const [glazing, price] of Object.entries(glazingPrices)) {
			const option = document.createElement("option");
			option.textContent = glazing;
			option.value = glazing;
			glazingSelect.appendChild(option);
		}

		// Populate pack options with corresponding price adaptation values
		const packSelect = document.querySelector("select#pack-options");

		for (const [pack, price] of Object.entries(packPrices)) {
			const option = document.createElement("option");
			option.textContent = pack;
			option.value = pack;
			packSelect.appendChild(option);
		}
	}

	/* Record the current glazing option and update the total price */
	function glazingChange(element) {
		glazingOption = element.value;
		updateTotalPrice();
	}

	/* Record the current pack option and update the total price */
	function packChange(element) {
		packOption = element.value;
		updateTotalPrice();
	}

	function updateTotalPrice() {
		const glazingPrice = glazingPrices[glazingOption];
		const packPrice = packPrices[packOption];
		const totalPrice = (basePrice + glazingPrice) * packPrice;
		const totalPriceField = document.querySelector("#add-cart span");
		totalPriceField.textContent = "$" + totalPrice.toFixed(2);
	}

	function printCart() {
		const roll = new Roll(rollType, glazingOption, packOption, basePrice);
		cart.push(roll);
		saveCartToLocalStorage();
		//call update badges.js
		updateCartBadge();
		console.log(cart);
	}

	//cart to local storage
	function saveCartToLocalStorage() {
		localStorage.setItem('cart', JSON.stringify(cart));
		console.log('cart saved:', cart);
	}

	function loadCartFromLocalStorage() {
		const storedCart = localStorage.getItem('cart');
		if (storedCart) {
			cart = JSON.parse(storedCart);
		} else {
			cart = [];
		}
		//call update badges.js
		updateCartBadge();
	}