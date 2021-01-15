const express = require('express');
const { updateCardReviews } = require('./card-reviews-service');

const cardReviewsRouter = express.Router();

cardReviewsRouter
  .route('/') 
  .patch(express.json(), (req, res, next) => {
    const {cardReviews, currentReview} = req.body    
    console.log('hereeee',cardReviews, currentReview)

    //NEED TO FIGURE OUT HOW TO BATCH UPDATE RATINGS
    updateCardReviews(req.app.get('db'), cardReviews, currentReview)
    .then((message) => {
        return res.status(201).json(message)
    })
  })

module.exports = cardReviewsRouter;