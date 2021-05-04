'use strict';

const loginButton = document.querySelector('.login-btn');
const loginEmail = document.querySelector('#email');
const loginPassword = document.querySelector('#password');

let loginDetails = {};

loginButton.addEventListener('click', function () {
  loginDetails.email = loginEmail.value;
  loginDetails.password = loginPassword.value;

  console.log(loginDetails);
});
