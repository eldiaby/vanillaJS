'use strict';

// Variables

const landingSection = document.querySelector('.section-landing');

const sittingsIcon = document.querySelector('.sittings-icon');
const colorsList = document.querySelector('.colors-list');
const randomBtnsContainer = document.querySelector('.random-btns');

const skillsSection = document.querySelector('.section-skills');
const gallerySection = document.querySelector('.section-gallery');

const bulletsContainer = document.querySelector('.nav-bullets');
const navContainer = document.querySelector('.header-nav-menu');
const resetSittingsBtn = document.querySelector('.reset-sittings');
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
    }, 10000);
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

// Function to animate progress bars
function animateProgressBars() {
    // Select all skill progress elements
    document.querySelectorAll('.skill-progress').forEach(function(progressBar) {
        const progress = progressBar.getAttribute('data-progress');
        // Animate the width of the span inside each progress bar
        const span = progressBar.querySelector('span');
        span.style.width = progress + '%';
    });
}

// Create an IntersectionObserver to trigger when the section enters the viewport
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // When the section is visible, animate the progress bars
            animateProgressBars();
            // Stop observing after the animation starts
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5 // Trigger when 50% of the section is visible
});


// Function to update active bullet state
function updateActiveBullet(activeBullet) {
  // Remove 'active' class from all bullets
  bulletsContainer.querySelectorAll('.nav-bullet-item').forEach(bullet => {
    bullet.classList.remove('active');
  });

  // Add 'active' class to the clicked bullet
  activeBullet.classList.add('active');
}

// Optionally, update the active bullet based on scroll position
window.addEventListener('scroll', () => {
  // Check which section is currently in the viewport
  document.querySelectorAll('.nav-bullet-item').forEach(bullet => {
    const section = document.querySelector(bullet.getAttribute('data-section'));
    if (isSectionInView(section)) {
      updateActiveBullet(bullet);  // Update active class when the section is in view
    }
  });
});

// Helper function to check if a section is in the viewport
function isSectionInView(section) {
  const rect = section.getBoundingClientRect();
  return rect.top <= window.innerHeight / 2 && rect.bottom >= 0;
}

const scrollToTop = function (e) {
  e.preventDefault();
  const target = e.target.closest('.header-nav-item') || e.target.closest('.nav-bullet-item');
  if (!target) return;
  const targetSection = document.querySelector(target.dataset.section);
  targetSection.scrollIntoView({
    behavior: 'smooth'
  });
  updateActiveBullet(target);
}

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

document.querySelector('.random-color').addEventListener('click', function () {
  const randomColor = `
  rgba( ${randomNumber(255)}, ${randomNumber(255)}, ${randomNumber(255)})`;
  // Set the random color
  document.documentElement.style.setProperty('--main-color', randomColor);
  document
    .querySelectorAll('.color')
    .forEach((ele) => ele.classList.remove('active'));
  localStorage.setItem('main-color', randomColor);
  // console.log(randomColor);
});

// Adding the modal functionality
gallerySection.addEventListener('click', function (e) {
  const target = e.target.closest('img');

  if (!target) return;

  gallerySection.insertAdjacentHTML(
    'afterbegin',
    `
          <div class="gallery-popup-overlay">
          <div class="popup-box">
  ${target.alt !== null ? `<h3 class="modal-heading">${target.alt}</h3>` : ''}
  <button class="modal-close-btn">X</button>
              <img src="${
                target.src
              }" alt="Gallery image" title="Gallery image">
              </div>
        </div>
  `
  );

  document.querySelector('.gallery-popup-overlay').classList.add('show');

  document.querySelector('.modal-close-btn').addEventListener('click', () => {
    document.querySelector('.gallery-popup-overlay').remove();
  });
});

bulletsContainer.addEventListener('click', function (e) {
scrollToTop(e)
});

// Nav menu scroll functionality
navContainer.addEventListener('click', function (e) {
scrollToTop(e)
});

// Reset settings functionality
resetSittingsBtn.addEventListener('click', function () {
  localStorage.clear();
  location.reload();
});

// ==============================================================================
// Observe the section-skills
observer.observe(skillsSection);


// Nav menu close functionality
document.querySelector('.header-nav-close').addEventListener('click', function () {
  navContainer.classList.remove('active');
});

document.querySelector('.header-toggle-menu').addEventListener('click', function () {
  navContainer.classList.toggle('active');
});
