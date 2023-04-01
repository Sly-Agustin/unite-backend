import express from 'express'
import modController from '../../../controllers/mod/modController';
import { verifyMod } from '../middlewares'

const router = express.Router();

// Validators pending
router.get('/:id', modController.getMod);
router.post('/',[verifyMod.checkModNameDuplicate], modController.postMod);

export default router