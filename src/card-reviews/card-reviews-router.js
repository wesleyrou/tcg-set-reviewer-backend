const express = require('express');
const { updateCardReviews } = require('./card-reviews-service');

const cardReviewsRouter = express.Router();

cardReviewsRouter
  .route('/') 
  .patch(express.json(), (req, res, next) => {
    const {cardReviews} = req.body    

    //NEED TO FIGURE OUT HOW TO BATCH UPDATE RATINGS
    updateCardReviews(req.app.get('db'),cardReviews)
    .then((message) => {
        return res.status(201).json(message)
    })
  })

module.exports = cardReviewsRouter;