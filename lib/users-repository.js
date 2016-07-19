'use strict';

const
  Tingo = require('tingodb')(),
  users = new Tingo.Db('./db', {}).collection('users'),
  Promise = require('bluebird');

Promise.promisifyAll(Tingo);

users.createIndex({username: 1}, {unique: true});


function register(user) {
  return users.insertAsync(user);
}

function findOne(username) {
  return users.findOneAsync({username: username});
}

function listUsersRepository() {
  users.findAsync()
    .then(results => results.each((_, user) => console.log("User: " + JSON.stringify(user))))
    .catch(e => console.error(e));
}

module.exports = {
  register,
  findOne
};

if (require.main === module) {
  listUsersRepository();
}
