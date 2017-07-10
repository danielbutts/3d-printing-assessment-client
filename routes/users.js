const express = require('express');
// const User = require('../db/model/User');
// const bcrypt = require('bcrypt-as-promised');
const checkSession = require('./session').checkSession;

const router = express.Router();

router.post('/', (req, res) => {
  const { name, password } = req.body;
  // const isAdmin = req.body.isAdmin || false;
  if (name === '') {
    res.status(400).json({ error: 'Missing required parameter \'name\'.' });
  } else if (password === '') {
    res.status(400).json({ error: 'Missing required parameter \'password\'.' });
  } else {
    res.status(200).json({ result: 'YAY!' });

    // User.getUsers({ name }).then((results) => { // eslint-disable-line consistent-return
    //   if (results.length > 0) {
    //     res.status(400).json({ error: 'Username already exists.' });
    //   } else {
    //     return bcrypt.hash(password, 12).then(hashedPassword =>
    //       User.createUser({
    //         name,
    //         password: hashedPassword,
    //         is_admin: isAdmin }))
    //         .then((inserts) => {
    //           const user = inserts[0];
    //           delete user.hashed_password;
    //           req.session.userId = user.id;
    //           res.status(200).json({ message: 'Successfully created user.', user });
    //         });
    //   }
    // })
    // .catch((err) => {
    //   next(err);
    // });
  }
});

router.use(checkSession);

router.get('/', (req, res) => {
  res.render('pages/users', { message: 'HERE.' });
  // User.getUsers().then((users) => {
  //   res.render('users', { users });
  // });
});


module.exports = router;
