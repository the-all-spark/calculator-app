import '../styles/style.css';
import '../styles/theme.css';

document.addEventListener('DOMContentLoaded', function () {
  const numbers = document.querySelectorAll('.number');
  const dotBtn = document.querySelector('.dot');
  const clear = document.getElementsByClassName('clear')[0];
  const operations = document.querySelectorAll('.operation');
  const result = document.getElementById('result');

  // * Adding click handlers to keyboard buttons
  document.addEventListener('keydown', (e) => {
    if (e.key === '0') numbers[9].click();
    if (e.key === '1') numbers[6].click();
    if (e.key === '2') numbers[7].click();
    if (e.key === '3') numbers[8].click();
    if (e.key === '4') numbers[3].click();
    if (e.key === '5') numbers[4].click();
    if (e.key === '6') numbers[5].click();
    if (e.key === '7') numbers[0].click();
    if (e.key === '8') numbers[1].click();
    if (e.key === '9') numbers[2].click();

    if (e.key === '.') dotBtn.click();
    if (e.key === 'Delete') clear.click();
    if (e.key === 'Backspace') clear.click();

    if (e.shiftKey && e.code === 'Digit5') operations[0].click();
    if (e.key === '/') operations[1].click();
    if (e.key === '*') operations[2].click();
    if (e.key === '-') operations[3].click();
    if (e.key === '+') operations[4].click();

    if (e.key === '=' || e.key === 'Enter') result.click();
  });
});
