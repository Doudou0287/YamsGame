import express from "express";
import route from "./routes/routes";
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import Pastry from './Models/Pastry.js'; // Import the Pastry model
// mongodb://127.0.0.1:27017/tpNodeJS


dotenv.config();
const { APP_LOCALHOST : hostname, APP_PORT: port , DATABASE} = process.env;
const app = express();

//DB CONNEXION
mongoose.connect(DATABASE, {

serverSelectionTimeoutMS: 30000, // Increase connection timeout
useNewUrlParser: true,
useUnifiedTopology: true,
});

const db = mongoose.connection;
// Handle connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({ extended: true }));

// Set Session
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);

//routes
app.use('/', route);


//listen
app.listen(port, () => {
  console.log(`listening at http://${hostname}:${port}`);
});
