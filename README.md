# Project skeleton for JavaScript auth workshop

To get started:

1. Clone this repository (you need to have **Git** installed): `git clone https://github.com/liucijus/auth-workshop-node/`
2. Change directory to `auth-workshop-node/`
3. Run `npm install` to fetch JavaScript dependencies. (**Node.js** needs to be installed and available on your system)
4. Start project in development mode by running `npm run start-dev`
5. Use your favorit editor of choice that supports at least JavaScript and HTML syntax highlighting. If you have hard time to decide, pick opensource editor [Atom](https://atom.io)

# Cheats
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
