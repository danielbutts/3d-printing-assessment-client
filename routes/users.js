const express = require('express');
const checkSession = require('./session').checkSession;

const router = express.Router();

router.post('/', (req, res) => {
  const { name, password } = req.body;
  if (name === '') {
    res.status(400).json({ error: 'Missing required parameter \'name\'.' });
  } else if (password === '') {
    res.status(400).json({ error: 'Missing required parameter \'password\'.' });
  } else {
    res.status(200).json({});
  }
});

router.use(checkSession);

router.get('/', (req, res) => {
  res.render('pages/users', { message: 'HERE.' });
});


module.exports = router;
