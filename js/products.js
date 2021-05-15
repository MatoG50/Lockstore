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
const addProduct = () => {
  window.location.href = '../UI/add-product.html';
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

// Get products
const productsUrl = 'https://storemanagerapi2.herokuapp.com/api/v2/products';
const totalProducts = document.querySelector('.total-products');
const productname = document.querySelector('.product-name');
const itemsNumber = document.querySelector('.items-no');
const cost = document.querySelector('.k-shs');
const productsContainer = document.querySelector('.product-details');

fetch(productsUrl, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    totalProducts.innerHTML = data.Products.length;
    data.Products.forEach(function (prod) {
      const html = `
        <div class="products-card">
          <img
            id="product-image"
            src="../resources/products.svg"
            alt="products"
          />
          <p class="product-name">${prod.name}</p>
          <p class="inventory">
            <span class="items-no">${prod.inventory}</span> items
          </p>
          <p class="cost">
            Kshs. <span class="k-shs">${prod.price}</span>
          </p>
        </div>
      `;
      productsContainer.insertAdjacentHTML('beforeend', html);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Logout
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('username');
  window.location.href = '../index.html';
};
