"use strict";
document.addEventListener('DOMContentLoaded', function () {

	var content = document.getElementById('content');

	var registration = content.querySelector('#game-rules-registration');
	var game = content.querySelector('#game');
	var playgroundBody = game.querySelector('#play-body');
	var gameResult = content.querySelector('#game-result');

	/* game settings */
	var timer = 60;
	var numberOfIconsToAdd = 3;
	/* ------------- */

	var iconSize;
	registration.style.display = 'block';
	game.style.display = 'none';
	gameResult.style.display = 'none';

	var classesToAdd = ['facebook', 'instagram', 'linkedIn', 'skype', 'twitter', 'youtube'];

	/* counters */
	var hitCounter = game.querySelector('#hit-counter');
	var totalScoreCounter = game.querySelector('#total-score-counter');
	var missCounter = game.querySelector('#miss-counter');
	/* -------- */

	/* functions helpers */
	function getRandom(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function restartGame() {
		window.location.reload(true);
	}

	function innerHTMLValue(elem, value) {
		return elem.innerHTML = value
	}
	/* ------------------- */

	/*------------------- game ---------------------------------*/
	var maxWidthPos;
	var maxHeightPos;

	var playgroundHeading = game.querySelector('.playground__heading');
	var heightOfHeading = playgroundHeading.getBoundingClientRect().height;

	function startGame() {
		registration.style.display = 'none';
		game.style.display = 'block';

		var timerEL = game.querySelector('#timer');
		var timerId = setTimeout(function tick() {
			timer--;
			timerEL.innerHTML = timer;

			timerId = setTimeout(tick, 1000);

			if (timer > 0) {
				for (var i = 0; i < numberOfIconsToAdd; i++) {
					iconSize = getRandom(50, 200);
					maxWidthPos = innerWidth - iconSize;
					maxHeightPos = innerHeight - (iconSize + heightOfHeading);
					addSocialIcons();
				}
			} else {
				clearTimeout(timerId);
				game.style.display = 'none';
				gameResult.style.display = 'block';
				results();
			}

		}, 1000);

		function addSocialIcons() {
			var iconToAdd = document.createElement('div');

			var randomIndex = getRandom(0, classesToAdd.length - 1);
			var setRandomIconClass = classesToAdd[randomIndex];

			iconToAdd.classList.add(setRandomIconClass);

			iconToAdd.style.left = getRandom(0, maxWidthPos) + 'px';
			iconToAdd.style.top = getRandom(0, maxHeightPos) + 'px';

			iconToAdd.style.width = iconSize + 'px';
			iconToAdd.style.height = iconSize + 'px';
			iconToAdd.setAttribute('data-counter', iconSize);

			playgroundBody.append(iconToAdd);
		}

		playgroundBody.addEventListener('click', removeSocialIcon)

		function removeSocialIcon(event) {
			var target = event.target;
			if (target != playgroundBody) {
				playgroundBody.removeChild(target);
				hitCounter.innerHTML = Number(innerHTMLValue(hitCounter, hitCounter.innerHTML)) + 1;
				var iconAtribute = Number(target.getAttribute('data-counter'));
				totalScore(iconAtribute);
			} else {
				missCounter.innerHTML = Number(innerHTMLValue(missCounter, missCounter.innerHTML)) + 1;
				hitCounter.innerHTML = Number(innerHTMLValue(hitCounter, hitCounter.innerHTML)) + 1;
				totalScoreCounter.innerHTML = Number(innerHTMLValue(totalScoreCounter, totalScoreCounter.innerHTML)) - 1;
			}
		}

		function totalScore(iconAtribute) {
			if (iconAtribute >= 50 && iconAtribute <= 99) {
				totalScoreCounter.innerHTML = Number(innerHTMLValue(totalScoreCounter, totalScoreCounter.innerHTML)) + 3;
			} else if (iconAtribute >= 100 && iconAtribute <= 149) {
				totalScoreCounter.innerHTML = Number(innerHTMLValue(totalScoreCounter, totalScoreCounter.innerHTML)) + 2;
			} else {
				totalScoreCounter.innerHTML = Number(innerHTMLValue(totalScoreCounter, totalScoreCounter.innerHTML)) + 1;
			}
		}

	}

	/*------------------- result -------------------------------*/
	var userName = registration.querySelector('#registration-name');

	function results() {
		var resultYourScore = gameResult.querySelector('#result-score');
		var resultUserName = gameResult.querySelector('#result-username');
		var resultHits = gameResult.querySelector('#result-hits');
		var resultMisses = gameResult.querySelector('#result-misses');

		resultYourScore.innerHTML = resultYourScore.innerHTML + ' ' + totalScoreCounter.innerHTML;
		resultUserName.innerHTML = resultUserName.innerHTML + ' ' + userName.value;
		resultHits.innerHTML = resultHits.innerHTML + ' ' + hitCounter.innerHTML;
		resultMisses.innerHTML = resultMisses.innerHTML + ' ' + missCounter.innerHTML;

		game.style.display = 'none';
		gameResult.style.display = 'block';
	}

	/* global object */
	window.game = {
		startGame: startGame,
		restartGame: restartGame,
	}

})


