import {checkForYams, checkForCarre, checkForDouble} from '../utils/utils.js'
import Pastry from '../Models/Pastry.js';
import User from '../Models/User.js';
import bcrypt from 'bcrypt';

let names = []
export const HomeController = (req, res) => {
  const errorMessage = req.session.errorMessage || ''; // Get the error message from the session

  // Clear the error message from the session so it doesn't show again on the next request
  req.session.errorMessage = '';

  res.render('home/index', { errorMessage });
};


export const gameController = (req, res) => {
  const successMessage = req.session.successMessage || ''; // Get the error message from the session

  // Clear the error message from the session so it doesn't show again on the next request
  req.session.errorMessage = '';
  let message
  let names
  res.render('home/game',  { message, names, successMessage });
};

// export const resultController = (req, res) => {
//   const diceRollData = JSON.parse(req.body.diceRollData);
//   res.render('home/gameRes', { diceRollData });
// };

export const resultController = async (req, res) => {
  const successMessage = req.session.successMessage || '';
  const diceRollData = JSON.parse(req.body.diceRollData);
  console.log(diceRollData)
  const isYams = checkForYams(diceRollData);
  const isCarre = checkForCarre(diceRollData);
  const isDouble = checkForDouble(diceRollData);
  let message
  let pastryNames = [];
  
  if (isYams) {
    // Deduct 3 pastries at random from the database
    const randomPastries = await Pastry.aggregate([
      { $match: {} },
      { $sample: { size: 3 } },
    ]);

    // Update the selected pastries to reduce their numbers
    const updatedPastries = await Pastry.updateMany(
      { _id: { $in: randomPastries.map((pastry) => pastry._id) } },
      { $inc: { number: -1 } } // Reduce the "number" field by 1
    );

    message = 'Congratulations, you won Yams!';
    pastryNames = randomPastries.map((pastry) => pastry.name);
    names = names.concat(pastryNames);
    console.log('_______________randomPastries______________',randomPastries)
    console.log('_______________name______________',names)
    res.render('home/game', {message , names });

  } else if (isCarre) {
    const randomPastries = await Pastry.aggregate([
      { $match: {} },
      { $sample: { size: 2 } },
    ]);
  
    // Update the selected pastries to reduce their numbers
    const updatedPastries = await Pastry.updateMany(
      { _id: { $in: randomPastries.map((pastry) => pastry._id) } },
      { $inc: { number: -1 } } // Reduce the "number" field by 1
    );
  
    // Get the names of the selected pastries
    pastryNames = randomPastries.map((pastry) => pastry.name);
    names = names.concat(pastryNames);
    message = 'Congratulations, you won Carre!';
    
    // Render the names as a comma-separated string or in any desired format
  //  names = pastryNames;
    
    console.log('_______________names______________', names);
    res.render('home/game', { message, names, successMessage });
  } else if(isDouble){
    const randomPastries = await Pastry.aggregate([
      { $match: {} },
      { $sample: { size: 1 } },
    ]);

    // Remove the selected pastries from the database
    const updatedPastries = await Pastry.updateMany(
      { _id: { $in: randomPastries.map((pastry) => pastry._id) } },
      { $inc: { number: -1 } } // Reduce the "number" field by 1
    );
    message = 'Congratulations, you won Double!';

    let name = randomPastries[0].name;
    names.push(name);

    console.log('_______________name______________', names);
    res.render('home/game', { message, names, successMessage });
   
  } else {
    message = 'Sorry, you did not win any pastry.' 
    res.render('home/game', { message, names ,successMessage});
    // res.json({ message: 'Sorry, you did not win any pastry.' });
  }
};




export const signUp = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document with the hashed password
    const newUser = new User({ username, password: hashedPassword });

    // Save the user document to the database
    await newUser.save();
    req.session.successMessage = 'Sign up successful, welcome ' + newUser.username;
    res.redirect('/game');
  } catch (error) {
    res.status(500).send('Error: Could not sign up');
  }
}