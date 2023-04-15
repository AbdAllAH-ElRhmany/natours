const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');
const bookingController = require('./../controllers/bookingController');

const router = express.Router();

router.get('/me', authController.protect, viewsController.getAccount);
router.get('/my-tours', authController.protect, viewsController.getMyTours);
router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);
router.use(authController.isLoggedIn);

router.get(
  '/',
  // bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewsController.getOverview
);

router.get(
  '/tour/:tour_slug',
  authController.isLoggedIn,
  viewsController.getTour
);

router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);

// router.get('/', (req, res) =>{
//     res.status(200).render('base', {
//         tour: `${tour.name} Tour`,
//         user: 'Abdallah'
//     })
// })

module.exports = router;
