const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Game states
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const resetScores = () => {
  // //  Score and current score
  // score0El.textContent = 0;
  // score1El.textContent = 0;
  // current0El.textContent = 0;
  // current1El.textContent = 0;
  [score0El, score1El, current0El, current1El].textContent = 0;
};

const resetUI = () => {
  // player0El.classList.remove("player--winner");
  // player1El.classList.remove("player--winner");
  // player0El.classList.add("player--active");
  // player1El.classList.remove("player--active");

  diceEl.classList.add("hidden");
  [player0El, player1El].forEach((player) => {
    player.classList.remove("player--winner");
    player.classList.remove("player--active");
  });
  player0El.classList.add("player--active");
};

const resetBtns = () => {
  btnRoll.disabled = false;
  btnHold.disabled = false;
};

const play = function () {
  resetScores();
  resetUI();
  resetBtns();
};

// Switch players
const playerToggle = () => {
  [player0El, player1El].forEach((playerEl) => {
    playerEl.classList.toggle("player--active");
  });
};

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerToggle();
};

//Roll dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    //   display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `/img/dice--${dice}.png`;

    //   Add rolling animation
    diceEl.classList.add("rolling");
    setTimeout(() => {
      diceEl.classList.remove("rolling");
    }, 500);

    //   Check for rolled 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Hold functionality
btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      btnRoll.disabled = true;
      btnHold.disabled = true;
    } else {
      switchPlayer();
    }
  }
});

//  New game functionality
btnNew.addEventListener("click", play);

let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

g();
f();
