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

/**
 * Classe qui permet de gérer les opérations en base de données
 */
class Data {
  constructor() { }

  async connect() {
    try {
      var connection = await MongoClient.connect(url, { useNewUrlParser: true });
      this.db = connection.db('L4-CHAT-SI');
    }
    catch (ex) {
    }
  }

  /**
   * Retourne les users trouvés en base de données
   */
  async getUsersAsync() {
    await this.connect();
    let users = await this.db.collection("users").find().toArray();
    return _loadAsync(users).then(() => users);
  }

  /**
   * Fixtures users
   */
  async addUsers() {
    await this.connect();
    let users = [
      {"login":"user","passe":"user","couleur":"#32a852"},
      {"login":"lucas","passe":"lucasvdd","couleur":"#ff0000"},
      {"login":"luis","passe":"luisduretete","couleur":"#0000ff"},
      {"login":"henri","passe":"henridef","couleur":"#D433FF"}
    ];
    let document = await this.db.collection("users").insertMany(users);
    return _loadAsync(document).then(() => document.result);
  }

  async loginAsync(login, passe) {
    await this.connect();
    let users = await this.db.collection("users").find({ login, passe }).toArray();
    return _loadAsync(users[0]).then(() => users[0]); // récupère le premier user trouvé
  }
}

module.exports = Data;