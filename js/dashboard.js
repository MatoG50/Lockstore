'use strict';
const userName = document.querySelector('.user-name');
const userRole = document.querySelector('.user-role');
const mobiUserName = document.querySelector('.mobi-user-name');
const mobiUserRole = document.querySelector('.mobi-user-role');
const firstName = document.querySelector('.first-name');
const totalProducts = document.getElementById('total-products');
const totalemployees = document.getElementById('total-employees');
const salesPerformance = document.getElementById('sales-performance');
const todaysDate = new Date().toDateString();
const date = document.querySelector('.date');
const productsUrl = 'https://storemanagerapi2.herokuapp.com/api/v2/products';
const usersUrl = 'https://storemanagerapi2.herokuapp.com/api/v2/users';
const salesUrl = 'https://storemanagerapi2.herokuapp.com/api/v2/sales';

userName.innerHTML = localStorage.getItem('username');
userRole.innerHTML = localStorage.getItem('role');
mobiUserName.innerHTML = localStorage.getItem('username');
mobiUserRole.innerHTML = localStorage.getItem('role');

firstName.innerHTML = localStorage.getItem('username');
date.innerHTML = todaysDate;

const token = localStorage.getItem('token');
console.log('Token:', token);

if (!token) {
  window.location.href = '../index.html';
} else {
  fetch(productsUrl, {
    method: 'GET', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      totalProducts.innerHTML = data.Products.length;
    })
    .catch(error => {
      console.error('Error:', error);
    });

  fetch(usersUrl, {
    method: 'GET', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      totalemployees.innerHTML = data.users.length;
    })
    .catch(error => {
      console.error('Error:', error);
    });
  fetch(salesUrl, {
    method: 'GET', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      salesPerformance.innerHTML = `${data.Sales.length}%`;
    })
    .catch(error => {
      console.error('Error:', error);
    });

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
}

/* width of the sidebar*/
function openNav() {
  document.getElementById('mySidepanel').style.width = '250px';
}

function closeNav() {
  document.getElementById('mySidepanel').style.width = '0';
}

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

document.querySelector('.dash-col').style.color = '#0984e3';
document.querySelector('.mobi-col').style.color = '#0984e3';

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('username');
  window.location.href = '../index.html';
};
