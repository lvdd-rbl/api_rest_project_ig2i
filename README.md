# API Rest

## Installation et développement
Installer Node.js dernière version LTS : https://nodejs.org/en/download/
Vérifier l'installation et la version de node.js :
```
node -v
```

- Installer MongoDB : https://www.mongodb.com/download-center/community
- Installer MongoDB Compass Community si non installé avec MongoDB : https://www.mongodb.com/download-center/compass
- Créer les collections "conversations" et "users" dans la base "local"
- Insérer les documents des collections respectives : "Add Data" => "Import file" => Sélectionner le fichier **json** correspondant dans le dossier **db/**

Une fois le projet clôné en local :
```
npm install => télécharge les dépendances node.js via le logiciel npm
npm run start => démarre le serveur
```

## Memo 

- POST http://localhost:8081/api/login => Connexion avec un identifiant et un mot de passe enregistrés en variables de session
- GET http://localhost:8081/api/conversations => Liste toutes les conversations
- GET http://localhost:8081/api/conversations/1/3 => Récupère la conversation avec l'id 1 et renvoie ses messages à partir du message d'id 3
- POST http://localhost:8081/api/conversations/1/3 => Ajoute un message à la suite du message d'id 3 à la conversation avec l'id 1 