const algoliasearch = require('algoliasearch');

const client = algoliasearch('KKSCWMQ6I2', '2eaa1ac22c890a799a97628d8d868710');
const index = client.initIndex('restaurants');

index.search('paris', (err, content) => {
  console.log(content);
});
