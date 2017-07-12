const express = require('express');
const checkSession = require('./session').checkSession;
const rp = require('request-promise');

const BASE_URL = process.env.BASE_URL || 'http://localhost:8080/';
const router = express.Router();

router.post('/register', (req, res, next) => {
  const { firstName, lastName, username, password, company, email, zipCode } = req.body;
  if (username === '') {
    res.status(400).json({ error: 'Missing required parameter \'username\'.' });
  } else if (password === '') {
    res.status(400).json({ error: 'Missing required parameter \'password\'.' });
  } else if (firstName === '') {
    res.status(400).json({ error: 'Missing required parameter \'firstName\'.' });
  } else if (lastName === '') {
    res.status(400).json({ error: 'Missing required parameter \'lastName\'.' });
  } else if (company === '') {
    res.status(400).json({ error: 'Missing required parameter \'company\'.' });
  } else if (email === '') {
    res.status(400).json({ error: 'Missing required parameter \'email\'.' });
  } else if (zipCode === '') {
    res.status(400).json({ error: 'Missing required parameter \'zipCode\'.' });
  } else {
    const options = {
      method: 'POST',
      uri: `${BASE_URL}users`,
      body: {
        username,
        firstName,
        lastName,
        email,
        company,
        zipCode,
        password,
      },
      json: true,
    };
    rp(options).then(() => {
      res.status(200).json({});
    })
    .catch((err) => {
      next(err);
    });
  }
});

router.get('/register', (req, res) => {
  res.render('pages/register');
});

router.use(checkSession);

router.get('/', (req, res) => {
  res.render('pages/users');
});

module.exports = router;
