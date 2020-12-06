const REGEX_UPPER_LOWER_NUMBER = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[\S]+/;
const xss = require('xss');
const bcrypt = require('bcryptjs');

const UserService = {
  validate(password) {
    if (password.length < 8)
      return 'Password must be 8 characters or more';
    if (password.length > 72)
      return 'Password must be less than 72 characters';
    if (password.startsWith(' ') || password.endsWith(' '))
      return 'Password must not start or end with empoty spaces';
    if (!REGEX_UPPER_LOWER_NUMBER.test(password)) {
      return 'Password must contain an uppercase, lowercase, and number';
    }
    return null;
  },
  getUsers(db) {
    return db
      .select('*')
      .from('users');
  },
  hasUserWithUsername(db, username) {
    return db('users')
      .where({ username })
      .first()
      .then((user) => !!user);
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into('users')
      .returning('*')
      .then(([user]) => user);
  },
  serializeUser(user) {
    return {
      id: user.id,
      username: xss(user.username),
      password: xss(user.password),
    };
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12);
  }
};

module.exports = UserService;