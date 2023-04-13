import express from 'express'
import gameController from '../../../controllers/game/gameController';
import { authJwt, verifyGame } from "../middlewares";
import Validator from '../middlewares/Validator';

import uploadPhotosMiddleware from '../middlewares/files/photos/gamePhotos'

const router = express.Router();

// Validators pending
router.get('/all', gameController.getAllGames);
router.post('/new', Validator('newGameSchema'), authJwt.verifyToken, gameController.postGame);
router.get('/:id', verifyGame.checkGameExists, gameController.getSpecificGame);
router.post('/:id/picture', authJwt.verifyToken, verifyGame.checkGameExists, uploadPhotosMiddleware, gameController.uploadGamePicture);
router.get('/:id/picture',  verifyGame.checkGameExists, uploadPhotosMiddleware, gameController.downloadGamePicture);

export default router