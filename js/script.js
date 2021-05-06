'use strict';

const loginEmail = document.querySelector('#email');
const loginPassword = document.querySelector('#password');
const loginButton = document.getElementById('login-btn');
const errorMessage = document.getElementById('error-message');
const loader = document.querySelector('.loader');

let loginDetails = {};
let loginUrl = 'https://storemanagerapi2.herokuapp.com/api/v2/auth/login';

const loginUser = function () {
  loginDetails.email = loginEmail.value;
  loginDetails.password = loginPassword.value;
  loginButton.style.display = 'none';
  loader.style.display = 'block';

  console.log(loginDetails);

  fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginDetails),
  })
    .then(response => response.json())
    .then(data => {
      loginButton.innerHTML = 'LOG IN';

      console.log('Success:', data);
      if (
        data.message === 'User does not exist.' ||
        data.message === 'Incorrect password.' ||
        data.message === 'Email cannot be blank' ||
        data.message === 'Password cannot be blank'
      ) {
        errorMessage.innerHTML = data.message;
        errorMessage.style.display = 'block';
        loginButton.style.display = 'block';
        loader.style.display = 'none';
      } else if (data.message === 'Log in successful!') {
        errorMessage.style.display = 'none';
        localStorage.setItem('token', data.access_token);
        loginButton.style.display = 'block';
        loader.style.display = 'none';
      } else {
        errorMessage.style.display = 'none';
        loginButton.style.display = 'block';
        loader.style.display = 'none';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      loginButton.style.display = 'block';
      loader.style.display = 'none';
    });
};

const hideError = function () {
  errorMessage.style.display = 'none';
};
