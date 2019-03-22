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
    const firstVal = parseFloat(a);
    const secondVal = parseFloat(b);
    if(op === "+") {
        return firstVal + secondVal;
   }
    else if(op === "-") {
        return firstVal - secondVal;
    }
    else if(op === "*") {
        return firstVal * secondVal;
    }
    else if(op === "/") {
        return firstVal / secondVal;
    }
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
   
    const result = operate(firstValue, operator, secondValue);
    display.textContent = (result + "").slice(0,9);
    
    calculator.dataset.previous = "equal";
})

document.querySelector(".clear").addEventListener("click", e => {
    display.textContent = "0";
    calculator.dataset.firstVal = undefined;
    calculator.dataset.previous = "";
});

document.querySelector(".bckSpace").addEventListener("click", e => {
    const disp = display.textContent;
    if(disp.length === 1){
        display.textContent = "0";
    }
    else 
        display.textContent = disp.substring(0, disp.length-1);
});
