const input = document.getElementById('input'); // input button
const numbers = document.querySelectorAll('.number'); // number buttons
const dotBtn = document.querySelector('.dot'); // dot button
const changeSignBtn = document.querySelector('.change-sign'); // change sign button
const result = document.getElementById('result'); // equal button
const clear = document.getElementsByClassName('clear')[0]; // clear button
let isResultDisplayed = false; // flag to check is output displayed

const operations = document.querySelectorAll('.operation'); // operation buttons
const operationsArr = ['+', '-', '×', '÷', '%'];

console.log(dotBtn);

// * Adding click handlers to number buttons

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', function (e) {
    const currentString = input.innerHTML;
    const lastChar = currentString[currentString.length - 1];

    // result is not displayed -> add the new input to the input string
    if (!isResultDisplayed) {
      input.innerHTML += e.target.innerHTML;
    } else if (isResultDisplayed && operationsArr.includes(lastChar)) {
      // result is displayed and user pressed an operation -> keep on adding to the string for next operation
      isResultDisplayed = false;
      input.innerHTML += e.target.innerHTML;
    } else {
      // result is  displayed and user pressed a number -> clear the input string and add the new input to start the new operation
      isResultDisplayed = false;
      input.innerHTML = '';
      input.innerHTML += e.target.innerHTML;
    }
  });
}

// * Adding click handlers to operation buttons

for (let i = 0; i < operations.length; i++) {
  operations[i].addEventListener('click', function (e) {
    const currentString = input.innerHTML;
    const lastChar = currentString[currentString.length - 1];
    const clickedOperator = e.target.textContent;

    if (operationsArr.includes(lastChar)) {
      //console.log('Replacing operator');
      const newString = currentString.substring(0, currentString.length - 1) + clickedOperator;
      input.innerHTML = newString;
    } else if (currentString.length === 0) {
      console.log('Enter a number first'); //TODO: add error message?
    } else {
      //console.log('Adding operator');
      input.innerHTML += clickedOperator;
    }
  });
}

// * Clearing the input (AC button)

clear.addEventListener('click', function () {
  input.innerHTML = ''; //! '' or '0'
});

// * Changing sign (change sign button)

changeSignBtn.addEventListener('click', function () {
  input.innerHTML = input.innerHTML * -1;
});

// * Displaying the result (equal button)

/* function to calculate the result of the operation
  @param numberArr - array of numbers
  @param index - index of the first operand
  @param operator - operator
  @returns result of the operation 
*/
function calculateNumber(numberArr, index, operator) {
  switch (operator) {
    case '×':
      return numberArr[index] * numberArr[index + 1];
    case '÷':
      return numberArr[index] / numberArr[index + 1];
    case '%':
      return (numberArr[index] * numberArr[index + 1]) / 100;
    case '+':
      return parseFloat(numberArr[index]) + parseFloat(numberArr[index + 1]);
    case '-':
      return numberArr[index] - numberArr[index + 1];
    default:
      return 0;
  }
}

/* function to check number:
  @param number - number to check / precise
  @returns number or precise number
*/
function checkNumberToPrecise(number) {
  const needToPrecise = number.toString().includes('.') && number.toString().length > 10;

  if (needToPrecise) {
    return preciseCalculation(number);
  } else {
    return number;
  }
}

/*function to calculate the precise result
  @param number - number to calculate
  @param decimals - number of decimals
  @returns precise number
*/
function preciseCalculation(number, decimals = 10) {
  return parseFloat(number.toFixed(decimals));
}

result.addEventListener('click', function () {
  const inputString = input.innerHTML;

  const numbers = inputString.split(/\+|-|×|÷|%/g); // array of numbers
  const operators = inputString.replace(/[0-9]|\./g, '').split(''); // array of operations

  // if the first number is a negative number
  if (inputString.indexOf('-') === 0) {
    numbers[0] = '0';
  }

  console.log(inputString);
  console.log(operators);
  console.log(numbers);
  console.log('----------------------------');

  let divideIndex = operators.indexOf('÷');
  while (divideIndex != -1) {
    let resultNumber = calculateNumber(numbers, divideIndex, '÷');
    resultNumber = checkNumberToPrecise(resultNumber);

    numbers.splice(divideIndex, 2, resultNumber);
    operators.splice(divideIndex, 1);
    divideIndex = operators.indexOf('÷');
  }

  let multiplyIndex = operators.indexOf('×');
  while (multiplyIndex != -1) {
    let resultNumber = calculateNumber(numbers, multiplyIndex, '×');
    resultNumber = checkNumberToPrecise(resultNumber);

    numbers.splice(multiplyIndex, 2, resultNumber);
    operators.splice(multiplyIndex, 1);
    multiplyIndex = operators.indexOf('×');
  }

  let percentIndex = operators.indexOf('%');
  while (percentIndex != -1) {
    let resultNumber = calculateNumber(numbers, percentIndex, '%');
    resultNumber = checkNumberToPrecise(resultNumber);

    numbers.splice(percentIndex, 2, resultNumber);
    operators.splice(percentIndex, 1);
    percentIndex = operators.indexOf('%');
  }

  let subtractIndex = operators.indexOf('-');
  while (subtractIndex != -1) {
    let resultNumber = calculateNumber(numbers, subtractIndex, '-');
    resultNumber = checkNumberToPrecise(resultNumber);

    numbers.splice(subtractIndex, 2, resultNumber);
    operators.splice(subtractIndex, 1);
    subtractIndex = operators.indexOf('-');
  }

  let addIndex = operators.indexOf('+');
  while (addIndex != -1) {
    let resultNumber = calculateNumber(numbers, addIndex, '+');
    resultNumber = checkNumberToPrecise(resultNumber);

    numbers.splice(addIndex, 2, resultNumber);
    operators.splice(addIndex, 1);
    addIndex = operators.indexOf('+');
  }

  input.innerHTML = numbers[0];
  isResultDisplayed = true;
});

// * Adding click handlers to dot button

dotBtn.addEventListener('click', function () {
  const inputString = input.innerHTML;

  const numberArr = inputString.split(/\+|-|×|÷|%/g);
  const prevChar = numberArr[numberArr.length - 1];

  if (inputString.length !== 0 && !prevChar.includes('.')) {
    input.innerHTML += '.';
  }
});
