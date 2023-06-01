const calculatorDisplay = document.querySelector('.calculator__display');
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;
const toggle = document.querySelector('.theme-toggle');
const toggleBtn = document.querySelector('.toggle-btn');
const calculator = document.querySelector('.calculator');
const body = document.querySelector("body");

toggleBtn.addEventListener("click", function() {
  body.classList.toggle("dark");
  toggleBtn.classList.toggle("theme-toggle--dark");
  calculator.classList.toggle("theme-toggle--dark");

  // change calculator button color
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach(function(button) {
    button.classList.toggle("dark");
  });
});

function inputDigit(digit) {
  if (waitingForSecondOperand) {
    calculatorDisplay.value = digit;
    waitingForSecondOperand = false;
  } else {
    const displayValue = calculatorDisplay.value;
    calculatorDisplay.value = displayValue === '0' ? digit : displayValue + digit;
  }
}

function inputDecimal() {
  if (waitingForSecondOperand) return;
  if (!calculatorDisplay.value.includes('.')) {
    calculatorDisplay.value += '.';
  }
}

function handleOperator(nextOperator) {
  const inputValue = parseFloat(calculatorDisplay.value);

  if (operator && waitingForSecondOperand) {
    operator = nextOperator;
    return;
  }

  if (firstOperand == null) {
    firstOperand = inputValue;
  } else if (operator) {
    const currentValue = firstOperand || 0;
    const result = performCalculation[operator](currentValue, inputValue);

    calculatorDisplay.value = String(result);
    firstOperand = result;
  }

  waitingForSecondOperand = true;
  operator = nextOperator;
}

const performCalculation = {
  '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
  '=': (firstOperand, secondOperand) => secondOperand
};

function resetCalculator() {
  calculatorDisplay.value = '0';
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
}

document.querySelector('.btn-reset').addEventListener('click', () => {
  resetCalculator();
});

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggleBtn.classList.toggle('theme-toggle--dark');
  calculator.classList.toggle('theme-toggle--dark');
});
