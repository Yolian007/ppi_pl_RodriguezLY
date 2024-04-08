let currentOperation = '';
let currentNumber = '';
let result = null;

function appendNumber(number) {
    currentNumber += number;
    updateScreen();
}

function setOperation(operation) {
    if (currentNumber === '') return;
    if (currentOperation !== '') calculateResult();
    currentOperation = operation;
    result = parseFloat(currentNumber);
    currentNumber = '';
    updateScreen();
}

function calculateResult() {
    if (currentOperation === '' || currentNumber === '') return;
    const secondNumber = parseFloat(currentNumber);
    switch (currentOperation) {
        case '+':
            result += secondNumber;
            break;
        case '-':
            result -= secondNumber;
            break;
        case '*':
            result *= secondNumber;
            break;
        case '/':
            result /= secondNumber;
            break;
    }
    currentNumber = result.toString();
    currentOperation = '';
    updateScreen();
}

function clearScreen() {
    currentNumber = '';
    currentOperation = '';
    result = null;
    updateScreen();
}

function updateScreen() {
    const screen = document.getElementById('screen');
    screen.textContent = currentNumber;
    screen.style.color = getColorForOperation(currentOperation);
}

function getColorForOperation(operation) {
    switch (operation) {
        case '+':
            return '#f0ad4e';
        case '-':
            return '#5bc0de';
        case '*':
            return '#5cb85c';
        case '/':
            return '#d9534f';
        default:
            return '#000';
    }
}
