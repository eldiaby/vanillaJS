'use strict';

// Variables

const landingSection = document.querySelector('.section-landing');

const sittingsIcon = document.querySelector('.sittings-icon');
const colorsList = document.querySelector('.colors-list');
const randomBtnsContainer = document.querySelector('.random-btns');
// const landingSectionBackgroundImages = ['01.jgp', '02.jpg', '03.jpg', '04.jpg', '05.jpg'];
let randomeBackgroundInterval;

// ================================================================================
// Functions

// Genetate randome number
const randomNumber = (number) => Math.floor(Math.random() * number);

// Change the landing page background
const changeLandingPageBackground = function (randomeBackground = true) {
  if (randomeBackground) {
    randomeBackgroundInterval = setInterval(() => {
      landingSection.style.backgroundImage = `url('../imgs/landing/0${randomNumber(
        6
      )}.jpg')`;
    }, 1000);
  } else clearInterval(randomeBackgroundInterval);
};

// Change the main page color functionality
const changeMainColor = function (e) {
  // Get the color element
  const target = e.target.closest('li');
  // if there is no element return (if the fired element not one of colors)
  if (!target) return;
  // Remove the class active from all
  colorsList
    .querySelectorAll('li')
    .forEach((li) => li.classList.remove('active'));
  // Add the class active for the active element
  target.classList.add('active');
  // Set the main page color
  document.documentElement.style.setProperty(
    '--main-color',
    target.dataset.color
  );
  // Set the main color to local storage
  localStorage.setItem('main-color', target.dataset.color);
};

// Check if there is main color in the local storage
const checkMainColorLocalStorge = function () {
  // Check if there is a color on the local storage
  const mainColor =
    localStorage.getItem('main-color') ||
    document.querySelector('.color').dataset.color;
  // Make the main color as the local storage
  document.documentElement.style.setProperty('--main-color', mainColor);

  // make an active class on the main element
  document.querySelectorAll('.color').forEach((el) => {
    if (el.dataset.color === mainColor) el.classList.add('active');
    else el.classList.remove('active');
  });
};

const initApp = function () {
  changeLandingPageBackground();
  checkMainColorLocalStorge();
};

initApp();

// ================================================================================
// Event listeners

// Sittings section animation funcionality
sittingsIcon.addEventListener('click', function (e) {
  this.querySelector('i').classList.toggle('fa-spin');
  document.querySelector('.section-sittings').classList.toggle('show');
});

// Change the main page color functionality
colorsList.addEventListener('click', changeMainColor);

// Run or stop random background
randomBtnsContainer.addEventListener('click', function (e) {
  const target = e.target;
  if (!target.classList.contains('random-btn')) return;

  randomBtnsContainer
    .querySelectorAll('.random-btn')
    .forEach((btn) => btn.classList.remove('active'));
  target.classList.add('active');
  if (target.dataset.random === 'true') {
    changeLandingPageBackground(true);
  } else changeLandingPageBackground(false);
});
