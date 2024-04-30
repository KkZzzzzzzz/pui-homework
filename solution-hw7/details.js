let selections = {
    hat: false,
    expression: false,
    clothing: false
};


function changeHat(hat) {
    document.getElementById('head').style.backgroundImage = `url(${hat})`;
    sessionStorage.setItem('selectedHat', hat);
    selections.hat = true;
    checkSelections();
}

function changeFacialExpression(expression) {
    document.getElementById('facialExpression').style.backgroundImage = `url(${expression})`;
    sessionStorage.setItem('selectedExpression', expression);
    selections.expression = true;
    checkSelections();
}

function changeClothing(clothing) {
    document.getElementById('clothing').style.backgroundImage = `url(${clothing})`;
    sessionStorage.setItem('selectedClothing', clothing);
    selections.clothing = true;
    checkSelections();
}

function checkSelections() {
    document.getElementById('confirmButton').disabled = !(selections.hat && selections.expression && selections.clothing);
}

function saveCharacterDesign() {
    const selectedHat = sessionStorage.getItem('selectedHat');
    const selectedExpression = sessionStorage.getItem('selectedExpression');
    const selectedClothing = sessionStorage.getItem('selectedClothing');

    if (selectedHat && selectedExpression && selectedClothing) {
        sessionStorage.setItem('confirmedCharacter', JSON.stringify({
            hat: selectedHat,
            expression: selectedExpression,
            clothing: selectedClothing
        }));
    
        window.location.href = 'index.html';
    } 
}


document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', function() {
        const parentRow = this.closest('.row');
        parentRow.querySelectorAll('.option').forEach(other => {
            other.classList.remove('selected'); // Remove 'selected' from all options in this row
        });
        this.classList.add('selected'); // Add 'selected' to the clicked option
    });
});
