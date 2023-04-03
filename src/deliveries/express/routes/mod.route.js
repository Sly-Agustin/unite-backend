import express from 'express'
import modController from '../../../controllers/mod/modController';
import { authJwt } from "../middlewares";
import { verifyMod } from '../middlewares';
import { verifyModOwner } from '../middlewares';
import Validator from '../middlewares/Validator';

const router = express.Router();

// Validators pending
router.get('/:id', verifyMod.checkModExists, modController.getMod);
router.post('/', Validator('modValidatorSchema'), authJwt.verifyToken, verifyMod.checkModNameDuplicate, modController.postMod);
router.put('/:id', authJwt.verifyToken, verifyMod.checkModExists, verifyModOwner.checkOwnerSameAsActiveUser, modController.putMod);

export default router