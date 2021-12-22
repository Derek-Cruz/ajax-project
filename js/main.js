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
const $creatures = document.querySelector('.creatures-card-holder');
const $planeswalkers = document.querySelector('.planeswalkers-card-holder');
const $lands = document.querySelector('.lands-card-holder');
const $enchantments = document.querySelector('.enchantments-card-holder');
const $spells = document.querySelector('.spells-card-holder');
const $artifacts = document.querySelector('.artifacts-card-holder');
const $creaturesDiv = document.querySelector('.creatures-div');
const $planeswalkersDiv = document.querySelector('.planeswalkers-div');
const $landsDiv = document.querySelector('.lands-div');
const $enchantmentsDiv = document.querySelector('.enchantments-div');
const $spellsDiv = document.querySelector('.spells-div');
const $artifactsDiv = document.querySelector('.artifacts-div');

function getData() {
  const xhr = new XMLHttpRequest();
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

// ------------------------------------------------------RENDER CARDS------------------------------------------------------

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
  $button.setAttribute('data-card-name', card.name);
  $button.setAttribute('data-card-types', card.types);

  $button.addEventListener('click', function (event) {
    // console.log('data:', data.list);
    const listObj = {
      name: event.target.getAttribute('data-card-name'),
      type: event.target.getAttribute('data-card-types')
    };
    typeCompare(listObj);
    renderToModal(listObj);

  });

  $li.appendChild($div);
  $div.appendChild($h2);
  $div.appendChild($img);
  $div.appendChild($divTwo);
  $divTwo.appendChild($button);

  return $li;
}

function typeCompare(obj) {
  if (obj.type === 'Creature') {
    data.list.creature.push(obj);
  } else if (obj.type === 'Land') {
    data.list.land.push(obj);
  } else if (obj.type === 'Artifact') {
    data.list.artifact.push(obj);
  } else if (obj.type === 'Enchantment') {
    data.list.enchantment.push(obj);
  } else if (obj.type === 'Planeswalker') {
    data.list.planeswalker.push(obj);
  } else if (obj.type === 'Instant' || obj.type === 'Sorcery') {
    data.list.spells.push(obj);
  }
}

// ------------------------------------------------------CARDS IN MODAL------------------------------------------------------

function renderToModal(card) {
  const $div = document.createElement('div');
  const $p = document.createElement('p');

  if (card.type === 'Creature') {
    $creaturesDiv.classList.remove('hidden');
    $div.setAttribute('class', 'creatures');
    $p.setAttribute('class', 'p-modal-listing');
    $p.textContent = card.name;
    $div.append($p);
    $creatures.append($div);

  } else if (card.type === 'Land') {
    $landsDiv.classList.remove('hidden');
    $div.setAttribute('class', 'lands');
    $p.setAttribute('class', 'p-modal-listing');
    $p.textContent = card.name;
    $div.append($p);
    $lands.append($div);

  } else if (card.type === 'Artifact') {
    $artifactsDiv.classList.remove('hidden');
    $div.setAttribute('class', 'artifacts');
    $p.setAttribute('class', 'p-modal-listing');
    $p.textContent = card.name;
    $div.append($p);
    $artifacts.append($div);

  } else if (card.type === 'Enchantment') {
    $enchantmentsDiv.classList.remove('hidden');
    $div.setAttribute('class', 'enchantments');
    $p.setAttribute('class', 'p-modal-listing');
    $p.textContent = card.name;
    $div.append($p);
    $enchantments.append($div);

  } else if (card.type === 'Planeswalker') {
    $planeswalkersDiv.classList.remove('hidden');
    $div.setAttribute('class', 'planeswalkers');
    $p.setAttribute('class', 'p-modal-listing');
    $p.textContent = card.name;
    $div.append($p);
    $planeswalkers.append($div);

  } else if (card.type === 'Instant' || card.type === 'Sorcery') {
    $spellsDiv.classList.remove('hidden');
    $div.setAttribute('class', 'spells');
    $p.setAttribute('class', 'p-modal-listing');
    $p.textContent = card.name;
    $div.append($p);
    $spells.append($div);
  }
}

// ------------------------------------------------------SEARCH------------------------------------------------------

$searchBar.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    if (!$searchBar.value || $searchBar.value === ' ') {
      return;
    }
    search();
  }

  if ($searchBar.value) {
    $searchBar.value.toLowerCase();
  }
});

$searchButton.addEventListener('click', search);

function search(event) {
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
}

// document.getElementById('save-list').addEventListener('click', () => {
//   const newDecklist = Object.entries(data.list);

//   for (const [type, card] of newDecklist) {
//     data.decklist.newList.push(newDecklist);
//     console.log('TYPE:', type);
//     console.log('CARD:', card);
//   }
//   data.decklist.decklistId++;
// });
// console.log('data:', data);
