/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const cardsRouter = require('./cards/cards-router');
const setsRouter = require('./sets/sets-router');
const reviewsRouter = require('./reviews/reviews-router');
const cardReviewsRouter = require('./card-reviews/card-reviews-router');
const compiledReviewsRouter = require('./compiledReviews/compiled-reviews-router');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use('/api/cards', cardsRouter);
app.use('/api/sets', setsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/cardReviews', cardReviewsRouter);
app.use('/api/compiledReviews', compiledReviewsRouter);



// eslint-disable-next-line no-unused-vars
app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;