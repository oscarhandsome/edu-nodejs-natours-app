/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51MrdrXGlGDCxkCpNlVQPP9Zr8yC4vRYhqSocEDRcrlNwoWvyu0fzpOtery1uIgcHmW0VytTzpehZHUeA0W8lNRaX00oAWSEyUU'
);

export const bookTour = async tourId => {
  try {
    // 1) Get chechout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create checkout from + charge creadit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (error) {
    showAlert('error', err);
  }
};
