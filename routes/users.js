const express = require('express');
const rp = require('request-promise');
const partsUtils = require('../utils/parts-utils');
const authUtils = require('../utils/auth-utils');

const router = express.Router();
const BASE_URL = process.env.BASE_URL || 'http://localhost:8080/';

router.get('/:id', authUtils.validateToken, (req, res, next) => {
  const id = req.params.id;
  if (id === undefined) {
    res.status(400).json({ error: 'Missing required parameter \'id\'.' });
  } else {
    const options = {
      uri: `${BASE_URL}users/${id}`,
      headers: {
        authorization: req.token,
      },
      json: true,
    };

    rp(options).then((result) => {
      const parts = result.parts;
      parts.forEach((part) => {
        part.isValid = partsUtils.validatePart(part); // eslint-disable-line
      });
      res.status(200).json({ parts });
    })
    .catch((err) => {
      next(err);
    });
  }
});

module.exports = router;
