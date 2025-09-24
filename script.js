const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "0";

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;
    if (value === "C") {
      currentInput = "0";
    } else if (value === "CE") {
      currentInput = currentInput.slice(0, -1) || "0";
    } else if (value === "←") {
      currentInput = currentInput.slice(0, -1) || "0";
    } else if (value === "=") {
      try {
        currentInput = eval(currentInput
          .replace("x", "*")
          .replace("÷", "/")
          .replace(",", "."));
      } catch {
        currentInput = "Error";
      }
    } else if (value === "x²") {
      currentInput = Math.pow(parseFloat(currentInput), 2).toString();
    } else if (value === "√x") {
      currentInput = Math.sqrt(parseFloat(currentInput)).toString();
    } else if (value === "1/x") {
      currentInput = (1 / parseFloat(currentInput)).toString();
    } else if (value === "±") {
        currentInput = (parseFloat(currentInput) * -1).toString();
    } else if (value === "%") {
        const operators = ["+", "-", "/", "x"];
        let lastOperatorIndex = -1;
        for (let op of operators) {
          const idx = currentInput.lastIndexOf(op);
          if (idx > lastOperatorIndex) {
            lastOperatorIndex = idx;
          }
        }
        const lastNumberStr = currentInput.substring(lastOperatorIndex + 1);
        const lastNumber = parseFloat(lastNumberStr);
        if (!isNaN(lastNumber)) {
          const percentageValue = (lastNumber / 100).toString();
          currentInput = currentInput.substring(0, lastOperatorIndex + 1) + percentageValue;
        } else {
          currentInput = "Error";
        }   
    } else {
      if (currentInput === "0") {
        currentInput = value;
      } else {
        currentInput += value;
      }
    }
    display.value = currentInput;
  });
});