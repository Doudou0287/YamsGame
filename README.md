# YamsGame

## Database Setup

To set up the database for the Chocolatey Game, run the following MongoDB commands:

```bash
# Use the 'chocolatey_game' database
use chocolatey_game

# Create collections for pastries and users
db.createCollection("pastries")
db.createCollection("users")
db.createCollection("won_pastries") 

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

db.won_pastries.insertOne({
  name: "Chocolate Cake",
  user: "exampleUser",
  wonDate: new Date()  
})
