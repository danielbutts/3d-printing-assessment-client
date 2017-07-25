const express = require('express');
const jwt = require('jwt-simple');
const rp = require('request-promise');
const authUtils = require('../utils/auth-utils');
require('dotenv').config();

const router = express.Router();
const API_URL = process.env.API_URL; // e.g. 'http://localhost:8080';
const JWT_SECRET = process.env.JWT_SECRET; // e.g. 'TH1s_is_4-S3cret!';

router.post('/', (req, res, next) => {
  const { username, password } = req.body.login;

  if (username === '' || username.trim() === '') {
    res.status(400).json({ error: 'Name must not be blank' });
  } else if (password === '') {
    res.status(400).json({ error: 'Password must not be blank' });
  } else {
    const options = {
      method: 'POST',
      uri: `${API_URL}/login`,
      body: {
        username,
        password,
      },
      json: true,
      transform: (body, response) => { // eslint-disable-line arrow-body-style
        return { headers: response.headers, data: body };
      },
    };
    rp(options).then((response) => {
      const authorizedUser = {
        token: response.headers.authorization,
        userId: response.headers.userid,
        isAdmin: response.headers.isadmin,
      };

      const clientToken = jwt.encode(authorizedUser, JWT_SECRET);

      res.status(200).json({
        token: clientToken,
        username: response.headers.username,
        userId: response.headers.userid,
        isAdmin: response.headers.isadmin,
      });
    })
    .catch((err) => {
      next(err);
    });
  }
});

router.get('/validate', authUtils.validateToken, (req, res) => {
  if (req.token === undefined) {
    res.status(400).json({ error: 'Token must not be blank' });
  } else {
    res.status(200).json({
      token: req.token,
      userId: req.userId,
      admin: req.isAdmin,
    });
  }
});

module.exports = router;
