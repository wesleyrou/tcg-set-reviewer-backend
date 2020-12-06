module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres@localhost/tcg-reviewer',
  JWT_SECRET: process.env.JWT_SECRET || 'f69459e9-369f-462c-9add-81cd3055b3a2'
};