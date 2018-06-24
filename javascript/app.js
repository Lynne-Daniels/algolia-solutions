// const search = require('./search.js');
const helper = require('./search.js');
const makeListItem = require('./restaurantListItem.js');
const makeNavCategory = require('./navigationCategory.js');
const restaurant = require('../data/sampleRestaurant.js');

// console.log(search.findParis);
const resultsView = document.getElementById('search-results');
const navView = document.getElementById('navigation');

const searchFilterCategories = ['food_type', 'stars_count', 'payment_options'];
const searchBox = document.getElementById('search-box');

// const displayResults = (res) => {
//   resultsView.innerHTML = `<div>${res}</div>`;
// };

// uncomment to load data on load and uncomment older search code
// search('coffee', resultsView);

helper.search();

// console.log(searchBox);
searchBox.addEventListener('keyup', (e) => {
  console.log('keyup!', searchBox.value);
  helper.setQuery(searchBox.value)
    .search();
});

// const newEl = makeListItem(restaurant, resultsView);
// console.log(makeListItem(restaurant, resultsView));
// resultsView.insertAdjacentHTML('beforeend', newEl);
// navView.insertAdjacentHTML('beforeend', searchFilters)

