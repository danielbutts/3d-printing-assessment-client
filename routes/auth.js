const express = require('express');

const router = express.Router();

router.get('/login', (req, res) => {
  let username = '';
  if (req.session !== undefined) {
    username = req.session.username;
  }
  res.render('pages/login', { username });
});

router.get('/register', (req, res) => {
  let username = '';
  if (req.session !== undefined) {
    username = req.session.username;
  }
  res.render('pages/register', { username });
});

router.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/auth/login');
});

module.exports = router;
