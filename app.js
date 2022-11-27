let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let resetMain = false;


//selectors
const numbers = document.querySelectorAll('[data-number]');
const operators = document.querySelectorAll('[data-operator]');
const equal = document.getElementById('equals');
const clears = document.getElementById('clear');
const deletes = document.getElementById('delete');
const point = document.getElementById('point');
const mainScreen = document.getElementById('main');
const secondaryScreen = document.getElementById('secondary');

numbers.forEach((button) => button.addEventListener('click', () => appendNumber(button.textContent)))
operators.forEach((button) => button.addEventListener('click', () => setOperator(button.textContent)))
equal.addEventListener('click', evaluate);
clears.addEventListener('click', clear);
deletes.addEventListener('click', deleteNumber);
point.addEventListener('click', appendPoint);

//functions
const add = (a,b) => a+b;
const subtract = (a,b) => a-b;
const mutiply = (a,b) => a*b;
const divide = (a,b) => a/b;


function resetMainScreen (){
    mainScreen.textContent = '';
    resetMain = false;
}

function appendNumber(num){
    if(mainScreen.textContent === '0' || resetMain){
        resetMainScreen();
    }
    mainScreen.textContent += num;
}

function setOperator(opr){
    if(currentOperator !== null) evaluate()
    firstNumber = mainScreen.textContent;
    currentOperator = opr;
    secondaryScreen.textContent = `${firstNumber} ${currentOperator}`;
    resetMain = true;
}

function clear(){
    mainScreen.textContent = '0';
    secondaryScreen.textContent = '';
    firstNumber = '';
    secondNumber = '';
    currentOperator = null;
}

function deleteNumber(){
    mainScreen.textContent = mainScreen.textContent
    .toString()
    .slice(0, -1);
}

function evaluate(){
    if(currentOperator === null || resetMain) return
    if(currentOperator === '/' && mainScreen.textContent === '0'){
        alert("You can't divide by 0!")
        return 
    }
    secondNumber = mainScreen.textContent;
    mainScreen.textContent = roundResult(calculate(currentOperator, firstNumber, secondNumber));
    secondaryScreen.textContent = `${firstNumber} ${currentOperator} ${secondNumber}`
    currentOperator = null;
}

function roundResult(num){
    return Math.round(num*1000)/1000;
}

function appendPoint(){
    if(resetMain) resetMainScreen();
    if(mainScreen.textContent === ''){
        mainScreen.textContent='0';
    }
    if(mainScreen.textContent.includes('.'))return 
    mainScreen.textContent += '.'
}

function calculate(operator, a, b){
    a = Number(a)
    b = Number(b)
    switch(operator){
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case 'x':
            return mutiply(a,b);
        case "/":
            return divide(a,b);
    }
}