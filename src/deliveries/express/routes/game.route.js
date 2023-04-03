import express from 'express'
import gameController from '../../../controllers/game/gameController';
import { authJwt } from "../middlewares";
import Validator from '../middlewares/Validator';

const router = express.Router();

// Validators pending
router.get('/all', gameController.getAllGames);
router.post('/new', Validator('newGameSchema'), authJwt.verifyToken, gameController.postGame);

export default router