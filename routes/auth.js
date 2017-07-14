const express = require('express')
const jwt = require('jwt-simple')
const rp = require('request-promise');
require('dotenv').config();

const router = express.Router();
const API_URL = process.env.API_URL // e.g. 'http://localhost:8080';
const JWT_SECRET = process.env.JWT_SECRET;

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
      let authorizedUser = {
        token: response.headers.authorization,
        userId: response.headers.userid,
      }
      const clientToken = jwt.encode(authorizedUser,JWT_SECRET);
      // console.log(clientToken);
      // console.log(jwt.decode(clientToken, JWT_SECRET));
      
      res.status(200).json({
        token: clientToken,
        username: response.headers.username,
        firstName: response.headers.firstname
      });
    })
    .catch((err) => {
      next(err);
    });
  }})

module.exports = router
