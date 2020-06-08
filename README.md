# API Rest

## Installation et développement
- Installer Node.js dernière version LTS : https://nodejs.org/en/download/
- Vérifier l'installation et la version de node.js :
```
node -v
```

- Installer MongoDB : https://www.mongodb.com/download-center/community

Une fois le projet clôné en local :
- Télécharger les dépendances node.js via le logiciel npm :
```
npm install
```
- Démarrer le serveur :
```
npm run start
```

## Memo 

- POST http://localhost:8081/api/login => Connexion avec un identifiant et un mot de passe enregistrés en variables de session
- GET http://localhost:8081/api/conversations => Liste toutes les conversations
- GET http://localhost:8081/api/conversations/1/3 => Récupère la conversation avec l'id 1 et renvoie ses messages à partir du message d'id 3
- POST http://localhost:8081/api/conversations/1/3 => Ajoute un message à la suite du message d'id 3 à la conversation avec l'id 1 