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
  nextDeckListId: 1,
  deckLists: {},
  deckName: ''
};

var $userList = localStorage.getItem('userList');
if ($userList !== null) {
  data = JSON.parse($userList);
}

window.addEventListener('beforeunload', function (event) {
  const $data = JSON.stringify(data);
  localStorage.setItem('userList', $data);
});
