const express = require('express');
const rp = require('request-promise');
const authUtils = require('../utils/auth-utils');

const router = express.Router();
const API_URL = process.env.API_URL; // e.g. 'http://localhost:8080'

// add auth check as middleware
router.post('/', authUtils.validateToken, (req, res, next) => {
  const { name, materialId, price } = req.body;
  req.body.userId = req.userId;
  if (name === '') {
    res.status(400).json({ error: 'Missing required parameter \'name\'.' });
  } else if (materialId === '') {
    res.status(400).json({ error: 'Missing required parameter \'materialId\'.' });
  } else if (price === '') {
    res.status(400).json({ error: 'Missing required parameter \'price\'.' });
  } else {
    const options = {
      method: 'POST',
      uri: `${API_URL}/parts`,
      headers: {
        authorization: req.token,
      },
      body: req.body,
      json: true,
    };
    rp(options).then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      next(err);
    });
  }
});

router.patch('/', authUtils.validateToken, (req, res, next) => {
  // do I need to check for undefined rather than ''?
  const { name, materialId, price } = req.body;
  req.body.userId = req.userId;
  if (name === '') {
    res.status(400).json({ error: 'Missing required parameter \'name\'.' });
  } else if (materialId === '') {
    res.status(400).json({ error: 'Missing required parameter \'materialId\'.' });
  } else if (price === '') {
    res.status(400).json({ error: 'Missing required parameter \'price\'.' });
  } else {
    const options = {
      method: 'PATCH',
      uri: `${API_URL}/parts`,
      headers: {
        authorization: req.token,
      },
      body: req.body,
      json: true,
    };
    rp(options).then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      next(err);
    });
  }
});

router.get('/:id', authUtils.validateToken, (req, res, next) => {
  const id = req.params.id;
  if (id === undefined) {
    res.status(400).json({ error: 'Missing required parameter \'id\'.' });
  } else {
    const options = {
      method: 'GET',
      uri: `${API_URL}/parts/${id}`,
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
  }
});

router.get('/:id/cost', authUtils.validateToken, (req, res, next) => {
  const id = req.params.id;
  if (id === undefined) {
    res.status(400).json({ error: 'Missing required parameter \'id\'.' });
  } else {
    const options = {
      method: 'GET',
      uri: `${API_URL}/parts/${id}/cost`,
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
  }
});


module.exports = router;
