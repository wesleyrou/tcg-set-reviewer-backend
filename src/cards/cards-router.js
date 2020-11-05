const express = require('express');
const CardsService = require('./cards-service');
const SetService = require('../sets/set-service');

const cardsRouter = express.Router();

cardsRouter
  .route('/')
  .post(express.json(), (req, res, next) => {
    const { setCode } = req.body;
    SetService.getSetId(req.app.get('db'), setCode)
      .then(id => {
        if (id) {
          // CardsService.getCards(setCode, setData.id)
          //   .then(cardsObject => {
          //     CardsService.updateCards(req.app.get('db'), cardsObject)
          //       .then(response => {
          //         return res.status(201).json(response);
          //       })
          //       .catch(next);
          //   })
          //   .catch(next);
        } else {
          SetService.postSet(req.app.get('db'), setCode)
            .then(setData => {
              CardsService.getCards(setCode, setData.id)
                .then(cardsObject => {
                  CardsService.postCards(req.app.get('db'), cardsObject)
                    .then(response => {
                      return res.status(201).json(response);
                    })
                    .catch(next);
                })
                .catch(next);
            });
        }
      });

  });

module.exports = cardsRouter;