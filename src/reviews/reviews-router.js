const express = require('express');
const ReviewsService = require('./reviews-service');

const reviewsRouter = express.Router();

reviewsRouter
  .route('/:setID') // GET all cards from a set using set-id 
  .post(express.json(), (req, res, next) => {
    const { user_id } = req.body;
    const { setID } = req.params;
    const set_id = setID;
<<<<<<< HEAD
    
    ReviewsService.getMatchingReviews(user_id, set_id, req.app.get('db'))
    .then(matchingReviews => {
        //if no matching review, post review with user_id and set_id
        if(matchingReviews.length === 0) {
            const newReview = {
                user_id,
                set_id
            }
            ReviewsService.postReview(newReview, req.app.get('db'))
            .then(newReview => {
                return res.status(201).json(newReview)
            })
            .catch(next)  
        
        //if user_id and set_id match a review then post nothing return the cardreviews with matching review_id
=======


    ReviewsService.getMatchingReviews(user_id, set_id, req.app.get('db'))
      .then(matchingReviews => {
        //if user_id and set_id match a review then post nothing return the cardreviews with matching review_id
        if (matchingReviews.length === 0) {
          const newReview = {
            user_id,
            set_id
          };
          ReviewsService.postReview(newReview, req.app.get('db'))
            .then(newReview => {
              ReviewsService.postNewCardReviews(newReview, req.app.get('db'))
                .then(cardReviews => {
                  return res.status(201).json(cardReviews);
                })
                .catch(next);
            })
            .catch(next);

          //else post review with user_id and set_id && post empty cardreviews with matching review_id
>>>>>>> 0011a972e1164ece08a9601a10485066224af655
        } else {
          ReviewsService.getCardReviews(matchingReviews[0].id, req.app.get('db'))
            .then(cardReviews => {
              return res.status(200).json(cardReviews);
            })
            .catch(next);
        }
        // console.log(matchingReviews)
      })
      .catch(next);

  });

module.exports = reviewsRouter;