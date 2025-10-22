const iDisplay = document.querySelector('.iDisplay');
const buttons = document.querySelectorAll('.buttons');

let input = "";
let operator = "";
let firstNum = "";
let secondNum = "";
let resultDisplayed = false;

buttons.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        const value = e.target.textContent;

        if (value === "AC") {
            input = "";
            operator = "";
            firstNum = "";
            secondNum = "";
            resultDisplayed = false;
            iDisplay.textContent = "";
            return;
        }

        if (value === "C") {
            input = input.slice(0, -1);
            iDisplay.textContent = input;
            return;
        }

        if (value === "=") {
            if (firstNum && operator && secondNum) {
                let result = eval(`${firstNum}${operator}${secondNum}`);
                iDisplay.textContent = result;
                resultDisplayed = true;
                input = result.toString();
                firstNum = input;
                secondNum = "";
                operator = "";
            }
            return;
        }

        if (["+", "-", "*", "/"].includes(value)) {
            if (firstNum && !operator) {
                operator = value;
                input += value;
                iDisplay.textContent = input;
            }
            return;
        }

        if (!operator) {
            if (firstNum.length < 2) {
                firstNum += value;
                input += value;
                iDisplay.textContent = input;
            }
        } else {
            if (secondNum.length < 2) {
                secondNum += value;
                input += value;
                iDisplay.textContent = input;
            }
        }
    });
});