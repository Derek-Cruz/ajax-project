const $header = document.querySelector('header');
const $welcomePage = document.querySelector('div[data-view="welcome-page"]');
const $browsingPage = document.querySelector('div[data-view="browsing-page"]');
const $getStartedButton = document.querySelector('.get-started-button-style');
const $cardList = document.querySelector('#card-list');
const $deckButton = document.querySelector('.deck-button');
const $modalDeckButton = document.querySelector('.modal-container');
const $modalDeckButtonClose = document.querySelector('.fa-window-close');
const $arrowLeft = document.querySelector('.fa-long-arrow-alt-left');
const $arrowRight = document.querySelector('.fa-long-arrow-alt-right');

function getData() {
  const xhr = new XMLHttpRequest();
  // added data.page
  const url = 'https://api.magicthegathering.io/v1/cards?page=' + data.page;
  xhr.open('GET', url);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // console.log('results:', xhr.response);
    for (var i = 0; i < xhr.response.cards.length; i++) {
      var $cards = renderCards(xhr.response.cards[i]);
      $cardList.appendChild($cards);
    }
  });
  xhr.send();
}

getData();

$getStartedButton.addEventListener('click', function (event) {
  $header.classList = 'header-background view';
  $welcomePage.classList = 'blood-moon-image blood-moon-height view hidden';
  $browsingPage.classList = 'view';
});

$deckButton.addEventListener('click', function () {
  $modalDeckButton.classList = 'modal-container view';
});

$modalDeckButtonClose.addEventListener('click', function () {
  $modalDeckButton.classList = 'modal-container view hidden';
});

$arrowLeft.addEventListener('click', function () {
  data.page--;
  // console.log('arrowleft', data.page);
});

$arrowRight.addEventListener('click', function () {
  data.page++;
  // console.log('arrowleft', data.page);
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
