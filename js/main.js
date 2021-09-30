const $header = document.querySelector('header');
const $welcomePage = document.querySelector('div[data-view="welcome-page"]');
const $browsingPage = document.querySelector('div[data-view="browsing-page"]');
const $myDecksPage = document.querySelector('div[data-view="my-decks-page"]');
const $getStartedButton = document.querySelector('.get-started-button-style');
const $cardList = document.querySelector('#card-list');
const $deckButton = document.querySelector('.deck-button');
const $modalDeckButton = document.querySelector('.modal-container');
const $modalDeckButtonClose = document.querySelector('.fa-window-close');
const $arrowLeft = document.querySelector('.fa-long-arrow-alt-left');
const $arrowRight = document.querySelector('.fa-long-arrow-alt-right');
const $aTagMyDecks = document.querySelector('.a-my-decks');
const $aTagMakeDeck = document.querySelector('.a-make-deck');
const $searchBar = document.querySelector('#searchBar');
const $searchButton = document.querySelector('.searchButton');

function getData() {
  const xhr = new XMLHttpRequest();
  const url = 'https://api.magicthegathering.io/v1/cards?page=' + data.page;
  xhr.open('GET', url);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (var i = 0; i < xhr.response.cards.length; i++) {
      var $cards = renderCards(xhr.response.cards[i]);
      $cardList.appendChild($cards);
    }
  });
  xhr.send();
}

getData();

$getStartedButton.addEventListener('click', function (event) {
  $header.classList.remove('hidden');
  $welcomePage.classList.add('hidden');
  $browsingPage.classList.remove('hidden');
});

$deckButton.addEventListener('click', function () {
  $modalDeckButton.classList.remove('hidden');
});

$modalDeckButtonClose.addEventListener('click', function () {
  $modalDeckButton.classList.add('hidden');
});

$arrowLeft.addEventListener('click', function () {
  $cardList.innerHTML = '';
  data.page--;
  scroll({ top: 0, behavior: 'instant' });
  getData();
});

$arrowRight.addEventListener('click', function () {
  $cardList.innerHTML = '';
  data.page++;
  scroll({ top: 0, behavior: 'instant' });
  getData();
});

$aTagMyDecks.addEventListener('click', function () {
  $header.classList.remove('hidden');
  $myDecksPage.classList.remove('hidden');
  $browsingPage.classList.add('hidden');
  $welcomePage.classList.add('hidden');
});

$aTagMakeDeck.addEventListener('click', function () {
  $header.classList.remove('hidden');
  $myDecksPage.classList.add('hidden');
  $welcomePage.classList.add('hidden');
  $browsingPage.classList.remove('hidden');
});

function renderCards(card) {
  const $li = document.createElement('li');
  const $div = document.createElement('div');
  const $divTwo = document.createElement('div');
  const $h2 = document.createElement('h2');
  const $img = document.createElement('img');
  const $button = document.createElement('button');

  $li.setAttribute('class', 'card-display-li');
  $h2.setAttribute('class', 'card-display-h2');
  $h2.textContent = card.name;

  $img.setAttribute('class', 'card-display-img');
  if (!card.imageUrl) {
    $img.setAttribute('src', './images/placeholder.jpg');
  } else {
    $img.setAttribute('src', card.imageUrl);
  }

  $divTwo.setAttribute('class', 'card-display-button-div');
  $button.setAttribute('class', 'card-display-add');
  $button.textContent = 'Add';

  $li.appendChild($div);
  $div.appendChild($h2);
  $div.appendChild($img);
  $div.appendChild($divTwo);
  $divTwo.appendChild($button);

  return $li;
}

$searchBar.addEventListener('keydown', function () {
  if ($searchBar.value) {
    $searchBar.value.toLowerCase();
  }
});

$searchButton.addEventListener('click', function () {
  $cardList.innerHTML = '';
  const xhr = new XMLHttpRequest();
  const url = 'https://api.magicthegathering.io/v1/cards?name=' + $searchBar.value;
  xhr.open('GET', url);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (var i = 0; i < xhr.response.cards.length; i++) {
      var $cards = renderCards(xhr.response.cards[i]);
      $cardList.appendChild($cards);
    }
  });
  xhr.send();
  $searchBar.value = '';
  $arrowLeft.classList.add('hidden');
  $arrowRight.classList.add('hidden');
});
