'use strict'

// Variables

const landingSection = document.querySelector('.section-landing');




// const landingSectionBackgroundImages = ['01.jgp', '02.jpg', '03.jpg', '04.jpg', '05.jpg'];

// Functions

// Genetate randome number
const randomNumber = number => Math.floor(Math.random() * number); 

// Change the landing page background
const changeLandingPageBackground = function () {
  setInterval(() => {
    console.log('done')
    landingSection.style.backgroundImage = `url(../imgs/landing/0${randomNumber(5)}.jpg)`; 
  }, 10000);
  
}



const initApp = function () {
  changeLandingPageBackground()
}

initApp();

// Event listeners