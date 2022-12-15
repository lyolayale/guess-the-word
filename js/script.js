/*
- Purpose: Guess the Word Game
- Date: 04-NOV-2022 thru 10-NOV-2022 
 */

// ========================================================================
// ==== game object - (put in object to help save global name space) - ====
// ========================================================================

const theWordGame = {
  init: function () {
    // ===================
    // ==== variables ====
    // ===================

    const guessedLettersList = document.querySelector(".guessed-letters");
    const guessBtn = document.querySelector(".guess");
    const letter = document.querySelector(".letter");
    const wordInProgress = document.querySelector(".word-in-progress");
    const remainingGuessesDiv = document.querySelector(".remaining");
    const remainingGuessNum = document.querySelector(".remaining span");
    const message = document.querySelector(".message");
    const playAgainBtn = document.querySelector(".play-again");

    let word;

    let guessedLetters = [];
    let remainingGuesses = 6;
    remainingGuessNum.innerText = remainingGuesses + " guesses";

    // ==================
    // ==== async fn ====
    // ==================

    const getWord = async function (
      url = "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
    ) {
      const res = await fetch(url);
      const data = await res.text();
      const arr = data.split("\n");

      const randomWord = arr[Math.floor(Math.random() * arr.length)];

      word = randomWord.trim();

      console.log(word); // confirm game is renedering correct word

      updateWordInProgress(word);
    };

    //====================
    // ==== functions ====
    // ===================

    // -- updateWordInProgress fn --

    const updateWordInProgress = async function (word) {
      let arr = [];

      word = word.split("");
      word.forEach(function (item) {
        arr.push("●");
      });

      arr = arr.join(" ");
      wordInProgress.innerText = arr;
    };

    // --- validateInput fn --

    const validateInput = function (input) {
      const acceptedLetter = /[a-zA-Z]/;
      const isValid = `Please enter an valid letter - Your invalid choice was: ${input.toUpperCase()}`;

      const pInner = function (msg) {
        message.innerText = msg;
      };

      if (input === "") {
        pInner(isValid);
        remainingGuessNum.innerText = `${(remainingGuesses -= 1)} guesses`;
      }
      if (input.length > 1) {
        pInner("Please enter only one letter at a time.");
        remainingGuessNum.innerText = `${(remainingGuesses -= 1)} guesses`;
      }
      if (input.match(acceptedLetter)) {
        pInner(`You entered the letter ${input.toUpperCase()}`);
      } else {
        pInner(isValid);
        remainingGuessNum.innerText = `${(remainingGuesses -= 1)} guesses`;
      }
      console.log(input.length);
      return input;
    };

    // -- makeGuess fn ---

    const makeGuess = function (letter) {
      letter = letter.toUpperCase();
      if (letter.match(/[a-zA-Z]/)) {
        if (!guessedLetters.includes(letter)) {
          guessedLetters.push(letter);
          updateGuessLettersList();
          remainingGuessesCount(letter);
          updateWord(guessedLetters);
        } else {
          message.innerText = `You already guessed the letter ${letter}.
    Please try again.`;
          remainingGuessNum.innerText = `${(remainingGuesses -= 1)} guesses`;
        }
      }

      if (remainingGuesses <= 0) {
        message.innerHTML = "<p>Better Luck Next Time!</p>";
        remainingGuesses = 0;
      }

      if (remainingGuesses === 0) {
        startOver();
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

    // -- remainingGuessesCount fn --

    const remainingGuessesCount = function (guess) {
      let theWord = word.toUpperCase();

      if (!theWord.includes(guess)) {
        remainingGuessNum.innerText = `${(remainingGuesses -= 1)} guesses`;
        message.innerText = `Wrong Guess! The word has no ${guess}.`;
      } else {
        message.innerText = `Good guess! The word has the letter ${guess}.`;
      }
    };

    // -- winner fn ---

    const winner = function () {
      if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML =
          "<p class='hightlight'>You guessed correct the word! Congrats!</p>";
        startOver();
      }
    };

    // =========================
    // ==== event listeners ====
    // =========================

    // -- guessBtn addEvent Listener --

    guessBtn.addEventListener("click", function (e) {
      e.preventDefault();
      let letterValue = letter.value;
      // console.log(letterValue);

      setTimeout(function () {
        letter.value = "";
      }, 1000);

      message.innerText = "";
      const validate = validateInput(letterValue);
      makeGuess(validate);
    });

    // -- document relaod eventListener --

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        window.location.reload();
      }
    });

    // -- playAgainBtn addEvent listener --

    playAgainBtn.addEventListener("click", function () {
      message.classList.remove("win");
      message.innerHTML = "";
      guessedLettersList.innerHTML = "";

      guessedLetters = [];
      remainingGuesses = 6;
      remainingGuessNum.innerText = remainingGuesses + " guesses";

      guessBtn.classList.remove("hide");
      remainingGuessesDiv.classList.remove("hide");
      guessedLettersList.classList.remove("hide");

      playAgainBtn.classList.add("hide");
    });

    // ==== init game --> aysnc fn ====
    getWord();

    // -- startOver fn --

    const startOver = function () {
      guessBtn.classList.add("hide");
      remainingGuessesDiv.classList.add("hide");
      guessedLettersList.classList.add("hide");

      playAgainBtn.classList.remove("hide");
      getWord();
    };
  },
};

// =============================
// ==== init game in object ====
// =============================

theWordGame.init();
