const helper = require('./search.js');

const searchBox = document.getElementById('search-box');

helper.search();

// TODO - why doesn't this work ???
// let userLocation;
// if ('geolocation' in window.navigator) {
//   /* geolocation is available */
//   window.navigator.geolocation.getCurrentPosition((position) => {
//     // console.log(position.coords.latitude, position.coords.longitude);
//     userLocation = `${(position.coords.latitude).toString()}, ${(position.coords.longitude).toString()}`;
//     // console.log(userLocation);
//     helper.search({
//       aroundLatLng: userLocation,
//       aroundRadius: 1000000,
//     });
//   });
// } else {
//   /* geolocation IS NOT available */
//   helper.search();
// }

// console.log(searchBox);
searchBox.addEventListener('keyup', () => {
  helper.setQuery(searchBox.value)
    .search();
});
