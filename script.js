'use strict';

const loginEmail = document.querySelector('#email');
const loginPassword = document.querySelector('#password');

let loginDetails = {};
let loginUrl = 'https://storemanagerapi2.herokuapp.com/api/v2/auth/login';

const loginUser = function () {
  loginDetails.email = loginEmail.value;
  loginDetails.password = loginPassword.value;

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
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
};
