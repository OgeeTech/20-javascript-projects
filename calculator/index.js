const calculatorButtons = document.querySelector("#calculator");
const displayInput = document.querySelector("#display");
let currentOperand = "";
let previousOperand = "";
let operation = undefined;

function compute() {
  let result;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    default:
      return;
  }
  currentOperand = result.toString();
  operation = undefined;
  previousOperand = "";
  displayInput.value = result;
}

function appendNumber(number) {
  if (number === "." && currentOperand.includes(".")) return;
  currentOperand = currentOperand.toString() + number.toString();
  displayInput.value = currentOperand;
}

function selectOperation(op) {
  if (currentOperand === "") return;
  if (previousOperand !== "") {
    compute();
  }
  operation = op;
  previousOperand = currentOperand;
  currentOperand = "";
}

function clear() {
  currentOperand = "";
  previousOperand = "";
  operation = undefined;
  displayInput.value = "";
}

calculatorButtons.addEventListener("click", (event) => {
  const buttonId = event.target.id;
  switch (buttonId) {
    case "ac":
      clear();
      break;
    case "de":
      currentOperand = currentOperand.toString().slice(0, -1);
      displayInput.value = currentOperand;
      break;
    case ".":
      appendNumber(".");
      break;
    case "/":
    case "*":
    case "-":
    case "+":
      selectOperation(buttonId);
      break;
    case "=":
      compute();
      break;
    default:
      if (Number.isInteger(parseFloat(buttonId))) {
        appendNumber(buttonId);
      }
      break;
  }
});




