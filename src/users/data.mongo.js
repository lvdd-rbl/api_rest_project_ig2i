const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

const Promise = require("bluebird");
const _ = require("lodash");

function waitAsync(data) {
  const deferred = Promise.defer();

  const msToWait = Math.floor(Math.random() * 400 + 1);
  setTimeout(function () {
    deferred.resolve(data);
  }, msToWait);

  return deferred.promise;
}

function _loadAsync(_data) {
  return waitAsync(_.cloneDeep(_data));
}

class Data {
  constructor() { }

  async connect() {
    try {
      var connection = await MongoClient.connect(url, { useNewUrlParser: true });
      this.db = connection.db('local');
    }
    catch (ex) {
    }
  }

  async loginAsync(login, passe) {
    await this.connect();
    let users = await this.db.collection("users").find({ login, passe }).toArray();
    return _loadAsync(users[0]).then(() => users[0]);
  }
}

module.exports = Data;