const itemCart = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');
const clearCart = document.querySelector('.empty-cart');

const uploadTotalAmount = () => {
  const itensCart = document.querySelectorAll('.cart__item');
  const total = [...itensCart].reduce((acc, itemLi) => {
    const itemPrice = parseFloat(itemLi.innerHTML.split('$')[1]);
    return acc + itemPrice;
  }, 0);
  totalPrice.innerHTML = total;
};

const clearCartList = () => {
  const itensListCart = document.querySelectorAll('.cart ol li');
  itensListCart.forEach((item) => item.remove());
  uploadTotalAmount();
  saveCartItems(itemCart.innerHTML);
};

clearCart.addEventListener('click', clearCartList);

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
   event.target.remove();
   uploadTotalAmount();
   saveCartItems(itemCart.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addToCart = async (event) => {
  const elementId = getSkuFromProductItem(event.target.parentElement);
  const { id: sku, title: name, price: salePrice } = await fetchItem(elementId);
  itemCart.appendChild(createCartItemElement({ sku, name, salePrice }));
  uploadTotalAmount();
  saveCartItems(itemCart.innerHTML);
};

const uploadingCartItems = () => {
  itemCart.innerHTML = getSavedCartItems();
  const allCartItems = document.querySelectorAll('.cart__item');
  allCartItems.forEach((itemLi) => itemLi.addEventListener('click', cartItemClickListener));
  uploadTotalAmount();
};

const initialRenderization = async () => {
  const listProducts = await fetchProducts('computador');
  if (listProducts) document.querySelector('.loading').remove();
  
  const { results } = listProducts;
  results.forEach((productItem) => {
    const { id: sku, title: name, thumbnail: image } = productItem;
    const itemsSection = document.querySelector('.items');
    itemsSection.appendChild(createProductItemElement({ sku, name, image }));

    const buttonAdd = document.querySelectorAll('.item__add');
    buttonAdd.forEach((btn) => btn.addEventListener('click', addToCart));
  });
};

const loadingFetch = () => {
  const loading = createCustomElement('p', 'loading', 'carregando...');
  const itemsSection = document.querySelector('.items');
  itemsSection.appendChild(loading);
};

window.onload = () => { 
  loadingFetch();
  initialRenderization();
  uploadingCartItems();
};