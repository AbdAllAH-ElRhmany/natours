/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
export const login = async (email, password) => {
  // console.log(email, password);
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Logged in Successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 3500);
    }
    // console.log(res);
  } catch (err) {
    // alert(err.response.data.message);
    showAlert('error', err.response.data.message);
    // console.log(err);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
    });

    if (res.data.status === 'success') location.reload(true);
  } catch (err) {
    console.log(err.response.data);
    showAlert('error', 'Error logging out! Try again.');
  }
};
