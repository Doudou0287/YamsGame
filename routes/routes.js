import express from "express";
const router = express.Router();
import {checkUsernameExistence} from "../middlewaares/checkUserExist.js"
import {checkWonPastrySize} from "../middlewaares/checkSize.js"


import {HomeController, gameController, resultController, signUpOrLogin, winners} from "../controllers/gameController.js";

router.get("/", HomeController );

router.get('/game',checkWonPastrySize, gameController );

router.post('/gameResults',resultController);

router.post('/signUp' , signUpOrLogin);

router.get('/winners', winners);

router.get('/logout', (req, res) => {
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
});

export default router;