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
  decklist: []
};

var $decklist = localStorage.getItem('decklist');
if ($decklist !== null) {
  data = JSON.parse($decklist);
}

window.addEventListener('beforeunload', function (event) {
  const $data = JSON.stringify(data);
  localStorage.setItem('decklist', $data);
});
