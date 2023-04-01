import express from 'express'
import modController from '../../../controllers/mod/modController';
import { authJwt } from "../middlewares";
import { verifyMod } from '../middlewares'

const router = express.Router();

// Validators pending
router.get('/:id', modController.getMod);
router.post('/', authJwt.verifyToken, [verifyMod.checkModNameDuplicate], modController.postMod);

export default router