import express from 'express'
import modController from '../../../controllers/mod/modController';
import { authJwt, verifyMod, verifyModOwner} from "../middlewares";
import Validator from '../middlewares/Validator';

import uploadFilesMiddleware from "../middlewares/files/modFiles"

const router = express.Router();

router.get('/:id', verifyMod.checkModExists, modController.getMod);
router.post('/', Validator('modValidatorSchema'), authJwt.verifyToken, verifyMod.checkModNameDuplicate, modController.postMod);
router.put('/:id', authJwt.verifyToken, verifyMod.checkModExists, verifyModOwner.checkOwnerSameAsActiveUser, modController.putMod);
router.get('/game/:id', modController.getModsOfGame);
router.get('/user/:id', modController.getModsOfUser);
router.post('/:id/picture', verifyMod.checkModExists, modController.uploadModPhoto);
router.get('/:id/picture', verifyMod.checkModExists, modController.downloadModPhoto);
router.post('/:id/file', verifyMod.checkModExists, uploadFilesMiddleware, modController.uploadModFile);
router.get('/:id/file', verifyMod.checkModExists, modController.downloadModFile);

export default router