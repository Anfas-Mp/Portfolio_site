// preloader functionality
window.addEventListener("load", function () {
  setTimeout(function () {
    var preloader = document.getElementById("preloader");
    var body = document.getElementById("body");
    var mainContent = document.getElementById("main-content");

    preloader.style.display = "none";
    body.classList.remove("preloader-active");
    mainContent.classList.remove("hidden");
  }, 2000); // Delay set to 2000 ms = 2 seconds
});
//preloader end


// hacked text animation

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomLetter() {
  var alphabet = "abcdefghijklmnopqrstuvwxyz";
  return alphabet[rand(0, alphabet.length - 1)];
}

function getRandomWord(word) {
  var text = word.innerHTML;
  var finalWord = "";

  for (var i = 0; i < text.length; i++) {
    finalWord += text[i] == " " ? " " : getRandomLetter();
  }

  return finalWord;
}

var word = document.querySelector("h4.role");
var interv = "undefined";
var canChange = false;
var globalCount = 0;
var count = 0;
var INITIAL_WORD = word.innerHTML;
var isGoing = false;

function init() {
  if (isGoing) return;

  isGoing = true;
  var randomWord = getRandomWord(word);
  word.innerHTML = randomWord;

  interv = setInterval(function () {
    var finalWord = "";
    for (var x = 0; x < INITIAL_WORD.length; x++) {
      if (x <= count && canChange) {
        finalWord += INITIAL_WORD[x];
      } else {
        finalWord += getRandomLetter();
      }
    }
    word.innerHTML = finalWord;
    if (canChange) {
      count++;
    }
    if (globalCount >= 20) {
      canChange = true;
    }
    if (count >= INITIAL_WORD.length) {
      clearInterval(interv);
      count = 0;
      canChange = false;
      globalCount = 0;
      isGoing = false;
    }
    globalCount++;
  }, 50);
}

setInterval(init, 4000);
//hacktext animation end


//  mode switch function

document.getElementById("switch").addEventListener("change", function () {
  document.getElementById("body").classList.toggle("night-mode");
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

//mode switch end

// cursor js

const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000"
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function(e){
  coords.x = e.clientX;
  coords.y = e.clientY;
  
});

function animateCircles() {
  
  let x = coords.x;
  let y = coords.y;
  
  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";
    
    circle.style.scale = (circles.length - index) / circles.length;
    
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });
 
  requestAnimationFrame(animateCircles);
}

animateCircles();

// cursor js end