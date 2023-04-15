import axios from 'axios';
// const stripe = Stripe(
//   'pk_test_51MwIycLCpTcIBdnT1Fz2ecKCbXtGRby4ww1LGP00AJ01jzPtXxfm63NKGlZFymZI109jIplEH3snE02cv1e4ifod00iKYCmR1B'
// );
// import axios from 'axios';
import { showAlert } from './alerts';
// const stripe = Stripe('pk_test_BUkd0ZXAj6m0q0jMyRgBxNns00PPtgvjjr');

export const bookTour = async (tourId) => {
  // 1) Get checkout session from API
  console.log(tourId);
  try {
    const session = await axios({
      method: 'GET',
      url: `/api/v1/bookings/checkout-session/${tourId}`,
    });
    // console.log(session.data.session.url);
    // 2) Create checkout form + charge credit card
    location.assign(session.data.session.url);
  } catch (error) {
    showAlert('error', err.response.data.message);
  }
};
