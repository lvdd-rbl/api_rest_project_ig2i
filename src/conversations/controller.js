class Conversations {
  constructor(data) {
    this.data = data;
  }

  configure(app) {
    const data = this.data;

    /**
     * Récupère l'ensemble des conversations
     */
    app.get("/api/conversations", function (request, response) {
      return data.getConversationsAsync().then(function (conversations) {
        if (conversations !== undefined) {
          if (conversations.length) {
            response.status(200).json({ "connecte": true, "conversations": conversations });
            return;
          }
        }
        response.status(404).json({
          key: "entities.not.found"
        });
      });
    });

    /**
     * Récupère une conversation
     */
    app.get("/api/conversations/:id/:idLastMessage", function (request, response) {
      let id = request.params.id;
      let idCurrentLastMessage = request.params.idLastMessage;
      return data.getConversationAsync(id).then(function (conversation) {
        if (conversation !== undefined) {
          let idLastMessage = 1;
          conversation.messages.map(message => idLastMessage = message.id); // récupération dernier id
          conversation.messages = conversation.messages.filter(message => message.id > idCurrentLastMessage); // ne renvoie pas tous les messages
          response.status(200).json({ "connecte": true, "messages": conversation.messages, "id": conversation._id, idLastMessage });
          return;
        }
        response.status(404).json({
          key: "entity.not.found"
        });
      });
    });

    /**
     * Ajoute un message dans une conversation
     */
    app.post("/api/conversations/:id/:idLastMessage", function (request, response) {
      let idCurrentLastMessage = request.params.idLastMessage;
      let message = request.body;
      message.couleur = request.session.couleur;
      message.auteur = request.session.login;
      return data.addMessageAsync(request.params.id, message, idCurrentLastMessage).then(function (id) {
        if (id) {
          data.getConversationAsync(request.params.id).then(function (conversation) {
            let idLastMessage = 1;
            conversation.messages.map(message => idLastMessage = message.id); // récupération dernier id
            conversation.messages = conversation.messages.filter(message => message.id > idCurrentLastMessage); // ne renvoie pas tous les messages
            response.status(201).json({ "messages": conversation.messages, idLastMessage });
          });
        }
      });
    });
  }
}

module.exports = Conversations;
