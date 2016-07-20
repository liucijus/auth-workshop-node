'use strict';

const router = require('express').Router();
const cookieParser = require('cookie');

const SECRET = 'super secret';

router.get('/insecure', (req, res) => {
  const cookieHeaderValue = req.header('cookie') || '';
  const visits = cookieParser.parse(cookieHeaderValue).visits;

  const count = parseInt(isNaN(visits) ? '0' : visits) + 1;
  res.cookie('visits', count.toString());

  res.render('visits', {visitCount: count});
});

const crypto = require('crypto-js');

router.get('/secure', (req, res) => {
  const cookieHeaderValue = req.header('cookie') || '';
  const visitsCookie = cookieParser.parse(cookieHeaderValue).visits;

  const [value, hash] = visitsCookie.split('|');
  const visitsCount = parseInt(value || '0');

  if (hashOf(visitsCount) === hash)
    setCookieAndRender(res, visitsCount + 1);
  else
    setCookieAndRender(res, 1)
});

function hashOf(value) {
  return crypto.HmacSHA256(value.toString(), SECRET).toString();
}

function makeSecureCookie(value) {
  const hash = hashOf(value);
  return `${value}|${hash}`;
}

function setCookieAndRender(res, visitCount) {
  res.cookie('visits', makeSecureCookie(visitCount));
  res.render('visits', {visitCount})
}

module.exports = router;
