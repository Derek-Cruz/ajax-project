const $header = document.querySelector('header');
const $welcomePage = document.querySelector('div[data-view="welcome-page"]');
const $browsingPage = document.querySelector('div[data-view="browsing-page"]');
const $myDecksPage = document.querySelector('div[data-view="my-decks-page"]');
const $getStartedButton = document.querySelector('.get-started-button-style');
const $cardList = document.querySelector('#card-list');
const $deckButton = document.querySelector('.deck-button');
const $modalDeckButton = document.querySelector('.modal-container');
const $modalViewButton = document.querySelector('.modal-container-two');
const $modalDeckButtonClose = document.querySelector('.fa-window-close');
const $modalViewButtonClose = document.querySelector('.testingclose');
const $viewdeckbutton = document.querySelector('.modal-container-two');
const $arrowLeft = document.querySelector('.fa-long-arrow-alt-left');
const $arrowRight = document.querySelector('.fa-long-arrow-alt-right');
const $aTagMyDecks = document.querySelector('.a-my-decks');
const $aTagMakeDeck = document.querySelector('.a-make-deck');
const $searchBar = document.querySelector('#searchBar');
const $searchButton = document.querySelector('.searchButton');
const $creatures = document.querySelector('.creatures-card-holder');
const $creaturesView = document.querySelector('.creatures-card-holder-view');
const $creaturesDiv = document.querySelector('.creatures-div');
const $creaturesDivView = document.querySelector('.creatures-div-view');
const $lands = document.querySelector('.lands-card-holder');
const $landsView = document.querySelector('.lands-card-holder-view');
const $landsDiv = document.querySelector('.lands-div');
const $landsDivView = document.querySelector('.lands-div-view');
const $planeswalkers = document.querySelector('.planeswalkers-card-holder');
const $planeswalkersView = document.querySelector('.planeswalkers-card-holder-view');
const $planeswalkersDiv = document.querySelector('.planeswalkers-div');
const $planeswalkersDivView = document.querySelector('.planeswalkers-div-view');
const $enchantments = document.querySelector('.enchantments-card-holder');
const $enchantmentsView = document.querySelector('.enchantments-card-holder-view');
const $enchantmentsDiv = document.querySelector('.enchantments-div');
const $enchantmentsDivView = document.querySelector('.enchantments-div-view');
const $spells = document.querySelector('.spells-card-holder');
const $spellsView = document.querySelector('.spells-card-holder-view');
const $spellsDiv = document.querySelector('.spells-div');
const $spellsDivView = document.querySelector('.spells-div-view');
const $artifacts = document.querySelector('.artifacts-card-holder');
const $artifactsView = document.querySelector('.artifacts-card-holder-view');
const $artifactsDiv = document.querySelector('.artifacts-div');
const $artifactsDivView = document.querySelector('.artifacts-div-view');
const $ulList = document.querySelector('.ul-decklist');
const $deckNameHeader = document.querySelector('.deck-name-h1');

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

