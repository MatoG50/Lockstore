'use strict';

// token

const token = localStorage.getItem('token');
console.log('Token:', token);
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

document.querySelector('.em-col').style.color = '#0984e3';
document.querySelector('.mob-col').style.color = '#0984e3';

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

/* width of the sidebar*/
function openNav() {
  document.getElementById('mySidepanel').style.width = '250px';
}

function closeNav() {
  document.getElementById('mySidepanel').style.width = '0';
}

// Adding Employee
const newUserName = document.getElementById('username');
const newUserEmail = document.getElementById('emp-email');
const newPassword = document.getElementById('emp-password');
const newUserPassword = document.getElementById('emp-confirm-password');
const newUserRole = document.getElementById('role');
const errorMessage = document.getElementById('error-message');

let addEmployeeDetails = {};
let signUpUrl = 'https://storemanagerapi2.herokuapp.com/api/v2/auth/signup';

// Modal
const modal = document.getElementById('myModal');
const main = document.querySelector('.main');
const addEmployeeForm = document.querySelector('.add-employee-div');
const employeeForm = document.querySelector('.add-employee-form');
const modalUsername = document.querySelector('.s-usn');
const modalEmail = document.querySelector('.s-em');
const modalRole = document.querySelector('.s-rol');

errorMessage.innerHTML = '';
errorMessage.style.display = 'none';
const signUp = function () {
  addEmployeeDetails.username = newUserName.value;
  addEmployeeDetails.email = newUserEmail.value;
  addEmployeeDetails.password = newPassword.value;

  addEmployeeDetails.role = newUserRole.value;
  if (newPassword.value !== newUserPassword.value) {
    errorMessage.innerHTML = 'Passwords do not match';
    errorMessage.style.display = 'block';

    return;
  }

  console.log(addEmployeeDetails);

  fetch(signUpUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(addEmployeeDetails),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      if (
        data.message === 'Username cannot be blank.' ||
        data.message ===
          'You do not have authorization to access this feature.' ||
        data.message ===
          "Please insert a role of 'attendant' or an 'admin' only." ||
        data.message ===
          'Please use a valid email and ensure the password exceeds 6 characters.' ||
        data.message === 'Password cannot be blank'
      ) {
        errorMessage.innerHTML = data.message;
        errorMessage.style.display = 'block';
      } else if (data.message === 'User created successfully') {
        modal.style.display = 'block';
        main.style.backgroundColor = 'rgba(0,0,0,0.4)';
        addEmployeeForm.style.display = 'none';
        modalUsername.innerHTML = addEmployeeDetails.username;
        modalEmail.innerHTML = addEmployeeDetails.email;
        modalRole.innerHTML = addEmployeeDetails.role;
        errorMessage.style.display = 'none';
      } else {
        errorMessage.style.display = 'none';
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

const hideError = function () {
  errorMessage.style.display = 'none';
};

const closeModal = function () {
  modal.style.display = 'none';
  addEmployeeForm.style.display = 'block';
  newUserName.value = '';
  newUserEmail.value = '';
  newPassword.value = '';
  newUserPassword.value = '';
  newUserRole.value = '';
};

const goToEmployees = function () {
  window.location.href = '../UI/employees.html';
};
