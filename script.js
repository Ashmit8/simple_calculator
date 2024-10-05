const display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = null;

function updateDisplay(value) {
  display.textContent = value;
}

function clear() {
  currentInput = '';
  previousInput = '';
  operator = null;
  updateDisplay('0');
}

function handleDigit(digit) {
  currentInput = currentInput === '0' ? digit : currentInput + digit;
  updateDisplay(currentInput);
}

function handleOperator(op) {
  if (currentInput === '') return;
  if (previousInput !== '') {
    calculate();
  }
  operator = op;
  previousInput = currentInput;
  currentInput = '';
}

function calculate() {
  if (operator === null || currentInput === '') return;
  let result = 0;
  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);

  switch (operator) {
    case '+':
      result = prev + curr;
      break;
    case '-':
      result = prev - curr;
      break;
    case '*':
      result = prev * curr;
      break;
    case '/':
      result = curr !== 0 ? prev / curr : 'Error';
      break;
  }

  currentInput = result.toString();
  operator = null;
  previousInput = '';
  updateDisplay(currentInput);
}

function handleEquals() {
  calculate();
}

function handleInput(event) {
  const target = event.target;
  if (target.classList.contains('digit')) {
    handleDigit(target.textContent);
  } else if (target.classList.contains('operator')) {
    handleOperator(target.textContent);
  } else if (target.classList.contains('equals')) {
    handleEquals();
  } else if (target.classList.contains('clear')) {
    clear();
  }
}

document.querySelector('.buttons').addEventListener('click', handleInput);

// Initialize display
clear();
