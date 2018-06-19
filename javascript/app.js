const search = require('./search.js');
const makeListItem = require('./restaurantListItem.js')
const restaurant = require('../data/sampleRestaurant.js');

// console.log(search.findParis);
const resultsView = document.getElementById('search-results');

// const displayResults = (res) => {
//   resultsView.innerHTML = `<div>${res}</div>`;
// };

// uncomment to load data on load
// search('coffee', resultsView);

const newEl = makeListItem(restaurant, resultsView);
console.log(makeListItem(restaurant, resultsView));
resultsView.insertAdjacentHTML('beforeend', newEl);
