// const bcrypt = require('bcrypt-as-promised');
const express = require('express');
// const knex = require('../db/connection');
const rp = require('request-promise');
require('dotenv').config();

const router = express.Router();
const AUTH_URL = process.env.AUTH_URL || 'http://localhost:8080/login';

const checkSession = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    console.log('WE GOT A 401');
    const unauthorized = {
      status: 401,
      message: 'Unauthorized',
    };
    next(unauthorized);
  }
};

router.post('/', (req, res, next) => {
  const { name, password } = req.body;

  if (name === '' || name.trim() === '') {
    res.status(400).json({ error: 'Name must not be blank' });
  } else if (password === '') {
    res.status(400).json({ error: 'Password must not be blank' });
  } else {
    const options = {
      method: 'POST',
      uri: AUTH_URL,
      body: {
        username: name,
        password,
      },
      json: true,
      transform: (body, response) => { // eslint-disable-line arrow-body-style
        return { headers: response.headers, data: body };
      },
    };
    rp(options).then((response) => {
      req.session.token = response.headers.authorization;
      req.session.userId = response.headers.userid;
      req.session.username = response.headers.username;
      req.session.firstName = response.headers.firstname;
      res.status(200).json({});
    })
    .catch((err) => {
      next(err);
    });
  }
});

module.exports = { router, checkSession };
