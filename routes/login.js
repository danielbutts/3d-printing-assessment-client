const express = require('express')
const rp = require('request-promise');
require('dotenv').config();

const router = express.Router();
const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';

router.post('/', (req, res, next) => {
  const { username, password } = req.body.login;

  if (username === '' || username.trim() === '') {
    res.status(400).json({ error: 'Name must not be blank' });
  } else if (password === '') {
    res.status(400).json({ error: 'Password must not be blank' });
  } else {
    const options = {
      method: 'POST',
      uri: `${BASE_URL}/login`,
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
      res.status(200).json({
        token: response.headers.authorization,
        userId: response.headers.userid,
        username: response.headers.username,
        firstName: response.headers.firstname
      });
    })
    .catch((err) => {
      next(err);
    });
  }})

module.exports = router
