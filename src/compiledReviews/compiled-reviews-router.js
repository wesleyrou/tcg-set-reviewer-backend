const express = require('express');
const { getSetId } = require('../sets/set-service');
const { getAllReviewsOfSet } = require('./compiled-reviews-service');

const compiledReviewsRouter = express.Router();

compiledReviewsRouter
  .route('/:setCode') 
  .get((req, res, next) => {
    const {setCode} = req.params;
    
    getSetId(req.app.get('db'),setCode)
      .then((setId) =>{
        getAllReviewsOfSet(req.app.get('db'),setId)
          .then((reviews) => {
            return res.status(200).json(reviews)
          })
      })
      .catch(err => console.log(err))

    
  })

module.exports = compiledReviewsRouter;