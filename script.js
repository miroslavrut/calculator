const numBtns = document.querySelectorAll(".numBtn");
const opBtns = document.querySelectorAll(".opBtn");
const display = document.querySelector(".display");
const dot = document.querySelector("#dot");
const equal = document.querySelector(".equal");
const calculator = document.querySelector(".calculator");

numBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
    const btnContent = e.target.textContent;
    const displayValue = display.textContent;
    const previousBtn = calculator.dataset.previous;
    if( displayValue === "0" || previousBtn === "operator") {
        display.textContent = btnContent;
        calculator.dataset.previous = "";
    } 
    else {
        display.textContent = displayValue + btnContent;
    }  
    });
});

opBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
        calculator.dataset.firstVal = display.textContent;
        calculator.dataset.previous = "operator";
        calculator.dataset.op = e.target.textContent;
    })
});

function operate(a, op, b) {
   let result = "";

   if(op === "+") {
        result = parseFloat(a) + parseFloat(b);
   }

   else if(op === "-") {
        result = parseFloat(a) - parseFloat(b);
   }

   else if(op === "*") {
        result = parseFloat(a) * parseFloat(b);
    }

    else if(op === "/") {
        result = parseFloat(a) / parseFloat(b);
    }
    
    return result;
}


dot.addEventListener("click", e => {
    if (calculator.dataset.previous === "operator") {
        display.textContent = "0";
    }
    if(!display.textContent.includes(".")) {
        display.textContent += ".";
    }
    calculator.dataset.previous = "dot";
})

equal.addEventListener("click", e => {
    const firstValue = calculator.dataset.firstVal;
    const operator = calculator.dataset.op;
    const secondValue = display.textContent;
   
    const calcValue = operate(firstValue, operator, secondValue);
    display.textContent = (calcValue + "").slice(0,9);
    
    calculator.dataset.previous = "equal";
})