const saveCartItems = (cartList) => localStorage.setItem('cartItems', cartList);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}