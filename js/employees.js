'use strict';

// token

const token = localStorage.getItem('token');
console.log('Token:', token);

// Employees
const employeesUrl = 'https://storemanagerapi2.herokuapp.com/api/v2/users';
const totalEmployees = document.querySelector('.total-employees');
const attendants = document.querySelector('.att-span');
const admins = document.querySelector('.admin-span');
const employeesContainer = document.querySelector('.employee-details');
const mobiUserName = document.querySelector('.mobi-user-name');
const mobiUserRole = document.querySelector('.mobi-user-role');
mobiUserName.innerHTML = localStorage.getItem('username');
mobiUserRole.innerHTML = localStorage.getItem('role');

fetch(employeesUrl, {
  method: 'GET', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    totalEmployees.innerHTML = data.users.length;
    const attendantTotals = data.users.filter(cur => cur.role === 'attendant');
    attendants.innerHTML = attendantTotals.length;
    const adminTotals = data.users.filter(cur => cur.role === 'admin');
    admins.innerHTML = adminTotals.length;
    data.users.forEach(function (usr) {
      const userPhoto =
        usr.username === 'PaulVitalis'
          ? '<img src="../resources/paul.jfif" alt="user-image" id="user-image">'
          : '<img src="../resources/user.svg" alt="user-image" id="user-image">';
      const html = ` <div class="employee-card">
      ${userPhoto}
      <p class="employee-card-name">${usr.username}</p>
      <P class="employee-card-role">${usr.role}</P>
  </div>`;
      employeesContainer.insertAdjacentHTML('beforeend', html);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

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
if (localStorage.getItem('role') === 'attendant') {
  document.querySelector('.mobi-photo').innerHTML =
    '<img src="../resources/MGK.jpg" id="mobi-photo" alt="Admin" />';
} else {
  document.querySelector('.mobi-photo').innerHTML =
    '<img src="../resources/paul.jfif" id="mobi-photo" alt="Admin" />';
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

document.querySelector('.emp-col').style.color = '#0984e3';
document.querySelector('.mobi-col').style.color = '#0984e3';

/* width of the sidebar*/
function openNav() {
  document.getElementById('mySidepanel').style.width = '250px';
}

function closeNav() {
  document.getElementById('mySidepanel').style.width = '0';
}

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('username');
  window.location.href = '../UI/index.html';
};
