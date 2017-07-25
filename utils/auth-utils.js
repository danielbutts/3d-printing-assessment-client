const jwt = require('jwt-simple');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET; // e.g. 'TH1s_is_4-S3cret!';

function validateToken(req, res, next) {
  if (req.headers.authorization !== undefined) {
    const jwtToken = jwt.decode(req.headers.authorization, JWT_SECRET);
    if (jwtToken !== undefined) {
      // console.log(jwtToken);
      req.userId = jwtToken.userId;
      req.token = jwtToken.token;
      req.isAdmin = (jwtToken.isAdmin === 'true');
      next();
    } else {
      req.userId = undefined;
      req.token = undefined;
      req.isAdmin = undefined;
      next({ error: 'Invalid Auth Token' });
    }
  } else {
    next();
  }
}

module.exports = { validateToken };
