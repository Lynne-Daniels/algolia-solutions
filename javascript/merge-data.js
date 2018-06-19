const fs = require('fs');
const algoliasearch = require('algoliasearch');

const client = algoliasearch('KKSCWMQ6I2', 'TODO make master code an env variable if needed, only search code can be on web');

const index = client.initIndex('restaurants');


const restaurants = require('./dataset/restaurants_list.json');

fs.readFile('./dataset/restaurants_info.csv', 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }

  // Make a hash table of json data using objectID as key
  const mergedData = restaurants.reduce((acc, val) => {
    acc[val.objectID] = val;
    return acc;
  }, {});

  // convert csv to an array of arrays

  const restaurantStrings = data.split('\n');
  const keys = restaurantStrings[0].split(';');
  const restaurantArrs = restaurantStrings.map(v => v.split(';'));

  // iterate over array adding key/value pairs to objects with same ID (0 is header)

  for (let i = 1; i < restaurantArrs.length; i++) {
    if (mergedData.hasOwnProperty(restaurantArrs[i][0])) { // ObjectID is found in the json data
      for (let j = 1; j < keys.length; j++) {
        mergedData[restaurantArrs[i][0]][keys[j]] = restaurantArrs[i][j];
      }
    }
  }

  // convert hash back to an array of objects

  const uploadData = (Object.keys(mergedData).map(v => mergedData[v]));

  // upload in json format to index -- idk why it won't take more than one at a time.
  for (let item = 0; item < uploadData.length; item++) {
    index.addObjects(uploadData.slice(item, item + 1), (error, content) => {
      if (item % 50 === 0) { console.log('on item ', item); }
      if (error) {
        console.log('ohhhh, no! addObjects says: ', error);
      }
    });
  }

  return console.log('upload complete');
});
