'use strict';

const express = require('express'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie'),
  crypto = require('crypto-js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('./public'));

const SECRET = '<change me>';

function hashOf(value) {
  return crypto.HmacSHA256(value.toString(), SECRET).toString();
}

app.get('/visitors', (req, res) => {
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


app.get('/hello', (req, res) => {
  res.send('<h1>foobar</h1>');
});

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('Listening...');
});
