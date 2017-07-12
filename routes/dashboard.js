const express = require('express');
const rp = require('request-promise');
const checkSession = require('./session').checkSession;

const router = express.Router();
const BASE_URL = process.env.BASE_URL || 'http://localhost:8080/';

router.use(checkSession);

router.get('/', (req, res, next) => {
  let username = '';
  if (req.session !== undefined) {
    username = req.session.username;
  }

  const options = {
    uri: `${BASE_URL}users/${req.session.userId}`,
    headers: {
      authorization: req.session.token,
    },
    json: true,
  };

  rp(options).then((result) => {
    const parts = result.parts;
    parts.forEach((part) => {
      if (part === null) {
        console.log('NULL');
      }
      console.log(part.id, part.name);
      part.isValid = vaidatePart(part); // eslint-disable-line 
    });
    res.render('pages/dashboard', { parts, username });
  })
  .catch((err) => {
    next(err);
  });
});

function vaidatePart(part) {
  let isValid = true;

  if (part.materialId === null) {
    isValid = false;
  }
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
  // if (part.minOrder === null) {
  //   isValid = false;
  // }
  // if (part.annualOrder === null) {
  //   isValid = false;
  // }
  // if (part.maxTurnaround === null) {
  //   isValid = false;
  // }
  // if (part.stlFilename === null) {
  //   isValid = false;
  // }
  if (part.printTime === null) {
    isValid = false;
  }
  if (part.preprocessTime === null) {
    isValid = false;
  }
  if (part.postprocessTime === null) {
    isValid = false;
  }
  return isValid;
}
module.exports = router;
