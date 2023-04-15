import axios from 'axios';
import { showAlert } from './alerts';

export const updateUserData = async (data, type) => {
  const url =
    type === 'password'
      ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword'
      : 'http://127.0.0.1:3000/api/v1/users/updateMe';
  // console.log(data);
  try {
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} Updated Successfully!`);
      window.setTimeout(() => {
        // location.reload();
      }, 3500);
    }
    // console.log(res);
  } catch (err) {
    showAlert('error', err.response.data.message);
    console.log('error', err.response.data.message);
  }
};
