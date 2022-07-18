function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(a, operator, b) {
  let result = 0;
  operator = String(operator);
  a = Number(a);
  b = Number(b);
  if (operator == "+") {
    result = add(a, b);
  } else if (operator == "-") {
    result = subtract(a, b);
  } else if (operator == "*") {
    result = multiply(a, b);
  } else if (operator == "/") {
    result = divide(a, b);
  }
  return result;
}

const elements = document.querySelectorAll("div.row>div");
const display = document.querySelector(".display");
const equalsButton = document.querySelector("div>.equals");
const operatorButtons = document.querySelectorAll("div.column>div");
const clearButton = document.querySelector(".clear");

let displayArray = [];

elements.forEach((element) => {
  element.addEventListener("click", (e) => {
    let currentValue = e.target.textContent;
    displayArray.push(currentValue);
    display.textContent = displayArray.join("");
  });
});
let currentOperation = [];
operatorButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (currentOperation.length == 0) {
      let currentOperand = displayArray.join("");
      currentOperation.push(currentOperand, e.target.textContent);
      displayArray = [];
      console.log(currentOperation);
    } else if (displayArray.length > 0) {
      currentOperation.push(displayArray.join(""));
      displayArray = [];
      let myPreviousOperand = operate(...currentOperation);
      displayArray.push(myPreviousOperand);
      currentOperation = [];
      currentOperation.push(myPreviousOperand, e.target.textContent);
      displayArray = [];
      display.textContent = "";
      display.textContent = myPreviousOperand;
    } else {
      let firstValue = currentOperation[0];
      let operand = currentOperation[1];
      let myDoubleOperand = operate(firstValue, operand, firstValue);
      currentOperation = [];
      currentOperation.push(myDoubleOperand, e.target.textContent);
      displayArray = [];
      display.textContent = "";
      display.textContent = myDoubleOperand;
    }
  });
});

equalsButton.addEventListener("click", () => {
  currentOperation.push(displayArray.join(""));
  let finalAnswer = operate(...currentOperation);
  display.textContent = finalAnswer;
  displayArray = [];
  currentOperation = [];
});

clearButton.addEventListener("click", () => {
  display.textContent = 0;
  displayArray = [];
  currentOperation = [];
});
