const express = require('express');
const UserService = require('./users-service');

const userRouter = express.Router();
const jsonBodyParser = express.json();

userRouter
  .route('/')
  .get((req, res, next) => {
    UserService.getUsers(req.app.get('db'))
      .then(users =>
        res.status(200).json(users)
      )
      .catch(next);
  })
  .post(jsonBodyParser, (req, res, next) => {
    let { username, password } = req.body;

    username = username.toLowerCase();

    for (const field of ['username', 'password'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field} in request body`,
        });

    const passwordError = UserService.validatePassword(password);
    if (passwordError)
      return res.status(400).json({ error: passwordError });
    UserService.hasUserWithUsername(req.app.get('db'), username)
      .then((hasUserWithUsername) => {
        if (hasUserWithUsername)
          return res.status(400).json({ error: 'Username taken' });

        return UserService.hashPassword(password)
          .then((hashedPassword) => {
            const newUser = {
              username,
              password: hashedPassword
            };

            return UserService.insertUser(req.app.get('db'), newUser).then(
              (user) => {
                res.status(201)
                  .json(UserService.sericalizeUser(user));
              }
            );
          });
      }).catch(next);

  });

module.exports = userRouter;