import express from "express";
const router = express.Router();
import {checkUsernameExistence} from "../middlewaares/checkUserExist.js"
import {checkWonPastrySize} from "../middlewaares/checkSize.js"


import {HomeController, gameController, resultController, signUpOrLogin, winners, logout} from "../controllers/gameController.js";

router.get("/", HomeController );

router.get('/game',checkWonPastrySize, gameController );

router.post('/gameResults',resultController);

router.post('/signUp' , signUpOrLogin);

router.get('/winners', winners);

router.get('/logout', logout);

export default router;