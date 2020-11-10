const express = require('express');
const SetService = require('./set-service');

const setsRouter = express.Router();

setsRouter
  .route('/seed')
  .post(express.json(), (req, res, next) => {
    SetService.seedAllSetCodesFromScryfall(req.app.get('db'))
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(next);
  });

setsRouter
  .route('/update')
  .post(express.json(), (req, res, next) => {
    SetService.postNewSetsFromScryfall(req.app.get('db'))
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(next);
  });

module.exports = setsRouter;