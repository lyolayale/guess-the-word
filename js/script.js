/*
- Purpose: Guess the Word Game
- Date: 04-NOV-2022
 */

// ==== variables ====
const guessedLettersList = document.querySelector(".guessed-letters");
const guessBtn = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesDiv = document.querySelector(".remaining");
const remainingGuessNum = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainBtn = document.querySelector(".play-again");

const word = "car";
// wordInProgress.innerText = word;

const guessedLetters = [];
let count = word.length * 2;
remainingGuessNum.innerText = count + " guesses";

// ==== functions ====

// -- updateWordInProgress fn ---

const updateWordInProgress = function (word) {
  let arr = [];

  word = word.split("");
  word.forEach(function (item) {
    arr.push("●");
  });

  arr = arr.join(" ");
  wordInProgress.innerText = arr;

  // word = word.join("");
  // console.log(word);
};

// --- validateInput fn

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
    pInner(`You entered the letter ${input.toUpperCase()}`);
    console.log(`You entered a ⌨️ ${input} 🖱️`);
  } else {
    pInner(isValid);
    console.log(isValid);
  }

  return input;
};

// -- makeGuess fn ---

const makeGuess = function (letter) {
  letter = letter.toUpperCase();
  if (letter.match(/[a-zA-Z]/)) {
    if (!guessedLetters.includes(letter)) {
      guessedLetters.push(letter);
      updateGuessLettersList();
      updateWord(guessedLetters);
    } else {
      message.innerText = `You already guessed the letter ${letter}.
    Please try again.`;
    }
  }
};

// -- updateGuessLettersList fn --

const updateGuessLettersList = function () {
  guessedLettersList.innerHTML = "";

  for (let item of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = item;
    guessedLettersList.append(li);
  }
};

// -- updateWord fn ---

const updateWord = function (arr) {
  const wordUpper = word.toUpperCase();
  const wordArr = wordUpper.split("");
  let newArr = [];

  for (let item of wordArr) {
    if (arr.includes(item)) {
      newArr.push(item);
    } else {
      newArr.push("●");
    }

    wordInProgress.innerText = newArr.join("");
  }

  winner();
};

// -- winner fn ---

const winner = function () {
  if (wordInProgress.innerText === word.toUpperCase()) {
    message.classList.add("win");
    message.innerHTML =
      "<p class='hightlight'>You guessed correct the word! Congrats!</p>";
  }
  console.log(wordInProgress.innerText, word);
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
  const validate = validateInput(letterValue);
  makeGuess(validate);
  console.log(guessedLetters);

  // -- dynamic guesses remaining --

  remainingGuessNum.innerText = `${(count -= 1)} guesses`;
  if (count === 0) {
    remainingGuessesDiv.innerText = "Game Over";
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Enter") {
    window.location.reload();
  }
});

updateWordInProgress(word);
