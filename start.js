'use strict';

const express = require('express'),
  bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.get('/hello', (req, res) => {
  res.send('hello');
});

app.use('/visits', require('./lib/visitors'));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('Listening...');
});
