'use strict';

const router = require('express').Router(),
  cookieParser = require('cookie'),
  crypto = require('crypto-js');

const SECRET = '<change me>';

function hashOf(value) {
  return crypto.HmacSHA256(value.toString(), SECRET).toString();
}

router.get('/', (req, res) => {
  const cookieHeaderValue = req.header('cookie') || '';
  const visitCount = cookieParser.parse(cookieHeaderValue).visitCount || '';

  const [value, hash] = visitCount.split('|');

  /* Node 4
   const cookieParts = visitCount.split('|');

   const value = cookieParts[0];
   const hash = cookieParts[1];
   */

  const count = (!isNaN(value) && hashOf(value) === hash) ? parseInt(value) + 1 : 1;

  const newHash = hashOf(count);

  const cookieValue = count.toString() + '|' + newHash;

  res.cookie('visitCount', cookieValue);
  res.render('visits', {visitCount: count});
});

module.exports = router;

