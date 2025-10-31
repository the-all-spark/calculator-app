import '../styles/style.css';
import '../styles/theme.css';
import './theme.js';
import favicon from '../assets/favicon.svg';

document.addEventListener('DOMContentLoaded', function () {
  // * Add favicon
  (function () {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = favicon;
    document.head.append(link);
  })();

  const input = document.getElementById('input');

  const numbers = document.querySelectorAll('.number');
  const dotBtn = document.querySelector('.dot');
  const changeSignBtn = document.querySelector('.change-sign');

  const result = document.getElementById('result');
  let isResultDisplayed = false;
  const currentOperation = document.querySelector('.current-operation');

  const clear = document.getElementsByClassName('clear')[0];

  const operations = document.querySelectorAll('.operation');
  const operationsArr = ['+', '-', '×', '÷', '%'];

  // function to change font size of input string
  function changeInputFontSize() {
    if (input.innerHTML.length >= 11 && input.innerHTML.length < 14) {
      input.style.fontSize = '2.5rem';
      input.style.lineHeight = '1.5';
    } else {
      input.style.fontSize = '2rem';
      input.style.lineHeight = '1.8';
    }
  }

  // * Adding click handlers to number buttons

  for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', (e) => handleNumberButtonClick(e));
  }

  function handleNumberButtonClick(e) {
    // handle initial input
    if (input.innerHTML === '0') {
      input.innerHTML = '';
    }

    const currentString = input.innerHTML;
    const lastChar = currentString[currentString.length - 1];

    if (!isResultDisplayed) {
      input.innerHTML += e.target.innerHTML;
    } else if (operationsArr.includes(lastChar)) {
      input.innerHTML += e.target.innerHTML;
      isResultDisplayed = false;
    } else {
      input.innerHTML = '';
      input.innerHTML += e.target.innerHTML;
      isResultDisplayed = false;
    }

    if (input.innerHTML.length >= 11) {
      changeInputFontSize();
    }
  }

  // * Adding click handlers to operation buttons

  for (let i = 0; i < operations.length; i++) {
    operations[i].addEventListener('click', (e) => handleOperationButtonClick(e));
  }

  function handleOperationButtonClick(e) {
    const currentString = input.innerHTML;
    const lastChar = currentString[currentString.length - 1];
    const clickedOperator = e.target.textContent;

    if (operationsArr.includes(lastChar)) {
      const newString = currentString.substring(0, currentString.length - 1) + clickedOperator;
      input.innerHTML = newString;
    } else {
      input.innerHTML += clickedOperator;
    }
  }

  // * Clearing the input (AC button)

  clear.addEventListener('click', function () {
    input.style.fontSize = '';
    input.style.lineHeight = '';
    input.innerHTML = '0';
    currentOperation.innerHTML = 'Current operation:';
  });

  // * Changing sign (change sign button)

  changeSignBtn.addEventListener('click', function () {
    input.innerHTML = input.innerHTML * -1;
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

    const numbers = inputString.split(/\+|-|×|÷|%/g);
    const operators = inputString.replace(/[0-9]|\./g, '').split('');

    // if the first number is a negative number
    if (inputString.indexOf('-') === 0) {
      numbers[0] = '0';
    }

    // show current operation
    currentOperation.innerHTML = `${inputString}=`;

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

    if (input.innerHTML.length >= 11) {
      changeInputFontSize();
    } else {
      input.style.fontSize = '';
      input.style.lineHeight = '';
    }

    isResultDisplayed = true;
  });
});
