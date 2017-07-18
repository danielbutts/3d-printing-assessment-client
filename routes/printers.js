const express = require('express');
const rp = require('request-promise');
const authUtils = require('../utils/auth-utils');

const router = express.Router();
const API_URL = process.env.API_URL; // e.g. 'http://localhost:8080'

router.get('/', authUtils.validateToken, (req, res, next) => {
  const options = {
    method: 'GET',
    uri: `${API_URL}/printers/`,
    headers: {
      authorization: req.token,
    },
    json: true,
  };
  rp(options).then((result) => {
    res.status(200).json(result);
  })
  .catch((err) => {
    next(err);
  });
});


module.exports = router;
