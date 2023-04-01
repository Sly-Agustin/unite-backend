import express from 'express'
import gameController from '../../../controllers/game/gameController';
import { authJwt } from "../middlewares";

const router = express.Router();

// Validators pending
router.get('/all', gameController.getAllGames);
router.post('/new', authJwt.verifyToken, gameController.postGame);

export default router