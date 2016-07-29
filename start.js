'use strict';

const express = require('express'),
  bodyParser = require('body-parser'),
  crypto = require('crypto-js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.use('/visitors', require('./lib/visitors'));
app.use('/users', require('./lib/users'));
app.use('/foo', require('./lib/visitors'));

app.get('/hello', (req, res) => {
  res.send('<h1>foobar</h1>');
});

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('Listening...');
});
