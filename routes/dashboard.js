const express = require('express');
const rp = require('request-promise');
const checkSession = require('./session').checkSession;

const router = express.Router();
const BASE_URL = process.env.BASE_URL || 'http://localhost:8080/';

router.use(checkSession);

router.get('/', (req, res, next) => {
  let username = '';
  if (req.session !== undefined) {
    username = req.session.username;
  }

  const options = {
    uri: `${BASE_URL}parts`,
    headers: {
      authorization: req.session.token,
    },
    json: true,
  };

  rp(options).then((response) => {
    res.render('pages/dashboard', { parts: response, username });
  })
  .catch((err) => {
    next(err);
  });
});

module.exports = router;
