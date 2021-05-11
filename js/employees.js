'use strict';

// token

const token = localStorage.getItem('token');
console.log('Token:', token);

// User
const userName = document.querySelector('.user-name');
const userRole = document.querySelector('.user-role');
userName.innerHTML = localStorage.getItem('username');
userRole.innerHTML = localStorage.getItem('role');

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
// if (localStorage.getItem('role') === 'attendant') {
//   document.querySelector('.mobi-photo').innerHTML =
//     '<img src="../resources/MGK.jpg" id="mobi-photo" alt="Admin" />';
// } else {
//   document.querySelector('.mobi-photo').innerHTML =
//     '<img src="../resources/paul.jfif" id="mobi-photo" alt="Admin" />';
// }

const employees = () => {
  window.location.href = '../UI/employees.html';
};

const dashboard = () => {
  window.location.href = '../UI/dashboard.html';
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('username');
  window.location.href = '../UI/index.html';
};
