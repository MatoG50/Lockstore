'use strict';
const userName = document.querySelector('.user-name');
const userRole = document.querySelector('.user-role');
const firstName = document.querySelector('.first-name');
const totalProducts = document.getElementById('total-products');
const totalemployees = document.getElementById('total-employees');
const todaysDate = new Date().toDateString();
const date = document.querySelector('.date');
const productsUrl = 'https://storemanagerapi2.herokuapp.com/api/v2/products';
const usersUrl = 'https://storemanagerapi2.herokuapp.com/api/v2/users';

userName.innerHTML = localStorage.getItem('username');
userRole.innerHTML = localStorage.getItem('role');

firstName.innerHTML = localStorage.getItem('username');
date.innerHTML = todaysDate;

const token = localStorage.getItem('token');
console.log('Token:', token);

if (!token) {
  window.location.href = '../UI/index.html';
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

  if (localStorage.getItem('role') === 'attendant') {
    document.querySelector('.photo').innerHTML =
      '<img src="../resources/MGK.jpg" id="user-photo" alt="Attendant" />';
  } else {
    document.querySelector('.photo').innerHTML =
      '<img src="../resources/paul.jfif" id="user-photo" alt="Admin" />';
  }
}

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('username');
  window.location.href = '../UI/index.html';
};
