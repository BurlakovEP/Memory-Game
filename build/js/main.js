window.onload = () => {
  const getElem = (selector) => document.querySelector(`.${selector}`);
  const getRandom = () => Math.random() - 0.5;
  const startPage = getElem('start-page');
  const gamePage = getElem('game-page');
  const endPage = getElem('end-page');
  const scoreField = getElem('game-page__field');
  const cards = document.querySelectorAll('.card');

  function changeState(elem, param) {
    const { classList } = elem;
    let newtState;

    if (param === 'show') newtState = '_visible';
    if (param === 'hide') newtState = '_invisible';
    if (param === 'flip') newtState = '_flipped';

    classList.remove(classList[classList.length - 1]);
    classList.add(classList[0] + newtState);
  }

  function setPath(elem, param) {
    elem.setAttribute('src', param);
  }

  const deck = [
    '2C', '2D', '2H', '2S', '3C', '3D', '3H', '3S', '4C', '4D', '4H', '4S', '5C', '5D', '5H', '5S', '6C', '6D', '6H', '6S', '7C', '7D', '7H', '7S', '8C', '8D', '8H', '8S', '9C', '9D', '9H', '9S', '0C', '0D', '0H', '0S', 'AC', 'AD', 'AH', 'AS', 'JC', 'JD', 'JH', 'JS', 'KC', 'KD', 'KH', 'KS', 'QC', 'QD', 'QH', 'QS',
  ];

  let clickCount = 0;
  let cardOne = '';
  let cardTwo = '';
  let cardOneKey = '';
  let cardTwoKey = '';
  let cardOneId = '';
  let cardTwoId = '';
  let openPair = 0;
  let closePair = 9;
  let score = 0;

  scoreField.innerHTML = score;

  function getCard() {
    clickCount += 1;

    const id = this.getAttribute('id');
    const key = this.getAttribute('data-key');
    const src = `img/${key}.png`;

    if (clickCount === 1) {
      cardOne = this;
      cardOneKey = key;
      cardOneId = id;
      changeState(cardOne, 'show');
      setTimeout(setPath, 300, cardOne, src);
    } else if (clickCount === 2) {
      cardTwo = this;
      cardTwoKey = key;
      cardTwoId = id;
      changeState(cardTwo, 'show');
      setTimeout(setPath, 300, cardTwo, src);

      if (cardOneKey === cardTwoKey && cardOneId !== cardTwoId) {
        const hideCards = () => {
          changeState(cardOne, 'hide');
          changeState(cardTwo, 'hide');
          cardOne.removeAttribute('src');
          cardTwo.removeAttribute('src');
          cardOne.onclick = false;
          cardTwo.onclick = false;

          clickCount = 0;
        };
        setTimeout(hideCards, 1000);

        closePair -= 1;
        openPair += 1;

        if (closePair === 0) {
          score += 42;
        } else {
          score += closePair * 42;
        }

        scoreField.innerHTML = score;
      } else {
        const flipCards = () => {
          changeState(cardOne, 'flip');
          changeState(cardTwo, 'flip');
          setTimeout(setPath, 200, cardOne, 'img/BG.png');
          setTimeout(setPath, 200, cardTwo, 'img/BG.png');

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
      const goToEndPage = () => {
        changeState(gamePage, 'hide');
        changeState(endPage, 'show');
        getElem('end-page__field').innerHTML = score;
      };
      setTimeout(goToEndPage, 1100);
    }
  }

  function flipAllCards() {
    for (let i = 0; i < cards.length; i++) {
      cards[i].classList.add('card_flipped');
      setTimeout(setPath, 200, cards[i], 'img/BG.png');
      cards[i].onclick = getCard;
    }
  }

  function createGameDesk(delay) {
    deck.sort(getRandom);
    const sliceDeck = deck.slice(0, 9);
    const newDeck = sliceDeck.concat(sliceDeck);
    const newDeckSort = newDeck.sort(getRandom);

    for (let i = 0; i < newDeckSort.length; i++) {
      cards[i].className = 'card';
      setTimeout(setPath, delay, cards[i], `img/${newDeckSort[i]}.png`);
      cards[i].setAttribute('id', i + 1);
      cards[i].setAttribute('data-key', newDeckSort[i]);
    }
    setTimeout(flipAllCards, 5000);
  }

  function resetCards() {
    openPair = 0;
    closePair = 9;
    score = 0;
    scoreField.innerHTML = score;
    createGameDesk(0);
  }

  getElem('start-page__button').onclick = () => {
    changeState(startPage, 'hide');
    changeState(gamePage, 'show');
    createGameDesk(0);
  };

  getElem('game-page__button').onclick = () => {
    resetCards();
  };

  getElem('end-page__button').onclick = () => {
    changeState(endPage, 'hide');
    changeState(gamePage, 'show');
    resetCards();
  };
};
