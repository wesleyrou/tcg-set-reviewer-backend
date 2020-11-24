const express = require('express');
const CardsService = require('./cards-service');
const SetService = require('../sets/set-service');

const cardsRouter = express.Router();

// TODO: update - post
//    go through sets array
//    grab all sets where date is >= today's date
//    pull card data from scryfall for that set
//    post the card data from that set to our db

cardsRouter
  .route('/:setID') // GET all cards from a set using set-id 
  .get(express.json(), (req, res, next) => {
    const { setID } = req.params;

    CardsService.getCards(req.app.get('db'), setID)
      .then(allCards => {
        res.status(200).json(allCards);
      })
      .catch(next);
  });

module.exports = cardsRouter;