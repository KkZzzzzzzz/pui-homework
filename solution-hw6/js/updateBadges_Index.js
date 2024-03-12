//update badge num on index page
function updateCartBadgeAndBudget() {
    const budgetNumber = document.getElementById('cart-badge');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    budgetNumber.textContent = cart.length;
}
window.addEventListener('load', updateCartBadgeAndBudget);
