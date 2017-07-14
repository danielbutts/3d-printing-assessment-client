const express = require('express');
const rp = require('request-promise');
const authUtils = require('../utils/auth-utils');

const router = express.Router();
const BASE_URL = process.env.BASE_URL || 'http://localhost:8080/';

// add auth check as middleware
router.post('/', authUtils.validateToken, (req, res, next) => {
  console.log(req.body);

  // do I need to check for undefined rather than ''?
  const { name, materialId, width, height, volume, price, leadTime } = req.body;
  if (name === '') {
    res.status(400).json({ error: 'Missing required parameter \'name\'.' });
  } else if (materialId === '') {
    res.status(400).json({ error: 'Missing required parameter \'materialId\'.' });
  } else if (price === '') {
    res.status(400).json({ error: 'Missing required parameter \'price\'.' });
  } else {
    const options = {
      method: 'POST',
      uri: `${BASE_URL}parts`,
      headers: {
        authorization: req.token,
      },
      body: {
        userId: req.userId,
        name,
        materialId,
        width,
        height,
        volume,
        price,
        leadTime,
      },
      json: true,
    };
    rp(options).then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      next(err);
    });
  }
});


module.exports = router;
