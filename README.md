# YamsGame

## Database Setup

To set up the database for the Chocolatey Game, run the following MongoDB commands:

```bash
# Use the 'chocolatey_game' database
use chocolatey_game

# Create collections for pastries and users
db.createCollection("pastries")
db.createCollection("users")
db.createCollection("wonpastries") 

# Create a unique index on the 'username' field of the 'users' collection
db.users.createIndex({ "username": 1 }, { unique: true })

# Insert sample pastry data into the 'pastries' collection
db.pastries.insertMany([
  { "name": "Fondant supreme", "number": 10, "order": 1 },
  { "name": "Cake tout Chocolat", "number": 10, "order": 2 },
  { "name": "Cake Framboise chocolat", "number": 10, "order": 3 },
  { "name": "Brioche sucrée avec chocolat", "number": 10, "order": 4 },
  { "name": "Cake glacé fondant au chocolat", "number": 10, "order": 5 },
  { "name": "Eclairs au chocolat", "number": 10, "order": 6 },
  { "name": "Tarte poire chocolat", "number": 10, "order": 7 },
  { "name": "Banana au chocolat", "number": 10, "order": 8 }
])

# Insert a sample user into the 'users' collection (remember to hash the password in a real application)
db.users.insertOne({
  username: "exampleUser",
  password: "hashedPassword"
})

db.wonpastries.insertOne({
  name: "Chocolate Cake",
  user: "exampleUser",
  wonDate: new Date()  
})
```

## Système d'Inscription et de Connexion

Dans le projet, j'ai mis en place un système d'inscription et de connexion. Bien que l'inscription ne soit pas obligatoire pour jouer au jeu, j'ai décidé de créer un formulaire d'inscription et d'ajouter quelques fonctionnalités pour les utilisateurs inscrits. Ces fonctionnalités comprennent la possibilité de consulter les résultats du jeu et de se déconnecter.

### Formulaire d'Inscription et de Connexion

Le formulaire d'inscription sert à la fois à l'inscription et à la connexion des utilisateurs. Si un utilisateur existe déjà dans le système, cela est considéré comme une tentative de connexion. Sinon, il est considéré comme une nouvelle inscription.

### Consultation des Résultats

Les utilisateurs inscrits ont accès à la consultation des résultats du jeu. Dans la section des résultats, j'affiche le nom d'utilisateur du gagnant. Si le gagnant était connecté lors de sa victoire, son nom d'utilisateur réel est affiché. Sinon, j'affiche "utilisateur aléatoire" pour indiquer que le gagnant n'était pas connecté lors de sa victoire.

Ce système offre une manière pratique pour les utilisateurs de suivre leurs résultats de jeu et offre des fonctionnalités supplémentaires à ceux qui choisissent de s'inscrire.
