// console.log('hello from parcel');
import '@babel/polyfill';
import { login, logout } from './login';
import { updateUserData } from './updateSettings';
import { bookTour } from './stripe';

// DOM ELEMENTS
const locationsDom = document.getElementById('map');

const loginForm = document.querySelector('#loginForm');
const logOutBtn = document.querySelector('.nav__el--logout');
const updateUserForm = document.querySelector('.form-user-data');
const updateUserPassForm = document.querySelector('.form-user-settings');
const bookBtn = document.querySelector('#book_tour');

// VALUES

if (locationsDom) {
  const locations = JSON.parse(
    document.getElementById('map').dataset.locations
  );
  // console.log(locations);

  locations;
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // console.log(password);
    login(email, password);
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (updateUserForm) {
  updateUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    // console.log(document.getElementById('photo').files);
    form.append('photo', document.getElementById('photo').files[0]);
    // const name = document.getElementById('name').value;
    // const email = document.getElementById('email').value;
    // const data = {
    //   name,
    //   email,
    // };
    // updateUserData(data, 'data');
    // console.log(document.getElementById('photo').files[0].name);
    updateUserData(form, 'data');
  });
}

if (updateUserPassForm) {
  updateUserPassForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    document.getElementById('savePassBtn').textContent = 'Updateing...';

    const currentPassword = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    const data = {
      currentPassword,
      password,
      passwordConfirm,
    };
    await updateUserData(data, 'password');

    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
    document.getElementById('savePassBtn').textContent = 'Save Password';
  });
}

if (bookBtn) {
  bookBtn.addEventListener('click', (e) => {
    // const tourId = e.target.dataset.tourId
    e.target.textContent = 'Processing...';
    const { tourid } = e.target.dataset;
    bookTour(tourid);
  });
}
