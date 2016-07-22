'use strict';

const router = require('express').Router(),
  users = require('./users-repository'),
  crypto = require('crypto-js'),
  cookieParser = require('cookie');

const SECRET = 'super secret';

router.get('/register', (req, res) => res.render('register'));

function hashPassword(password) {
  return crypto.SHA256(password).toString();
}
router.post('/register', (req, res) => {
  const body = req.body;
  const username = body.username;
  const password = body.password;

  const hashedPassword = hashPassword(password);

  users
    .register({username, password: hashedPassword})
    .then(() => res.redirect('/users/login'))
    .catch(err => req.send(err));
});

router.get('/login', (req, res) => res.render('login'));

function makeSessionCookie(user) {
  return makeSecureCookie(user.username);
}

function hashOf(value) {
  return crypto.HmacSHA256(value.toString(), SECRET).toString();
}

function makeSecureCookie(value) {
  const hash = hashOf(value);
  return `${value}|${hash}`;
}

router.post('/login', (req, res) => {
  const body = req.body;
  const username = body.username;
  const password = body.password;

  users
    .findOne(username)
    .then(user => {
      if (user.password === hashPassword(password)) {
        const cookie = makeSessionCookie(user);
        res.cookie('user-id', cookie);
        res.redirect('/users/private');
      } else {
        res.redirect('/users/login?error=invalid-credentials');
      }
    })
    .catch(err => {
      console.log(err);
      res.send(err.toString())
    });
});

function isValidSession(req) {
  const cookieHeaderValue = req.header('cookie') || '';
  const userIdCookie = cookieParser.parse(cookieHeaderValue)['user-id'];
  const [userId, hash] = userIdCookie.split('|');

  return hashOf(userId) === hash;
}

router.get('/private', (req, res) => {
  if (isValidSession(req))
    res.render('private');
  else
    res.redirect('/users/login?error=unauthorized');
});

module.exports = router;
