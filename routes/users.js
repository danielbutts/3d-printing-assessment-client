const express = require('express');
const rp = require('request-promise');
// const checkSession = require('./session').checkSession;

const router = express.Router();
const BASE_URL = process.env.BASE_URL || 'http://localhost:8080/';

// router.use(checkSession);

router.get('/', (req, res, next) => {
  let username = '';
  if (req.session !== undefined) {
    username = req.session.username;
  }

  req.session.userId = 291;
  const options = {
    uri: `${BASE_URL}users/${req.session.userId}`,
    // headers: {
    //   authorization: req.session.token,
    // },
    json: true,
  };

  rp(options).then((result) => {
    const parts = result.parts;
    parts.forEach((part) => {
      part.isValid = vaidatePart(part); // eslint-disable-line
    });
    res.status(200).json({ parts, username });
  })
  .catch((err) => {
    next(err);
  });
});

function vaidatePart(part) {
  let isValid = true;

  if (part.width === null) {
    isValid = false;
  }
  if (part.height === null) {
    isValid = false;
  }
  if (part.depth === null) {
    isValid = false;
  }
  if (part.volume === null) {
    isValid = false;
  }
  if (part.weight === null) {
    isValid = false;
  }
  if (part.price === null) {
    isValid = false;
  }

  return isValid;
}
module.exports = router;
