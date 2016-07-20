# Project skeleton for JavaScript auth workshop

## TL;DR start the project 

1. Clone this repository:
   `git clone https://github.com/liucijus/auth-workshop-node/`
2. Change directory to `auth-workshop-node/`
3. Run `npm install` to fetch JavaScript dependencies
4. Start project in development mode by running `npm run start-dev`

## Workshop prerequisites
* **Prior experience in programming is a must**
* Editor. Pick an editor which supports JavaScript syntax highlighting. 
  The best editor is one which you work daily. If you have hard time 
  making decision, pick [Atom](https://atom.io)
* Install [Node.js](https://nodejs.org/en/download/package-manager/)
* Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* Install add on to modify cookies on your browser. Some of the options:
  * Firefox - [Cookie Manager+](https://addons.mozilla.org/en-US/firefox/addon/cookies-manager-plus/)
  * Chrome - [Cookies](https://chrome.google.com/webstore/detail/cookies/iphcomljdfghbkdcfndaijbokpgddeno?hl=en)


## Cheats
* Working with cookies
```javascript
// read cookie
const cookieParser = require('cookie');
const cookieHeaderValue = req.header('cookie') || '';
const myCookie = cookieParser.parse(cookieHeaderValue).myCookie;

// set cookie 
res.cookie('myCookie', 'my-cookie-value');

// set cookie with some options
res.cookie('another', 'another-cookie-value', { maxAge: 900000, httpOnly: true });
```

* Working with form data
```javascript
const body = req.body;
const username = body.username;
const password = body.password;
```
* Crypto JS
```javascript
const crypto = require('crypto-js');
const SECRET = 'my secret password';

const value = 15;

// make sure value is string before calculating hash
const hash = crypto.HmacSHA256(value.toString(), SECRET).toString();
```
* Bcrypt
```javascript
const bcrypt = require('bcryptjs');
const password = 'qw99KJtg65';
const hash = bcrypt.hashSync(password)
const isValid = bcrypt.compareSync(password, password);

```
