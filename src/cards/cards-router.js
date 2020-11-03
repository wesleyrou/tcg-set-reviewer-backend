const express = require('express');
const CardsService = require('../services/cards-service');

const cardsRouter = express.Router();

cardsRouter
  .route('/')
  .post(express.json(), (req,res,next) => {
    const {set} = req.body;
    CardsService.getSet(set)
      .then(cardsObject => {
        CardsService.postSet(req.app.get('db'), cardsObject)
          .then(response => {
            return res.status(201).json(response);
          })
          .catch(next);
      })
      .catch(next);
  });

module.exports = cardsRouter;