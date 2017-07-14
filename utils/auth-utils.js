const jwt = require('jwt-simple');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET; // e.g. 'TH1s_is_4-S3cret!';

function validateToken(req, res, next) {
  const jwtToken = jwt.decode(req.headers.authorization, JWT_SECRET);
  if (jwtToken !== undefined) {
    req.userId = jwtToken.userId;
    req.token = jwtToken.token;
    next();
  } else {
    req.userId = undefined;
    req.token = undefined;
    next({ error: 'Invalid Auth Token' });
  }
}

module.exports = { validateToken };
