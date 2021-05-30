'use strict';
//selecting elements
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let current0 = document.querySelector('#current--0');
let current1 = document.querySelector('#current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
let scores, currentScore, playerScore, playing, active;
const newGame = function () {
  scores = [0, 0];
  active = 0;
  currentScore = 0;
  playing = true;
  current0.textContent = 0;
  current1.textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  dice.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');

  document.querySelector(`.player--${active}`).classList.add('player--active');
};
newGame();
const switchPlayer = function () {
  document.getElementById(`current--${active}`).textContent = 0;
  document
    .querySelector(`.player--${active}`)
    .classList.remove('player--active');

  currentScore = 0;
  active = active === 0 ? 1 : 0;
  document.querySelector(`.player--${active}`).classList.add('player--active');
};
btnNew.addEventListener('click', function () {
  newGame();
});
//rolling dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `dice-${diceRoll}.png`;
    if (diceRoll !== 1) {
      currentScore += diceRoll;
      document.getElementById(`current--${active}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[active] += currentScore;
    document.getElementById(`score--${active}`).textContent = scores[active];
    if (scores[active] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${active}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${active}`)
        .classList.add('player--winner');
      dice.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', newGame);
