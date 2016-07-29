const router = require('express').Router(),
  users = require('./users-repository'),
  crypto = require('crypto-js'),
  bcrypt = require('bcryptjs');

const SECRET = '<change me>';

function hashOf(value) {
  return crypto.HmacSHA256(value.toString(), SECRET).toString();
}
router.get('/register', (req, res) => {
  res.render('register-form');
});

router.post('/register', (req, res) => {
  const body = req.body;
  const username = body.username;
  const password = body.password;

  const passwordHash = bcrypt.hashSync(password);

  users
    .register({username: username, password: passwordHash})
    .then(user => res.redirect('/users/login'))
    .catch(err => res.send(err.toString()));
});

router.get('/login', (req, res) => res.render('login-form'));

router.post('/login', (req, res) => {
  const body = req.body;
  const username = body.username;
  const password = body.password;

  users
    .findOne(username)
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        res.cookie('userId', username + '|' + hashOf(username))
        res.redirect('/users/private');
      } else {
        res.redirect('/users/login');
      }
    })
});

router.get('/private', (req, res) => {
  const cookieParser = require('cookie');
  const cookieHeaderValue = req.header('cookie') || '';
  const userIdCookie = cookieParser.parse(cookieHeaderValue).userId || '';

  const [user, hash] = userIdCookie.split('|');

  if (hashOf(user) === hash) {
    res.render('private');
  } else {
    res.redirect('/users/login');
  }
});

router.get('/logout', (req, res) => {
  res.cookie('userId', '', {expires: new Date(1)});
  res.redirect('/users/login');
});

module.exports = router;
