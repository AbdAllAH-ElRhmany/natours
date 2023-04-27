// console.log('hello from parcel');
import '@babel/polyfill';
import { login, logout, sign } from './login';
import { updateUserData } from './updateSettings';
import { addReview } from './reviews';
import { bookTour } from './stripe';
import { showAlert } from './alerts';

// DOM ELEMENTS
const locationsDom = document.getElementById('map');

const loginForm = document.querySelector('#loginForm');
const logOutBtn = document.querySelector('.nav__el--logout');
const updateUserForm = document.querySelector('.form-user-data');
const updateUserPassForm = document.querySelector('.form-user-settings');
const bookBtn = document.querySelector('#book_tour');
const addReviewBtn = document.querySelector('#addReviewBtn');
const signForm = document.querySelector('#signForm');

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

if (signForm) {
  signForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    const passwordConfirm = document.getElementById('password-confirm').value;
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const data = {
      name,
      email,
      password,
      passwordConfirm,
    };

    sign(data);
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

const alertMsg = document.querySelector('body').dataset.alert;
if (alertMsg) showAlert('success', alertMsg, 15);

if (addReviewBtn) {
  addReviewBtn.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log(e);
    e.target.addBtn.textContent = 'Processing...';
    const rating = document.querySelector('#rating').value;
    const review = document.querySelector('#review').value;
    const { tour } = e.target.dataset;
    const data = {
      rating,
      review,
      tour,
    };
    console.log(data);
    await addReview(data);
    e.target.addBtn.textContent = 'Add Review';
  });
}
