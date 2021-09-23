const $header = document.querySelector('header');
const $welcomePage = document.querySelector('div[data-view="welcome-page"]');
const $browsingPage = document.querySelector('div[data-view="browsing-page"]');
const $getStartedButton = document.querySelector('.get-started-button-style');

$getStartedButton.addEventListener('click', function (event) {
  $header.classList = 'header-background view';
  $welcomePage.classList = 'blood-moon-image blood-moon-height view hidden';
  $browsingPage.classList = 'view';
});

const $userList = document.querySelector('#user-list');

function getData() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.magicthegathering.io/v1/cards');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // console.log(xhr.response);

    for (const loop in xhr.response.cards) {
      const $newLi = document.createElement('li');
      $newLi.textContent = xhr.response.cards[loop].name;
      $userList.append($newLi);
    }
  });
  xhr.send();
}

getData();
