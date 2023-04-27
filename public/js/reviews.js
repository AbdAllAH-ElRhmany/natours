import axios from 'axios';
import { showAlert } from './alerts';

export const addReview = async (data) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/reviews',
      data,
    });

    // console.log(res.data);
    if (res.data.status === 'success') {
      showAlert('success', `Review Added Successfully!`);
      setTimeout(() => {
        location.reload();
      }, 3000);
      return true;
    }
  } catch (err) {
    console.log('error', err);
    showAlert('error', err.response.data.message);
    return false;
  }
};
