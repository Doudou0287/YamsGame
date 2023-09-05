import WonPastry from '../Models/WonPastry.js';

export async function checkWonPastrySize(req, res, next) {
    try {
      // Count the number of documents in the "won_pastries" collection
      const pastryCount = await WonPastry.countDocuments();
  
      if (pastryCount < 50) {
        // If the count is less than 50, allow the request to continue
        next();
      } else {
        // If the count is 50 or more, respond with an error message
        res.redirect('/winners');
      }
    } catch (error) {
      // Handle any errors that may occur during the count
      res.status(500).json({ message: 'Error checking won pastry size' });
    }
  }
  