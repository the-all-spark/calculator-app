const input = document.getElementById('input'); // input button
const numbers = document.querySelectorAll('.number'); // number buttons
const dotBtn = document.querySelector('.dot'); // dot button
const changeSignBtn = document.querySelector('.change-sign'); // change sign button
const result = document.getElementById('result'); // equal button
const clear = document.getElementsByClassName('clear')[0]; // clear button
let isResultDisplayed = false; // flag to check is output displayed

const operations = document.querySelectorAll('.operation'); // operation buttons
const operationsArr = ['+', '−', '×', '÷', '%'];

//!
console.log(input);
console.log(numbers);
console.log(dotBtn);
console.log(operations);
console.log(changeSignBtn);
console.log(result);
console.log(clear);
console.log(isResultDisplayed);

// * Adding click handlers to number buttons

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', function (e) {
    const currentString = input.innerHTML;
    const lastChar = currentString[currentString.length - 1];

    // result is not displayed -> add the new input to the input string
    if (!isResultDisplayed) {
      input.innerHTML += e.target.innerHTML;
    } else if (
      isResultDisplayed &&
      operationsArr.includes(lastChar)
      //! (lastChar === '+' || lastChar === '−' || lastChar === '×' || lastChar === '÷' || lastChar === '%')
    ) {
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

// * Clearing the input on press of AC button

clear.addEventListener('click', function () {
  input.innerHTML = '';
});
