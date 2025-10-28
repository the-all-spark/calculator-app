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

result.addEventListener('click', function () {
  const inputString = input.innerHTML;

  const numbers = inputString.split(/\+|-|×|÷|%/g); // array of numbers
  const operators = inputString.replace(/[0-9]|\./g, '').split(''); // array of operations

  if (operators.indexOf('-') == 0) {
    numbers[0] = '0';
  }

  console.log(inputString);
  console.log(operators);
  console.log(numbers);
  console.log('----------------------------');

  let divideIndex = operators.indexOf('÷');
  while (divideIndex != -1) {
    numbers.splice(divideIndex, 2, calculateNumber(numbers, divideIndex, '÷'));
    operators.splice(divideIndex, 1);
    divideIndex = operators.indexOf('÷');
  }

  let multiplyIndex = operators.indexOf('×');
  while (multiplyIndex != -1) {
    numbers.splice(multiplyIndex, 2, calculateNumber(numbers, multiplyIndex, '×'));
    operators.splice(multiplyIndex, 1);
    multiplyIndex = operators.indexOf('×');
  }

  let percentIndex = operators.indexOf('%');
  while (percentIndex != -1) {
    numbers.splice(percentIndex, 2, calculateNumber(numbers, percentIndex, '%'));
    operators.splice(percentIndex, 1);
    percentIndex = operators.indexOf('%');
  }

  let subtractIndex = operators.indexOf('-');
  while (subtractIndex != -1) {
    numbers.splice(subtractIndex, 2, calculateNumber(numbers, subtractIndex, '-'));
    operators.splice(subtractIndex, 1);
    subtractIndex = operators.indexOf('-');
  }

  let addIndex = operators.indexOf('+');
  while (addIndex != -1) {
    numbers.splice(addIndex, 2, calculateNumber(numbers, addIndex, '+'));
    operators.splice(addIndex, 1);
    addIndex = operators.indexOf('+');
  }

  input.innerHTML = numbers[0];
  isResultDisplayed = true;
});
