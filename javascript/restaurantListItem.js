// input single search result from algolia
// output html component
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐  ☆☆
const makeListItem = (item) => {
  return (
    `<div class="restaurant">
      <div class="row">
      <div class="left"><img class="list-item"src=${item.image_url} alt=""></div>
      <div class="right">
        <div class="info-line heading">${item.name}</div>
        <div class="info-line">${item.stars_count} ${'⭐'.repeat(Math.floor(item.stars_count))} (${item.reviews_count} reviews)</div>
        <div class="info-line">${item.food_type} | ${item.neighborhood} | ${item.price_range}</div>
    </div>
  </div>
  </div>`
  );
};

module.exports = makeListItem;
