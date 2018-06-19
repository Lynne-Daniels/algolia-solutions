const algoliasearch = require('algoliasearch');

const client = algoliasearch('KKSCWMQ6I2', '2eaa1ac22c890a799a97628d8d868710');
const index = client.initIndex('restaurants');

// const findParis = index.search('paris', (err, content) => {
//   console.log(content);
// });

const getRestaurants = (searchTerm, domElement) => {
  index.search(searchTerm, (err, content) => {
    domElement.innerHTML = JSON.stringify(content.hits);
    console.log(content);
  });
};

module.exports = getRestaurants;
