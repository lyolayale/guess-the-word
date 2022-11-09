/*
- Purpose: Guess the Word Game
- Date: 04-NOV-2022
 */

// ==== variables ====
const guessedLetters = document.querySelector(".guessed-letters");
const guessBtn = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesDiv = document.querySelector(".remaining");
const remainingGuessNum = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainBtn = document.querySelector(".play-again");

const word = "magnolia";
wordInProgress.innerText = word;

// ==== functions ====
const updateWordInProgress = function (word) {
  const arr = [];

  word = word.split("");
  word.forEach(function (item) {
    arr.push((item = "●"));
  });

  wordInProgress.innerText = arr.join(" ");

  word = word.join("");
  console.log(word);
};

const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  const isValid = "Please enter a valid letter";
  const pInner = function (msg) {
    message.innerText = msg;
  };

  if (input === "") {
    pInner(isValid);
    console.log(isValid);
  } else if (input.length > 1) {
    pInner("Please enter only one letter at a time.");
    console.log("Please enter only one letter at a time.");
  } else if (input.match(acceptedLetter)) {
    pInner(`You entered a ⌨️ ${input} 🖱️`);
    console.log(`You entered a ⌨️ ${input} 🖱️`);
  } else {
    pInner(isValid);
    console.log(isValid);
  }

  return input;
};
// ==== event listener ====

guessBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let letterValue = letter.value;
  console.log(letterValue);

  setTimeout(function () {
    letter.value = "";
  }, 1000);

  message.innerText = "";
  validateInput(letterValue);
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Enter") {
    window.location.reload();
  }
});

updateWordInProgress(word);
