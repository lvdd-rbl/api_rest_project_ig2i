class Users {
  constructor(data) {
    this.data = data;
  }

  configure(app) {
    const data = this.data;
    var sess;

    /**
     * Login
     */
    app.post("/api/login", function (request, response) {
      sess = request.session;
      let login = request.body.login;
      let passe = request.body.passe;
      return data.loginAsync(login, passe).then(function (user) {
        sess.login = login; // enregistrement variables de session
        sess.passe = passe;
        sess.couleur = user.couleur;
        response.status(200).json({ "connecte": true, id: user._id });
      })
    });
  }
}


module.exports = Users;
