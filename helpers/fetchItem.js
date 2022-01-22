const fetchItem = (itemId) => {
  const url = `https://api.mercadolibre.com/items/${itemId}`;
  return fetch(url)
    .then((response) => response.json())
    .then((itemData) => itemData)
    .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}