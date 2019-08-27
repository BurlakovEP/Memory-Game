"use strict";

window.onload = function () {
  var getElem = function getElem(selector) {
    return document.querySelector('.' + selector);
  };

  var getRandom = function getRandom(a, b) {
    return Math.random() - 0.5;
  };

  var startPage = getElem('start-page');
  var gamePage = getElem('game-page');
  var endPage = getElem('end-page');
  var gameDesk = getElem('game-page__main');
  var deck = ['2C', '2D', '2H', '2S', '3C', '3D', '3H', '3S', '4C', '4D', '4H', '4S', '5C', '5D', '5H', '5S', '6C', '6D', '6H', '6S', '7C', '7D', '7H', '7S', '8C', '8D', '8H', '8S', '9C', '9D', '9H', '9S', '0C', '0D', '0H', '0S', 'AC', 'AD', 'AH', 'AS', 'JC', 'JD', 'JH', 'JS', 'KC', 'KD', 'KH', 'KS', 'QC', 'QD', 'QH', 'QS'];
  var clickCount = 0;
  var cardOne = '';
  var cardTwo = '';
  var cardOneId = '';
  var cardTwoId = '';
  var openPair = 0;
  var closePair = 9;
  var score = 0;
  var scoreField = getElem('game-page__field');
  scoreField.innerHTML = score;

  getElem('start-page__button').onclick = function () {
    startPage.classList.toggle('page_state_visible', false);
    startPage.classList.toggle('page_state_invisible', true);
    gamePage.classList.toggle('page_state_invisible', false);
    gamePage.classList.toggle('page_state_visible', true);
    createGameDesk();
  };

  getElem('game-page__button').onclick = function () {
    gameDesk.innerHTML = '';
    resetCards();
  };

  getElem('end-page__button').onclick = function () {
    endPage.classList.toggle('page_state_visible', false);
    endPage.classList.toggle('page_state_invisible', true);
    gamePage.classList.toggle('page_state_invisible', false);
    gamePage.classList.toggle('page_state_visible', true);
    resetCards();
  };

  function createGameDesk() {
    setTimeout(flipAllCards, 5000);
    deck.sort(getRandom);
    var sliceDeck = deck.slice(0, 9);
    var newDeck = sliceDeck.concat(sliceDeck);
    var newDeckSort = newDeck.sort(getRandom);

    for (var i = 0; i < newDeckSort.length; i++) {
      var card = document.createElement("img");
      card.className = "game-page__image";
      card.setAttribute("id", i + 1);
      card.setAttribute("src", "img/" + newDeckSort[i] + ".png");
      card.setAttribute("data-key", newDeckSort[i]);
      gameDesk.append(card);
    }
  }

  function flipAllCards() {
    var cards = gamePage.getElementsByTagName("img");

    for (var i = 0; i < cards.length; i++) {
      cards[i].setAttribute("src", "img/BG.png");
      cards[i].onclick = getCard;
    }
  }

  function getCard() {
    clickCount++;
    var cardId = this.getAttribute("id");
    var cardItem = document.getElementById(cardId);
    var key = cardItem.getAttribute("data-key");
    var srcItem = "img/" + key + ".png";

    if (clickCount === 1) {
      cardOne = key;
      cardOneId = cardId;
      cardItem.setAttribute("src", srcItem);
    } else if (clickCount === 2) {
      cardTwo = key;
      cardTwoId = cardId;
      cardItem.setAttribute("src", srcItem);

      if (cardOne === cardTwo && cardOneId !== cardTwoId) {
        var hideCards = function hideCards() {
          document.getElementById(cardOneId).style.visibility = "hidden";
          document.getElementById(cardTwoId).style.visibility = "hidden";
          clickCount = 0;
        };

        setTimeout(hideCards, 600);
        closePair--;
        openPair++;

        if (closePair === 0) {
          score += 42;
        } else {
          score += closePair * 42;
        }

        scoreField.innerHTML = score;
      } else {
        var flipCards = function flipCards() {
          document.getElementById(cardOneId).src = "img/BG.png";
          document.getElementById(cardTwoId).src = "img/BG.png";
          clickCount = 0;
        };

        setTimeout(flipCards, 1000);
        score -= openPair * 42;

        if (score <= 0) {
          score = 0;
        }

        scoreField.innerHTML = score;
      }
    }

    if (closePair === 0 && openPair === 9) {
      var goToEndPage = function goToEndPage() {
        gameDesk.innerHTML = '';
        gamePage.classList.toggle('page_state_visible', false);
        gamePage.classList.toggle('page_state_invisible', true);
        endPage.classList.toggle('page_state_invisible', false);
        endPage.classList.toggle('page_state_visible', true);
        getElem("end-page__field").innerHTML = score;
      };

      setTimeout(goToEndPage, 1000);
    }
  }

  function resetCards() {
    openPair = 0;
    closePair = 9;
    score = 0;
    scoreField.innerHTML = score;
    createGameDesk();
  }
};