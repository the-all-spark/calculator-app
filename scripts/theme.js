const switchThemeBtn = document.querySelector('.switch-theme-btn');
const switchThemeBtnBlock = document.querySelector('.switch-theme-btn-block');

const themeVariantsBlock = document.querySelector('.theme-variants-block');
const themeVariants = document.querySelectorAll('.theme-variant');

const angleIcons = document.querySelectorAll('.angle-icon');

// * Show / hide theme variants block
switchThemeBtnBlock.addEventListener('click', () => {
  themeVariantsBlock.classList.toggle('shown-block');
  showAngleIcon(angleIcons);
});

// * Change styles and show/hide angle icon on mouseenter and on mouseleave
switchThemeBtnBlock.addEventListener('mouseenter', (e) => {
  e.preventDefault();
  switchThemeBtn.style.border = '2px solid #a6ddcb';
  showAngleIcon(angleIcons);
});

switchThemeBtnBlock.addEventListener('mouseleave', (e) => {
  e.preventDefault();
  updateBorderColor();
  hideAllAngleIcons();
});

// Show / hide proper angle icon
function showAngleIcon(icons) {
  hideAllAngleIcons();
  checkAngleIconOutline();

  if (themeVariantsBlock.classList.contains('shown-block')) {
    icons[1].classList.add('shown-block');
  } else {
    icons[0].classList.add('shown-block');
  }
}

function hideAllAngleIcons() {
  angleIcons.forEach((icon) => {
    icon.classList.remove('shown-block');
  });
}

// Check and change outline of angle icons depends on selected theme variant
function checkAngleIconOutline() {
  const selectedThemeVariant = document.querySelector(`[selected='true']`);

  if (selectedThemeVariant.dataset.theme === 'blue-theme') {
    angleIcons.forEach((icon) => {
      icon.querySelector('svg path').style.stroke = '#ffffff';
    });
  } else {
    angleIcons.forEach((icon) => {
      icon.querySelector('svg path').style.stroke = '';
    });
  }
}

// Update border color of switch theme button
function updateBorderColor() {
  const selectedThemeVariant = document.querySelector(`[selected='true']`);
  const borderColorValue = getComputedStyle(selectedThemeVariant).getPropertyValue('border-top-color');
  switchThemeBtn.style.border = `2px solid ${borderColorValue}`;
}

// * Changing theme variant
for (let i = 0; i < themeVariants.length; i++) {
  if (themeVariants[i].getAttribute('selected') === 'true') {
    addCircleCheckIcon(themeVariants[i]);
  }

  themeVariants[i].addEventListener('click', function (e) {
    if (e.target.getAttribute('selected') !== 'true') {
      changeTheme(e);
    } else {
      return;
    }
  });
}

// Add icon to selected theme variant
function addCircleCheckIcon(variant) {
  const imgElem = document.createElement('img');
  imgElem.classList.add('check-icon');
  imgElem.src = './assets/circle-check.svg';
  imgElem.alt = 'Check icon';

  variant.append(imgElem);
}

// Change theme
function changeTheme(e) {
  removeSelectedAttributes();

  const theme = e.target.getAttribute('data-theme');
  const variant = document.querySelector(`[data-theme='${theme}']`);
  variant.setAttribute('selected', 'true');

  addCircleCheckIcon(variant);
  hideThemeVariantsBlock();
  updateBorderColor();
  showCurrentTheme(variant);
}

// Remove attribute 'selected' from all theme variants
function removeSelectedAttributes() {
  themeVariants.forEach((variant) => {
    variant.removeAttribute('selected');
    variant.innerHTML = '';
  });
}

// Hide theme variants block
function hideThemeVariantsBlock() {
  setTimeout(() => {
    themeVariantsBlock.classList.remove('shown-block');
  }, 700);
}

// Change switch theme button style
function showCurrentTheme(variant) {
  switchThemeBtn.setAttribute('data-theme', variant.getAttribute('data-theme'));
}
