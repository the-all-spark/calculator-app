const switchThemeBtn = document.querySelector('.switch-theme-btn');
const themeVariantsBlock = document.querySelector('.theme-variants-block');
const themeVariants = document.querySelectorAll('.theme-variant');

// * Showing / hiding theme variants block
switchThemeBtn.addEventListener('click', () => {
  themeVariantsBlock.classList.toggle('shown-block');
});

// * Adding icon to selected theme variant
function addCircleCheckIcon(variant) {
  const imgElem = document.createElement('img');
  imgElem.classList.add('check-icon');
  imgElem.src = './assets/circle-check.svg';
  imgElem.alt = 'Check icon';

  variant.append(imgElem);
}

// * Changing theme variant
for (let i = 0; i < themeVariants.length; i++) {
  if (themeVariants[i].getAttribute('selected') === 'true') {
    addCircleCheckIcon(themeVariants[i]);
  }

  themeVariants[i].addEventListener('click', (e) => changeTheme(e));
}

// Changing theme
function changeTheme(e) {
  removeSelectedAttributes();

  const theme = e.target.getAttribute('data-theme');
  const variant = document.querySelector(`[data-theme='${theme}']`);
  variant.setAttribute('selected', 'true');

  addCircleCheckIcon(variant);
  hideThemeVariantsBlock();

  //console.log(variant);
  //console.log(theme);
}

// Removing selected attribute from all theme variants
function removeSelectedAttributes() {
  themeVariants.forEach((variant) => {
    variant.removeAttribute('selected');
    variant.innerHTML = '';
  });
}

// Hiding theme variants block
function hideThemeVariantsBlock() {
  setTimeout(() => {
    themeVariantsBlock.classList.remove('shown-block');
  }, 700);
}
