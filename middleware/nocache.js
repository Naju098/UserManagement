// middleware/nocache.js

module.exports = (req, res, next) => {
  try {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
  } catch (error) {
    console.log(error.message);
    next();
  }
};
