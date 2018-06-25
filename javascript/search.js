const algoliasearch = require('algoliasearch');
const algoliasearchHelper = require('algoliasearch-helper');

const client = algoliasearch('KKSCWMQ6I2', '2eaa1ac22c890a799a97628d8d868710');
const index = client.initIndex('restaurants');
const helper = algoliasearchHelper(client, 'restaurants', {
  facets: ['food_type', 'stars_count', '_geoloc'],
  // TODO get payment_options in there - it is an array
});

const renderRestaurantListItem = require('./restaurantListItem.js');

const resultsView = document.getElementById('search-results');
const facetView = document.getElementById('navigation');

const renderContent = (content) => {

  let output = `${content.hits.length} results found`;

  for (let i = 0; i < 20 && i < content.hits.length; i++) {
    output += renderRestaurantListItem(content.hits[i]);
  }

  resultsView.innerHTML = output;
};

const handleFoodTypeClick = (e) => {

  helper.toggleFacetRefinement('food_type', e.target.getAttribute('data-food-type'))
    .search();
};

const renderFacetList = (content) => {
  let listItems = '';
  let output = `<p>Cuisine/Food Types</p>
  <ul class="filter">`;

  listItems = content.getFacetValues('food_type').map((facet) => {
    return (
      `<li><input class="checkbox"
      onclick="${handleFoodTypeClick}"
      type="radio"
      name="food-type"
      data-food-type="${facet.name}">
      <span class="filter-term">${facet.name}</span><span class="count">${facet.count}</span></li>`
    );
  });

  output += `${listItems.join('')}</ul>`;
  facetView.innerHTML = output;
  const checkboxes = document.getElementsByClassName('checkbox');
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('click', handleFoodTypeClick, false);
  }
};

helper.on('result', (res) => {
  renderContent(res);
  renderFacetList(res);
});

module.exports = helper;
