# Exercices Express.js

## Objectif

Créer une API REST simple pour gérer une liste de contacts en utilisant les concepts de base d'Express.js, sur base d'une architecture `Domain Driven Design`.

⚠️ Le projet doit être créé sur un dépôt personnel, pas dans celui-ci ⚠️

## Structure du Projet

```sh
server/
├── src/
|   |
│   └── api
|     └── logger.middleware.js
|
│   └── config
|     └── app.config.js
|
|   |
│   └── resources
|     └── contact
│       └── contact.controller.js
│       └── contact.database.js
│       └── contact.model.js
│       └── contact.routes.js
|   |
│   └── app.js
├── .env
├── .gitignore
├── package.json
```

## Étapes

### 1. Initialisation du projet

- Créer un dépôt Git `contacts-application` sur Github, qui contient les répertoires `server` et `client`:

```bash
cd server
npm init -y
npm i express dotenv
npm i nodemon -D
```

Dans package.json, ajouter le script:

```javascript
{
  "scripts": {
    "dev": "nodemon src/app.js"
  }
}
```

### 2. Couche Model

Les données sont récupérées depuis un fichier JSON, et mises en mémoire.

Le modèle `Contact` implémente le schéma suivant:

```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+33612345678",
  "address": "123 rue Example, 75000 Paris"
}
```

🚀 Bonus: le fichier est lu et persisté à l'aide du module `fs` de Node.js.

### 3. Middleware de logging

Dans `src/api/logger.middleware.js` :

```javascript
export const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};
```

### 4. Routes, controller, modèle

Dans `src/resources/contact/contacts.routes.js`, implémenter:

- GET /api/contacts - Liste tous les contacts
- GET /api/contacts/:id - Récupère un contact spécifique
- POST /api/contacts - Crée un nouveau contact AVEC UPLOAD DE FICHIER
- PUT /api/contacts/:id - Met à jour un contact AVEC UPLOAD DE FICHIER
- DELETE /api/contacts/:id - Supprime un contact

Les actions de controller sont définies dans un fichier dédié.

Idéalement vous définissez une classe dédiée à la définition et la récupération des données, aka le `Model`.

### 5. Configuration de l'application

Dans `src/env.config.js`, configurer:

- Le chargement des variables d'environnement

Dans `src/config/app.config.js`, configurer:

- Les middlewares (express.json, express.urlencoded, compression, logger)
- Les routes
- La gestion des erreurs via un middleware dédié

Dans `src/config/multer.config.js`, configurer:

- Le nom de fichier à utiliser lors d'un upload
- Le répertoire de destination des fichiers uploadés

### 6. Exposition du serveur

Dans `src/app.js`, vous importez la configuration de l'application, et écoutez le port défini dans votre configuration.

## Critères de validation

- L'API respecte les principes REST
- L'application Express implémente les middlewares appropriés
- Les routes sont implémentées via `Express.Router()`
- Les réponses sont au format JSON
- Les codes HTTP appropriés sont utilisés
- Chaque requête est loggée via un middleware
- Les erreurs sont loggées et ensuite masquées au client, qui reçoit une erreur 500 et un message générique
- Une collection Insomnia permettant de tester l'API est fournie dans le projet