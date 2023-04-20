import express from 'express'
import modController from '../../../controllers/mod/modController';
import { authJwt, verifyMod, verifyModOwner, verifyGame, searchMod} from "../middlewares";
import Validator from '../middlewares/Validator';

import uploadFilesMiddleware from "../middlewares/files/modFiles"

const router = express.Router();

router.get('/:id', verifyMod.checkModExists, modController.getMod);
router.post('/', Validator('modValidatorSchema'), authJwt.verifyToken, verifyMod.checkModNameDuplicate, modController.postMod);
router.put('/:id', authJwt.verifyToken, verifyMod.checkModExists, verifyModOwner.checkOwnerSameAsActiveUser, modController.putMod);
router.get('/game/:id', verifyGame.checkGameExists, modController.getModsOfGame);
router.get('/game/:id/search', searchMod.checkParamsAndBody, verifyGame.checkGameExists, modController.searchMods);
router.get('/user/:id', modController.getModsOfUser);
router.post('/:id/picture', authJwt.verifyToken, verifyMod.checkModExists, verifyModOwner.checkOwnerSameAsActiveUser, modController.uploadModPhoto);
router.get('/:id/picture', verifyMod.checkModExists, modController.downloadModPhoto);
router.post('/:id/file', authJwt.verifyToken, verifyMod.checkModExists, uploadFilesMiddleware, modController.uploadModFile);
router.get('/:id/file', verifyMod.checkModExists, modController.downloadModFile);

export default router