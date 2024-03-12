//update the num text 
function updateCartBadge() {
    const cartBadge = document.getElementById('cart-badge');
    cartBadge.textContent = cart.length;
}