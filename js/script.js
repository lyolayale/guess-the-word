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

// ==== event listener ====

guessBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let letterValue = letter.value;
  console.log(letterValue);

  setTimeout(function () {
    letter.value = "";
  }, 1000);
});

updateWordInProgress(word);
