// Get references to the screen elements
const screen = document.getElementById("screen");
const operationScreen = document.getElementById("operation-screen");

// Initialize variables
let currentInput = "";
let operations = "";
let ans = 0;

// Add event listeners to buttons
document.querySelectorAll(".button").forEach(button => {
    button.addEventListener("click", () => {
        appendToOperations(button.value);
    });
});

document.querySelectorAll(".operator").forEach(button => {
    button.addEventListener("click", () => {
        appendToOperations(button.value);
    });
});

document.querySelector(".clear").addEventListener("click", () => {
    clearScreen();
});

document.querySelector(".delete").addEventListener("click", () => {
    deleteFromScreen();
});

document.querySelector(".plus-minus").addEventListener("click", () => {
    togglePlusMinus();
});

document.querySelector(".enter").addEventListener("click", () => {
    calculate();
});

document.querySelector(".ans").addEventListener("click", () => {
    appendToOperations(ans.toString());
});

document.addEventListener("keydown", (event) => {
    const key = event.key;
    if ((key >= "0" && key <= "9") || key === "." || key === "(" || key === ")") {
        appendToOperations(key);
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        appendToOperations(key);
    } else if (key === "Enter") {
        calculate();
    } else if (key === "Backspace") {
        deleteFromScreen();
    } else if (key.toLowerCase() === "c") {
        clearScreen();
    }
});

// Append value to operations string
function appendToOperations(value) {
    if (value === "√") {
        operations += "Math.sqrt(";
    } else if (value === "%") {
        const lastNumberMatch = operations.match(/(\d+\.?\d*)$/);
        if (lastNumberMatch) {
            const lastNumber = lastNumberMatch[0];
            operations = operations.replace(/(\d+\.?\d*)$/, `(${lastNumber}/100)`);
        }
    } else {
        operations += value;
    }
    updateOperationScreen();
}

// Clear the screen
function clearScreen() {
    currentInput = "";
    operations = "";
    screen.innerText = "0";
    operationScreen.innerText = "";
}

// Delete last character from the screen
function deleteFromScreen() {
    operations = operations.slice(0, -1);
    updateOperationScreen();
}

// Calculate result
function calculate() {
    try {
        ans = eval(operations);
        screen.innerText = ans;
        operationScreen.innerText = `${operations} = ${ans}`;
        operations = ans.toString();
    } catch (error) {
        screen.innerText = "Error";
        setTimeout(() => {
            clearScreen();
        }, 1500);
    }
}

// Toggle plus or minus sign for the last number
function togglePlusMinus() {
    if (operations) {
        const lastNumberMatch = operations.match(/(\d+\.?\d*)$/);
        if (lastNumberMatch) {
            const lastNumber = lastNumberMatch[0];
            const toggledNumber = parseFloat(lastNumber) * -1;
            operations = operations.replace(/(\d+\.?\d*)$/, toggledNumber);
            updateOperationScreen();
        }
    }
}

// Update the screen with the current operations string
function updateOperationScreen() {
    operationScreen.innerText = operations;
}
