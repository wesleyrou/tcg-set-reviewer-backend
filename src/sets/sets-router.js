const express = require('express');
const SetService = require('./set-service');

const setsRouter = express.Router();

setsRouter
  .route('/')
  .post(express.json(), (req, res, next) => {
    SetService.postAllSetCodesFromScryfall(req.app.get('db'))
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(next);
  });

module.exports = setsRouter;