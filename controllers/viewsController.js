const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Review = require('../models/reviewModel');

exports.getOverview = catchAsync(async (req, res) => {
  // 1) Get tout data from collection
  const tours = await Tour.find();

  // 2) Build template

  // 3) Render that template using tour data from 1)
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

const checkLogin = async (req, res, tour) => {
  if (res.locals.user) {
    const booking = await Booking.findOne({
      tour,
      user: res.locals.user.id,
    });
    if (booking) {
      return true;
    }
    return false;
  }
  return false;
};

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get the data from the requested tour including reviews and guides
  const tour = await Tour.findOne({ slug: req.params.tour_slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });
  // console.log(tour);

  // 2) Build template

  // 3) Render template using data from 1)

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }
  const isBooked = await checkLogin(req, res, tour.id);
  res.status(200).render('tour', {
    title: `${tour.name} tour`,
    tour,
    isBooked,
  });
});

exports.getLoginForm = catchAsync(async (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
});

exports.getSignForm = catchAsync(async (req, res) => {
  res.status(200).render('signup', {
    title: 'Sign up ',
  });
});

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

exports.updateUserData = catchAsync(async (req, res, next) => {
  // console.log(req.body);
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser,
  });
});

exports.getMyTours = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id });
  const toursIds = bookings.map((el) => el.tour._id);
  const tours = await Tour.find({ _id: { $in: toursIds } });
  // console.log(tours);
  res.status(200).render('overview', {
    title: 'My Tours',
    tours,
  });
});

exports.alerts = (req, res, next) => {
  const { alert } = req.query;

  if (alert === 'booking')
    res.locals.alert =
      "Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up here immediatly, please come back later.";

  next();
};

exports.getMyReveiws = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ user: req.user.id });
  const toursIds = reviews.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: toursIds } });

  res.status(200).render('overview', {
    title: 'My Reviews',
    tours,
    reviews: true,
  });
});
