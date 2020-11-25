$(document).ready(function () {
	var content = $('#content');

	var registration = content.find('#game-rules-registration');
	var game = content.find('#game');
	var playgroundBody = game.find('#play-body');
	var gameResult = content.find('#game-result');

	/* game settings */
	var timer = 60;
	var numberOfIconsToAdd = 3;
	/* ------------- */

	var iconSize;
	registration.show();
	game.hide();
	gameResult.hide();

	var classesToAdd = ['facebook', 'instagram', 'linkedIn', 'skype', 'twitter', 'youtube'];

	/* counters */
	var hitCounter = game.find('#hit-counter');
	var totalScoreCounter = game.find('#total-score-counter');
	var missCounter = game.find('#miss-counter');
	/* -------- */

	/* functions helpers */
	function getRandom(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function restartGame() {
		window.location.reload(true);
	}

	function innerHTMLValue(elem) {
		return elem.html()
	}
	/* ------------------- */

	/*------------------- game ---------------------------------*/
	var maxWidthPos;
	var maxHeightPos;

	var playgroundHeading = game.find('.playground__heading');
	var heightOfHeading = playgroundHeading[0].getBoundingClientRect().height;

	function startGame() {
		registration.hide();
		game.show();

		var timerEL = game.find('#timer');
		var timerId = setTimeout(function tick() {
			timer--;
			timerEL.html(timer);

			timerId = setTimeout(tick, 100);

			if (timer > 0) {
				for (var i = 0; i < numberOfIconsToAdd; i++) {
					iconSize = getRandom(50, 200);
					maxWidthPos = innerWidth - iconSize;
					maxHeightPos = innerHeight - (iconSize + heightOfHeading);
					addSocialIcons();
				}
			} else {
				clearTimeout(timerId);
				game.hide();
				gameResult.show();
				results();
			}

		}, 100);

		function addSocialIcons() {
			var iconToAdd = $('<div></div>');

			var randomIndex = getRandom(0, classesToAdd.length - 1);
			var setRandomIconClass = classesToAdd[randomIndex];

			iconToAdd.addClass(setRandomIconClass);
			iconToAdd.css({
				top: getRandom(0, maxHeightPos) + 'px',
				left: getRandom(0, maxWidthPos) + 'px',
				width: iconSize + 'px',
				height: iconSize + 'px'
			});
			iconToAdd.attr('data-counter', iconSize);
			playgroundBody.append(iconToAdd);
		}

		playgroundBody.on('click', removeSocialIcon)

		function removeSocialIcon(event) {
			var target = event.target;
			if (target != playgroundBody[0]) {
				target.remove();
				hitCounter.html(Number(innerHTMLValue(hitCounter)) + 1);
				var iconAtribute = Number($(target).attr('data-counter'));
				totalScore(iconAtribute);
			} else {
				missCounter.html(Number(innerHTMLValue(missCounter)) + 1);
				hitCounter.html(Number(innerHTMLValue(hitCounter)) + 1);
				totalScoreCounter.html(Number(innerHTMLValue(totalScoreCounter)) - 1);
			}
		}

		function totalScore(iconAtribute) {
			if (iconAtribute >= 50 && iconAtribute <= 99) {
				totalScoreCounter.html(Number(innerHTMLValue(totalScoreCounter)) + 3);
			} else if (iconAtribute >= 100 && iconAtribute <= 149) {
				totalScoreCounter.html(Number(innerHTMLValue(totalScoreCounter)) + 2);
			} else {
				totalScoreCounter.html(Number(innerHTMLValue(totalScoreCounter)) + 1);
			}
		}

	}

	/*------------------- result -------------------------------*/
	var userName = registration.find('#registration-name');

	function results() {
		var resultYourScore = gameResult.find('#result-score');
		var resultUserName = gameResult.find('#result-username');
		var resultHits = gameResult.find('#result-hits');
		var resultMisses = gameResult.find('#result-misses');

		resultYourScore.html(resultYourScore.html() + ' ' + totalScoreCounter.html());
		resultUserName.html(resultUserName.html() + ' ' + userName.val());
		resultHits.html(resultHits.html() + ' ' + hitCounter.html());
		resultMisses.html(resultMisses.html() + ' ' + missCounter.html());

		game.hide();
		gameResult.show();
	}

	/* global object */
	window.game = {
		startGame: startGame,
		restartGame: restartGame,
	}
});