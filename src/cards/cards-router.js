const express = require('express');
const CardsService = require('./cards-service');
const SetService = require('../sets/set-service');
const { format } = require('morgan');

const cardsRouter = express.Router();

// TODO: update - post
//    go through sets array
//    grab all sets where date is >= today's date
//    pull card data from scryfall for that set
//    post the card data from that set to our db

cardsRouter
  .route('/:setCode') // GET all cards from a set using set-id 
  .get(express.json(), (req, res, next) => {
    const { setCode } = req.params;

    SetService.getSetId(req.app.get('db'), setCode)
      .then(setID => {   
        CardsService.getCards(req.app.get('db'), setID)
          .then(allCards => {
            res.status(200).json(allCards);
          })
          .catch(next); 
      })
      .catch(next)
  })
  .post(express.json(), (req, res, next) => {
    const { setCode } = req.params;

    SetService.getSetId(req.app.get('db'), setCode)
      .then(setID => {        
        CardsService.getCardsFromScryfall(setCode, setID)
          .then(formattedCards => {            
            CardsService.postCards(req.app.get('db'), formattedCards)
              .then(postedCards => {                
                return res.status(201).json(postedCards)
              })
              .catch(next);
          })
          .catch(next);
      })
      .catch(next);
  })  

module.exports = cardsRouter;