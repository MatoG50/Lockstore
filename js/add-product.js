'use strict';
// token

const token = localStorage.getItem('token');
console.log('Token:', token);

// Date
const todaysDate = new Date().toDateString();
const date = document.querySelector('.date');
date.innerHTML = todaysDate;

// Image

if (localStorage.getItem('role') === 'attendant') {
  document.querySelector('.photo').innerHTML =
    '<img src="../resources/MGK.jpg" id="user-photo" alt="Attendant" />';
} else {
  document.querySelector('.photo').innerHTML =
    '<img src="../resources/paul.jfif" id="user-photo" alt="Admin" />';
}
if (localStorage.getItem('role') === 'attendant') {
  document.querySelector('.mobi-photo').innerHTML =
    '<img src="../resources/MGK.jpg" id="mobi-photo" alt="Admin" />';
} else {
  document.querySelector('.mobi-photo').innerHTML =
    '<img src="../resources/paul.jfif" id="mobi-photo" alt="Admin" />';
}

// User
const userName = document.querySelector('.user-name');
const userRole = document.querySelector('.user-role');
userName.innerHTML = localStorage.getItem('username');
userRole.innerHTML = localStorage.getItem('role');

// Links
const employees = () => {
  window.location.href = '../UI/employees.html';
};

const dashboard = () => {
  window.location.href = '../UI/dashboard.html';
};

const products = () => {
  window.location.href = '../UI/products.html';
};
const sales = () => {
  window.location.href = '../UI/sales.html';
};

/* width of the sidebar*/
function openNav() {
  document.getElementById('mySidepanel').style.width = '250px';
}

function closeNav() {
  document.getElementById('mySidepanel').style.width = '0';
}

document.querySelector('.pro-col').style.color = '#0984e3';
document.querySelector('.pro-mobi-col').style.color = '#0984e3';

// Adding product

const productName = document.getElementById('product-name');
const productInventory = document.getElementById('inventory');
const productPrice = document.getElementById('price');
const productStock = document.getElementById('min-stock');
const productCategory = document.getElementById('category');
const errorMessage = document.getElementById('error-message');

let addProductDetails = {};
const addproductUrl = 'https://storemanagerapi2.herokuapp.com/api/v2/products';

// Modal
const modal = document.getElementById('myModal');
const main = document.querySelector('.main');
const addproductForm = document.querySelector('.add-product-div');
const ProductForm = document.querySelector('.add-product-form');
const modalProductName = document.querySelector('.prod-name');
const modalInventory = document.querySelector('.s-inv');
const modalPrice = document.querySelector('.s-price');
const modalMinStock = document.querySelector('.s-min-stock');

const addProduct = function () {
  addProductDetails.name = productName.value;
  addProductDetails.price = productPrice.value;
  addProductDetails.inventory = productInventory.value;
  addProductDetails.minimum_stock = productStock.value;
  addProductDetails.category = productCategory.value;
  console.log(addProductDetails);

  fetch(addproductUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(addProductDetails),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);

      if (data.message.price === ' Product price cannot be blank or a word') {
        errorMessage.innerHTML = data.message.price;
        errorMessage.style.display = 'block';
      } else if (
        data.message ===
          'You do not have authorization to access this feature' ||
        data.message === 'Please put a product name and a category.'
      ) {
        errorMessage.innerHTML = data.message;
        errorMessage.style.display = 'block';
      } else if (data.message.inventory === 'Define available stock') {
        errorMessage.innerHTML = data.message.inventory;
        errorMessage.style.display = 'block';
      } else if (data.message.minimum_stock === 'Define minimum stock') {
        errorMessage.innerHTML = data.message.minimum_stock;
        errorMessage.style.display = 'block';
      } else if (data.message === 'Product created successfully') {
        modal.style.display = 'block';
        main.style.backgroundColor = 'rgba(0,0,0,0.4)';
        addproductForm.style.display = 'none';
        modalProductName.innerHTML = addProductDetails.name;
        modalInventory.innerHTML = addProductDetails.inventory;
        modalPrice.innerHTML = addProductDetails.price;
        modalMinStock.innerHTML = addProductDetails.minimum_stock;
        errorMessage.style.display = 'none';
      } else {
        errorMessage.style.display = 'none';
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
};
const closeModal = function () {
  modal.style.display = 'none';
  addproductForm.style.display = 'block';
  productName.value = '';
  productInventory.value = '';
  productPrice.value = '';
  productStock.value = '';
  productCategory.value = '';
};

const hideError = function () {
  errorMessage.style.display = 'none';
};

const goToproducts = function () {
  window.location.href = '../UI/products.html';
};

// Logout
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('username');
  window.location.href = '../index.html';
};
