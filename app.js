const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const index = require('./routes/index');
const auth = require('./routes/auth');
const users = require('./routes/users');
const dashboard = require('./routes/dashboard');
const session = require('./routes/session').router;
require('dotenv').config();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieSession({
  name: 'trivia-scorecard',
  secret: process.env.SESSION_SECRET,
  secure: app.get('env') === 'production',
}));

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon-32x32.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/auth', auth);
app.use('/session', session);
app.use('/users', users);
app.use('/dashboard', dashboard);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  console.log('HERE');
  if (err.status === 401) {
    console.log('err.status', err.status);
    res.redirect('/auth/login');
  } else {
    console.log('some other error', err.status);
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }
});

module.exports = app;
