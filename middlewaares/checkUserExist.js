// Middleware to check if the username already exists
import User from '../Models/User.js';

export const checkUsernameExistence = async (req, res, next) => {
    const { username } = req.body;
  
    try {
      const existingUser = await User.findOne({ username });
  
      if (existingUser) {
        req.session.errorMessage = 'Username already exists';
        return res.redirect('/login'); // Redirect back to the signup page
      }
  
      next();
    } catch (error) {
      req.session.errorMessage = 'Error checking username existence';
      res.redirect('/'); // Redirect back to the signup page with an error message
    }
  };
  