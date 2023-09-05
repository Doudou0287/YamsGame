import express from "express";
const router = express.Router();
import {checkUsernameExistence} from "../middlewaares/checkUserExist.js"
import {HomeController, gameController, resultController, signUp} from "../controllers/gameController.js";

router.get("/", HomeController );

router.get("/game", gameController );

router.post('/gameResults',resultController);

router.post('/signUp', checkUsernameExistence , signUp);

export default router;