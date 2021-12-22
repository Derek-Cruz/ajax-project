/* exported data */
var data = {
  page: 1,
  list: {
    creature: [],
    land: [],
    artifact: [],
    enchantment: [],
    planeswalker: [],
    spells: []
  },
  decklist: {
    decklistId: 1,
    newList: []
  }
};

var $userList = localStorage.getItem('userList');
if ($userList !== null) {
  data = JSON.parse($userList);
}

window.addEventListener('beforeunload', function (event) {
  const $data = JSON.stringify(data);
  localStorage.setItem('userList', $data);
});
