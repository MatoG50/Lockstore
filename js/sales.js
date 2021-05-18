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

document.querySelector('.sales-col').style.color = '#0984e3';
document.querySelector('.mobi-sales-col').style.color = '#0984e3';

// Get Sales

const salesUrl = 'https://storemanagerapi2.herokuapp.com/api/v2/sales';
const tableContainer = document.getElementById('table');

fetch(salesUrl, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    data.Sales.forEach(sale => {
      const rowHtml = `    <tr class="table-rows">
        <td>${sale.product_name}</td>
        <td>${sale.total_price}</td>
        <td>${sale.quantity}</td>
        <td>${sale.attendant_name}</td>
    </tr>`;
      tableContainer.insertAdjacentHTML('beforeend', rowHtml);
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
