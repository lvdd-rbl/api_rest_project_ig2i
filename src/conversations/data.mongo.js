const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

const Promise = require("bluebird");
const _ = require("lodash");
var mongoose = require('mongoose');

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
  constructor() {
  }

  async connect() {
    try {
      var connection = await MongoClient.connect(url, { useNewUrlParser: true });
      this.db = connection.db('L4-CHAT-SI');
    }
    catch (ex) {
    }
  }

  /**
   * Fixtures
   */
  async addConversations() {
    await this.connect();
    let conversations = [
      {"active":1,"theme":"Les cours en IAM","messages":[{"auteur":"lucas","contenu":"Que pensez-vous des cours en IAM ?","id":1,"couleur":"#ff0000"}]},
      {"theme":"Ballon d'Or","active":1,"messages":[{"auteur":"luis","contenu":"D'après vous, qui sera Ballon d'Or ?","id":1,"couleur":"#0000ff"},{"auteur":"lucas","contenu":"Je sais pas","id":2,"couleur":"#ff0000"}]}
    ];
    let document = await this.db.collection("conversations").insertMany(conversations);
    return _loadAsync(document).then(() => document.result);
  }

  /**
   * Récupère toutes les conversations
   */
  async getConversationsAsync() {
    await this.connect();
    let conversations = await this.db.collection("conversations").find().toArray();
    return _loadAsync(conversations).then(() => conversations);
  }

  /**
   * Récupère la conversation avec l'id donné et renvoie ses données
   * @param id 
   */
  async getConversationAsync(id) {
    await this.connect();
    let conversations = await this.db.collection("conversations").find({ _id: mongoose.Types.ObjectId(id) }).toArray();
    return _loadAsync(conversations[0]).then(() => conversations[0]);
  }

  /**
   * Ajoute un message dans la conversation à la suite des autres messages
   * @param id 
   * @param message 
   * @param idLastMessage 
   */
  async addMessageAsync(id, message, idLastMessage) {
    await this.connect();
    let document = await this.db.collection("conversations").updateOne(
      { _id: mongoose.Types.ObjectId(id) }, // id de la conversation
      {
        $push: { // ajout dans le tableau messages de la conversation
          "messages": {
            id: parseInt(idLastMessage, 10) + 1, // incrémentation de l'id
            auteur: message.auteur,
            contenu: message.contenu,
            couleur: message.couleur
          }
        }
      }
    );
    return _loadAsync(document.modifiedCount).then(() => document.modifiedCount); // modifiedCount > 0 : ajout réussi
  }
}

module.exports = Data;