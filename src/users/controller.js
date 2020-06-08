const jwt = require("../JWTUtils")

class Users {
  constructor(data) {
    this.data = data;
  }

  configure(app) {
    const data = this.data;
    var sess;

    data.getUsersAsync().then(function(users) {
      if(!users.length) {
        data.addUsers();
      }
    });

    /**
     * Login
     */
    app.post("/api/login", function (request, response) {
      sess = request.session; // initialisation de session
      let cryptedJWT = request.body.cryptedJWT;
      let decryptedData = jwt.verifyJWT(cryptedJWT)

      let login = decryptedData.login;
      let passe = decryptedData.passe;

      return data.loginAsync(login, passe).then(function (user) {
        sess.login = login; // enregistrement variables de session
        sess.passe = passe;
        sess.couleur = user.couleur;
        response.status(200).json({ "connecte": true, id: user._id }); // renvoi de la réponse
      })
    });
  }
}


module.exports = Users;
