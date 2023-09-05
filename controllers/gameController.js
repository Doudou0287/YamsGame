import {checkForYams, checkForCarre, checkForDouble, formatDate} from '../utils/utils.js'
import Pastry from '../Models/Pastry.js';
import User from '../Models/User.js';
import WonPastry from '../Models/WonPastry.js';

import bcrypt from 'bcrypt';


export const HomeController = (req, res) => {
  const errorMessage = req.session.errorMessage || ''; // Get the error message from the session
  const user = req.session.user || null;
  // Clear the error message from the session so it doesn't show again on the next request
  req.session.errorMessage = '';

  res.render('home/index', { errorMessage, user });
};


export const gameController = (req, res) => {
  const successMessage = req.session.successMessage || ''; // Get the error message from the session

  // Clear the error message from the session so it doesn't show again on the next request
  // req.session.successMessage = '';
  const user = req.session.user || null;
  let message
  let names
  res.render('home/game',  { message, names, successMessage, user });
};

export const resultController = async (req, res) => {
  const user = req.session.user || null;
  const successMessage = req.session.successMessage || '';
  const diceRollData = JSON.parse(req.body.diceRollData);
  console.log(diceRollData)
  const isYams = checkForYams(diceRollData);
  const isCarre = checkForCarre(diceRollData);
  const isDouble = checkForDouble(diceRollData);
  let username 
  if(user){
    username = user.username
  }
  else{
    username = "randomUser"
  }
  let message
  let pastryNames = [];
  let names = []
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
   
    res.render('home/game', {message , names, successMessage, user });

    await WonPastry.insertMany(randomPastries.map((pastry) => ({
      name: pastry.name,
      user: username, // Replace with the actual username
      wonDate: new Date()   // Add the current date and time
    })));

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
    
    await WonPastry.insertMany(randomPastries.map((pastry) => ({
      name: pastry.name,
      user: username, // Replace with the actual username
      wonDate: new Date()   // Add the current date and time
    })));
    // Render the names as a comma-separated string or in any desired format
  //  names = pastryNames;
    
    console.log('_______________names______________', names);
    res.render('home/game', { message, names, successMessage, user });
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

    await WonPastry.insertMany(randomPastries.map((pastry) => ({
      name: pastry.name,
      user: username, // Replace with the actual username
      wonDate: new Date()   // Add the current date and time
    })));
    let name = randomPastries[0].name;
    names.push(name);

    console.log('_______________name______________', names);
    res.render('home/game', { message, names, successMessage, user });
   
  } else {
    message = 'Sorry, you did not win any pastry.' 
    res.render('home/game', { message, names ,successMessage, user});
    // res.json({ message: 'Sorry, you did not win any pastry.' });
  }
};

export const signUpOrLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    console.log(user)
    if (!user) {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user document with the hashed password
      const newUser = new User({ username, password: hashedPassword });

      // Save the user document to the database
      await newUser.save();

      // Save user data in the session
      req.session.user = {
        _id: newUser._id,
        username: newUser.username,
        // Add any other user data you want to store in the session
      };
      req.session.successMessage = 'Sign up successful, welcome ' + newUser.username;
      res.redirect('/game');
    }
    else{
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log(passwordMatch)
      if (passwordMatch) {
        // Passwords match, user is authenticated
        // Save user data in the session
        req.session.user = {
          _id: user._id,
          username: user.username,
          // Add any other user-related data you need
        };
        console.log(req.session.user)
        req.session.successMessage = 'Logged in successfully, welcome ' + req.session.user.username;
        console.log('-----------------')
        console.log(req.session.successMessage)
        res.redirect('/game'); 
      } else {
        // Passwords don't match, show an error message
        req.session.errorMessage = 'Invalid username or password';
        res.redirect('/');
      }
    }
      
    
    
  } catch (error) {
    res.status(500).send('Error: Could not sign up');
  }
}

export const winners = async (req, res) => {
  try {
      // Fetch data from the "won_pastries" collection
      const winnersData = await WonPastry.find({}).sort({ wonDate: -1 }); // Sort by wonDate in descending order
  
      res.render('home/winners', { winnersData, formatDate }); // Pass the data to the view
    } catch (error) {
      // Handle any errors that may occur during database retrieval
      res.status(500).send('Error fetching winners data');
    }
}

export const logout = (req, res) => {
  // Destroy the user's session to reset everything
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      // Handle the error if necessary
    } else {
      // Redirect the user to a page after logout (e.g., home page)
      res.redirect('/');
    }
  });
}