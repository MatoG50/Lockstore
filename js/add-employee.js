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

if (localStorage.getItem('role') === 'attendant') {
  document.querySelector('.photo').innerHTML =
    '<img src="../resources/MGK.jpg" id="user-photo-emp" alt="Attendant" />';
} else {
  document.querySelector('.photo').innerHTML =
    '<img src="../resources/paul.jfif" id="user-photo-emp" alt="Admin" />';
}

const employees = () => {
  window.location.href = '../UI/employees.html';
};

const dashboard = () => {
  window.location.href = '../UI/dashboard.html';
};
const addEmployee = () => {
  window.location.href = '../UI/add-employee.html';
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('username');
  window.location.href = '../UI/index.html';
};