$modalViewButtonClose.addEventListener('click', function () {
  $modalViewButton.classList.add('hidden');
  $creaturesDivView.classList.add('hidden');
  $artifactsDivView.classList.add('hidden');
  $spellsDivView.classList.add('hidden');
  $enchantmentsDivView.classList.add('hidden');
  $planeswalkersDivView.classList.add('hidden');
  $landsDivView.classList.add('hidden');
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
    const listObj = {
      name: event.target.getAttribute('data-card-name'),
      type: event.target.getAttribute('data-card-types')
    };
    typeCompare(listObj);
    renderList(listObj);
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

function renderList(card) {
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

document.getElementById('save-list').addEventListener('click', () => {
  const $newDecklist = Object.entries(data.list);
  const newList = {};

  newList.deckName = document.getElementById('name').value;
  document.getElementById('name').value = '';

  for (const [type, card] of $newDecklist) {
    newList[type] = card;

    data.list[type] = [];
  }

  data.deckLists[data.nextDeckListId] = newList;
  data.nextDeckListId++;

  $ulList.innerHTML = '';
  const $lis = decklistRender();
  $ulList.append(...$lis);

  $modalDeckButton.classList.add('hidden');
  $creaturesDiv.classList.add('hidden');
  $creatures.innerHTML = '';
  $planeswalkersDiv.classList.add('hidden');
  $planeswalkers.innerHTML = '';
  $artifactsDiv.classList.add('hidden');
  $artifacts.innerHTML = '';
  $enchantmentsDiv.classList.add('hidden');
  $enchantments.innerHTML = '';
  $landsDiv.classList.add('hidden');
  $lands.innerHTML = '';
  $spellsDiv.classList.add('hidden');
  $spells.innerHTML = '';
});

const $testinghiddendiv = document.querySelector('.testing-hidden-div');

function decklistRender() {
  const deckIds = Object.keys(data.deckLists);
  const $listElements = [];

  if ($listElements === []) {
    $ulList.classList.add('hidden');
    $testinghiddendiv.classList.remove('hidden');
  } else {
    for (let i = 0; i < deckIds.length; i++) {
      const id = deckIds[i];
      const $li = document.createElement('li');
      const $div = document.createElement('div');
      const $button = document.createElement('button');
      const $buttonTwo = document.createElement('button');

      $li.setAttribute('class', 'row decklist-render-li');
      $li.setAttribute('data-deck-id', id);
      $li.textContent = data.deckLists[id].deckName;

      $div.setAttribute('class', 'decklist-render-div');
      $div.setAttribute('data-entry-id', id);

      $buttonTwo.setAttribute('class', 'button-style-decklist-render');
      $buttonTwo.textContent = 'DELETE';
      $buttonTwo.addEventListener('click', function (event) {
        if (data.deckLists[id]) {
          delete data.deckLists[id];
        }
        $ulList.innerHTML = '';
        const $lis = decklistRender();
        $ulList.append(...$lis);
      });

      $button.setAttribute('data-entry-id', id);
      $button.setAttribute('class', 'button-style-decklist-render');
      $button.textContent = 'VIEW';
      $button.addEventListener('click', function (event) {
        $viewdeckbutton.classList.remove('hidden');
        $deckNameHeader.innerHTML = data.deckLists[id].deckName;

        function testingRender() {
          const creatures = (data.deckLists[id].creature);
          const lands = (data.deckLists[id].land);
          const artifacts = (data.deckLists[id].artifact);
          const enchantments = (data.deckLists[id].enchantment);
          const planeswalkers = (data.deckLists[id].planeswalker);
          const spells = (data.deckLists[id].spells);

          for (let i = 0; i < creatures.length; i++) {
            $creaturesDivView.classList.remove('hidden');
            const $divDeckView = document.createElement('div');
            $divDeckView.setAttribute('class', 'creatures-view');
            const $pDeckView = document.createElement('p');
            $pDeckView.setAttribute('class', 'p-modal-listing');
            $pDeckView.textContent = creatures[i].name;
            $divDeckView.append($pDeckView);
            $creaturesView.append($divDeckView);
          }
          for (let i = 0; i < lands.length; i++) {
            $landsDivView.classList.remove('hidden');
            const $divDeckView = document.createElement('div');
            $divDeckView.setAttribute('class', 'lands-view');
            const $pDeckView = document.createElement('p');
            $pDeckView.setAttribute('class', 'p-modal-listing');
            $pDeckView.textContent = lands[i].name;
            $divDeckView.append($pDeckView);
            $landsView.append($divDeckView);
          }
          for (let i = 0; i < artifacts.length; i++) {
            $artifactsDivView.classList.remove('hidden');
            const $divDeckView = document.createElement('div');
            $divDeckView.setAttribute('class', 'artifacts-view');
            const $pDeckView = document.createElement('p');
            $pDeckView.setAttribute('class', 'p-modal-listing');
            $pDeckView.textContent = artifacts[i].name;
            $divDeckView.append($pDeckView);
            $artifactsView.append($divDeckView);
          }
          for (let i = 0; i < enchantments.length; i++) {
            $enchantmentsDivView.classList.remove('hidden');
            const $divDeckView = document.createElement('div');
            $divDeckView.setAttribute('class', 'enchantments-view');
            const $pDeckView = document.createElement('p');
            $pDeckView.setAttribute('class', 'p-modal-listing');
            $pDeckView.textContent = enchantments[i].name;
            $divDeckView.append($pDeckView);
            $enchantmentsView.append($divDeckView);
          }
          for (let i = 0; i < planeswalkers.length; i++) {
            $planeswalkersDivView.classList.remove('hidden');
            const $divDeckView = document.createElement('div');
            $divDeckView.setAttribute('class', 'planeswalkers-view');
            const $pDeckView = document.createElement('p');
            $pDeckView.setAttribute('class', 'p-modal-listing');
            $pDeckView.textContent = planeswalkers[i].name;
            $divDeckView.append($pDeckView);
            $planeswalkersView.append($divDeckView);
          }
          for (let i = 0; i < spells.length; i++) {
            $spellsDivView.classList.remove('hidden');
            const $divDeckView = document.createElement('div');
            $divDeckView.setAttribute('class', 'spells-view');
            const $pDeckView = document.createElement('p');
            $pDeckView.setAttribute('class', 'p-modal-listing');
            $pDeckView.textContent = spells[i].name;
            $divDeckView.append($pDeckView);
            $spellsView.append($divDeckView);
          }
        }
        $creaturesView.innerHTML = '';
        $artifactsView.innerHTML = '';
        $enchantmentsView.innerHTML = '';
        $spellsView.innerHTML = '';
        $planeswalkersView.innerHTML = '';
        $landsView.innerHTML = '';
        testingRender();
      });

      $listElements.push($li);
      $li.appendChild($div);
      $div.appendChild($buttonTwo);
      $div.appendChild($button);
    }
  }
  return $listElements;
}

document.addEventListener('DOMContentLoaded', function (event) {
  const $lis = decklistRender();
  $ulList.append(...$lis);
});
