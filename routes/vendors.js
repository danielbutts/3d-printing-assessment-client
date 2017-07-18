const express = require('express');
const rp = require('request-promise');
const authUtils = require('../utils/auth-utils');

const router = express.Router();
const API_URL = process.env.API_URL; // e.g. 'http://localhost:8080'

router.post('/', authUtils.validateToken, (req, res, next) => {
  const { name, zipCode } = req.body;
  if (name === '') {
    res.status(400).json({ error: 'Missing required parameter \'name\'.' });
  } else if (zipCode === '') {
    res.status(400).json({ error: 'Missing required parameter \'zipCode\'.' });
  } else {
    const options = {
      method: 'POST',
      uri: `${API_URL}/bureaus`,
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
  const options = {
    method: 'PATCH',
    uri: `${API_URL}/bureaus`,
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
});

router.get('/:id', authUtils.validateToken, (req, res, next) => {
  const id = req.params.id;
  if (id === undefined) {
    res.status(400).json({ error: 'Missing required parameter \'id\'.' });
  } else {
    const options = {
      method: 'GET',
      uri: `${API_URL}/bureaus/${id}`,
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

router.get('/', authUtils.validateToken, (req, res, next) => {
  const options = {
    method: 'GET',
    uri: `${API_URL}/bureaus/`,
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

router.post('/:bureauId/printer/:printerId', authUtils.validateToken, (req, res, next) => {
  const bureauId = req.params.bureauId;
  const printerId = req.params.printerId;
  if (bureauId === undefined) {
    res.status(400).json({ error: 'Missing required parameter \'bureauId\'.' });
  } else if (printerId === undefined) {
    res.status(400).json({ error: 'Missing required parameter \'printerId\'.' });
  } else {
    const options = {
      method: 'POST',
      uri: `${API_URL}/bureaus/${bureauId}/printer/${printerId}`,
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

router.delete('/:bureauId/printer/:printerId', authUtils.validateToken, (req, res, next) => {
  const bureauId = req.params.bureauId;
  const printerId = req.params.printerId;
  if (bureauId === undefined) {
    res.status(400).json({ error: 'Missing required parameter \'bureauId\'.' });
  } else if (printerId === undefined) {
    res.status(400).json({ error: 'Missing required parameter \'printerId\'.' });
  } else {
    const options = {
      method: 'DELETE',
      uri: `${API_URL}/bureaus/${bureauId}/printer/${printerId}`,
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


module.exports = router;
