'use strict';

const rollDice = document.querySelector('.btn--roll');
const holdDice = document.querySelector('.btn--hold');
const newGame = document.querySelector('.newGame');
console.log(newGame);
const currScore0 = document.querySelector('.curr-score--0');
const currScore1 = document.querySelector('.curr-score--1');
const holdScore0 = document.querySelector('.hold-score--0');
const holdScore1 = document.querySelector('.hold-score--1');
const player0 = document.querySelector('.player-0');
const player1 = document.querySelector('.player-1');
const diceImg = document.querySelector('.dice');
let activePlayer;
let currScoresArray;
let holdScoresArray;
let playContinue;

const init = function () {
  currScore0.textContent = 0;
  currScore1.textContent = 0;
  holdScore0.textContent = 0;
  holdScore1.textContent = 0;

  activePlayer = 0;
  currScoresArray = [0, 0];
  holdScoresArray = [0, 0];
  playContinue = true;

  diceImg.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player1.classList.remove('player--active');
  player0.classList.add('player--active');

  rollDice.classList.remove('hidden');
  holdDice.classList.remove('hidden');
};

init();
const switchPlayer = function () {
  if (playContinue) {
    holdScoresArray[activePlayer] =
      holdScoresArray[activePlayer] + currScoresArray[activePlayer];

    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    currScoresArray = [0, 0];

    currScore0.textContent = 0;
    currScore1.textContent = 0;

    holdScore0.textContent = holdScoresArray[0];
    holdScore1.textContent = holdScoresArray[1];

    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
  }
};

rollDice.addEventListener('click', function () {
  if (playContinue) {
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    diceImg.src = `dice-${diceNum}.png`;

    if (diceNum === 1) {
      currScoresArray[activePlayer] = 0;
      switchPlayer();
      return;
    }

    currScoresArray[activePlayer] = currScoresArray[activePlayer] + diceNum;
    if (currScoresArray[activePlayer] > 50) {
      activePlayer === 0
        ? player0.classList.toggle('player--winner')
        : player1.classList.toggle('player--winner');

      rollDice.classList.add('hidden');
      holdDice.classList.add('hidden');
    }
    currScore0.textContent = currScoresArray[0];
    currScore1.textContent = currScoresArray[1];

    diceImg.classList.remove('hidden');
  }
});
newGame.addEventListener('click', init);
holdDice.addEventListener('click', switchPlayer);
