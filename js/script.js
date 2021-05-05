'use strict';

const loginEmail = document.querySelector('#email');
const loginPassword = document.querySelector('#password');
const loginButton = document.getElementById('login-btn');
const errorMessage = document.getElementById('error-message');

let loginDetails = {};
let loginUrl = 'https://storemanagerapi2.herokuapp.com/api/v2/auth/login';

const loginUser = function () {
  loginDetails.email = loginEmail.value;
  loginDetails.password = loginPassword.value;
  loginButton.innerHTML = 'LOGGING IN...';

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
      } else if (data.message === 'Log in successful!') {
        errorMessage.style.display = 'none';
        localStorage.setItem('token', data.access_token);
      } else {
        errorMessage.style.display = 'none';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      loginButton.innerHTML = 'LOG IN';
    });
};
