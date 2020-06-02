const App = require("./app");

const ConversationData = require("./conversations/data.mongo");
const Conversations = require("./conversations/controller");
const conversations = new Conversations(new ConversationData());

const UserData = require("./users/data.mongo");
const Users = require("./users/controller");
const users = new Users(new UserData());

const app = new App(conversations, users).app;

var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log(`API listening at http://${host}:${port}`);
});
