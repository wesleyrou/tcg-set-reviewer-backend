const express = require('express');
const CardsService = require('./cards-service');
const SetService = require('../sets/set-service');

const cardsRouter = express.Router();

// seed - post
//    go through sets array
//    pull card data from scryfall for that set
//    post the card data from that set to our db

// update - post
//    go through sets array
//    grab all sets where date is >= today's date
//    pull card data from scryfall for that set
//    post the card data from that set to our db

cardsRouter
  .route('/seed')
  .post(express.json(), (req, res, next) => {
    let allCards = [];    

    // const sleep = ms => {
    //   return new Promise(resolve => setTimeout(resolve, ms));
    // };

    // SetService.getAllSets(req.app.get('db'))
    //   .then(setData => {

    // need to make this promise work to wait for all getCards calls to finish before posting cards to DB
    // https://flaviocopes.com/javascript-async-await-array-map/

    // for(let i = 0; i < setData.length; i++){
    //   CardsService.getCards(set.code, set.id)
    //         .then(cardsObject => {
    //           allCards.push(cardsObject);
    //         })
    //         .catch(next);
    // }
    //   setData.forEach((set,index) => {
    //     return sleep(100*index)
    //       .then(() => {
    //         CardsService.getCards(set.code, set.id)
    //           .then(cardsObject => {
    //             allCards.push(cardsObject);
    //           })
    //           .catch(next);
    //       });
    //   });
    // })
    // .then(() => {
    //   CardsService.postCards(req.app.get('db'), allCards)
    //     .then((cardSet) => {
    //       return res.status(201).json(cardSet);
    //     })
    //     .catch(next);          
    // });
    // .catch(next);
  });

module.exports = cardsRouter;