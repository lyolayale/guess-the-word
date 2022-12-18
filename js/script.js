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

    // ==== init game --> aysnc fn ====
    getWord();

    //====================
    // ==== functions ====
    // ===================

    // -- updateWordInProgress fn --

    const updateWordInProgress = async function (word) {
      const arr = [];

      for (let el of word) {
        arr.push("●");
      }

      wordInProgress.innerText = arr.join("");
    };

    // =========================
    // ==== event listener ====
    // =========================

    // -- guessBtn addEvent Listener --

    guessBtn.addEventListener("click", function (e) {
      e.preventDefault();
      message.innerText = "";
      const letterValue = letter.value;
      // console.log(letterValue);

      const validate = validateInput(letterValue);
      if (validate) {
        makeGuess(letterValue);
      }

      letter.value = "";
    });

    // --- validateInput fn --

    const validateInput = function (input) {
      const acceptedLetter = /[a-zA-Z]/;

      if (input.length === 0) {
        message.innerText =
          "Please enter an valid letter - Your invalid choice was: An Empty Input ...";
      } else if (input.length > 1) {
        message.innerText = "Please enter only one letter at a time.";
      } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a valid letter: A - Z.";
      } else {
        return input;
      }
    };

    // -- makeGuess fn ---

    const makeGuess = function (letter) {
      letter = letter.toUpperCase();

      if (guessedLetters.includes(letter)) {
        message.innerText =
          "You already guessed that letter, please try again!";
      } else {
        guessedLetters.push(letter);
        remainingGuessesCount(letter);
        updateGuessLettersList();
        updateWord(guessedLetters);
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
          newArr.push(item.toUpperCase());
        } else {
          newArr.push("●");
        }
      }
      wordInProgress.innerText = newArr.join("");
      winner();
    };

    // -- remainingGuessesCount fn --

    const remainingGuessesCount = function (guess) {
      let theWord = word.toUpperCase();

      if (!theWord.includes(guess)) {
        remainingGuesses -= 1;
        message.innerText = `Wrong Guess! The word has no ${guess}.`;
      } else {
        message.innerText = `Good guess! The word has the letter ${guess}.`;
      }

      if (remainingGuesses === 0) {
        remainingGuesses -= 1;
        message.innerHTML = `Better Luck Next Time! The word was <h2 class="hightlight">${word}</h2>`;
        startOver();
      } else if (remainingGuesses === 1) {
        remainingGuessNum.innerText = `${remainingGuesses} guess`;
      } else {
        remainingGuessNum.innerText = `${remainingGuesses} guesses`;
      }
    };

    // -- winner fn ---

    const winner = function () {
      if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML =
          "<p class='hightlight'>You guessed correct the word! Congrats!</p>";
        startOver();
        confetti.start();
      }
    };

    // -- document relaod eventListener --

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        window.location.reload();
      }
    });

    // -- startOver fn --

    const startOver = function () {
      guessBtn.classList.add("hide");
      remainingGuessesDiv.classList.add("hide");
      guessedLettersList.classList.add("hide");
      playAgainBtn.classList.remove("hide");
      remainingGuesses = 6;
    };

    // -- playAgainBtn addEvent listener --

    playAgainBtn.addEventListener("click", function () {
      message.classList.remove("win");
      guessedLetters = [];
      remainingGuesses = 6;
      remainingGuessNum.innerText = `${remainingGuesses} guesses`;
      guessedLettersList.innerHTML = "";
      message.innerText = "";

      // -- new word --
      getWord();

      guessBtn.classList.remove("hide");
      remainingGuessesDiv.classList.remove("hide");
      guessedLettersList.classList.remove("hide");
      playAgainBtn.classList.add("hide");

      confetti.stop();

      // wordInProgress.classList.remove("hide");
    });
  },
};

// =============================
// ==== init game in object ====
// =============================

theWordGame.init();
