const algoliasearch = require('algoliasearch');
const algoliasearchHelper = require('algoliasearch-helper');

const client = algoliasearch('KKSCWMQ6I2', '2eaa1ac22c890a799a97628d8d868710');
const index = client.initIndex('restaurants');
const helper = algoliasearchHelper(client, 'restaurants', {
  facets: ['food_type', 'stars_count'],
  // TODO get payment_options in there - it is an array
});

const renderRestaurantListItem = require('./restaurantListItem.js');
// const renderNavigationType =


const resultsView = document.getElementById('search-results');
const facetView = document.getElementById('navigation');
const deselected = {};

// const findParis = index.search('paris', (err, content) => {
//   console.log(content);
// });

// const getRestaurants = (searchTerm, domElement) => {
//   index.search(searchTerm, (err, content) => {
//     domElement.innerHTML = JSON.stringify(content.hits);
//     console.log(content);
//   });
// };

const renderContent = (content) => {
  console.log('renderContent called: ', content.hits.length, ' <- that many records');
  let output = '';
  for (let i = 0; i < 20 && i < content.hits.length; i++) {
    output += renderRestaurantListItem(content.hits[i]);
  }
  // resultsView.insertAdjacentHTML('beforeend', output);
  resultsView.innerHTML = output;
};

const handleCheckBoxClick = (e) => {
  console.log('clicked: ', e.target.getAttribute('data-food-type'));
  helper.toggleFacetExclusion('food_type', e.target.getAttribute('data-food-type'))
    .search();
  if (deselected[e.target.getAttribute('data-food-type')] !== 'checked') {
    deselected[e.target.getAttribute('data-food-type')] = 'checked';
    console.log('check check: ', e.target.checked, deselected[e.target.getAttribute('data-food-type')]);
    e.target.checked = true;
  } else {
    deselected[e.target.getAttribute('data-food-type')] = 'unchecked';
    e.target.checked = false;
  }
  console.table(deselected);
  console.log('conditional?? ', deselected[e.target.getAttribute('data-food-type')] === 'checked');
  
//  e.target.getAttribute('checked') = !e.target.getAttribute('checked');
};

const renderFacetList = (content) => {
  let listItems = '';
  console.log('here i am!!!!!');
  let output = `<p>Cuisine/Food Types</p>
  <ul class="filter">`;
  console.log('food type data: ', content.getFacetValues('food_type'));
  listItems = content.getFacetValues('food_type').map((facet) => {
    console.log('facetty: ', facet.name, deselected[facet.name]);
    deselected[facet.name] = 'checked';
    return (
      `<li><input class="checkbox"
      onclick="${handleCheckBoxClick}"
      type="checkbox"
      data-food-type="${facet.name}">
      <span class="filter-term">${facet.name}</span><span class="count">${facet.count}</span></li>`
    );
  });
  output += `${listItems.join('')}</ul>`;
  // facetView.insertAdjacentHTML('beforeend', output);
  facetView.innerHTML = output;
  const checkboxes = document.getElementsByClassName('checkbox');
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('click', handleCheckBoxClick, false);
    checkboxes[i].checked = deselected[checkboxes[i].getAttribute('data-food-type')] === 'checked';
  }
};

// get initial results on page load
helper.search();



helper.on('result', (res) => {
  renderContent(res);
  renderFacetList(res);
});


// module.exports = getRestaurants;

module.exports = helper;
