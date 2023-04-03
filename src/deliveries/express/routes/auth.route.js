import express from 'express';
import { verifySignUp } from '../middlewares';
import authController from '../../../controllers/authController';
import Validator from '../middlewares/Validator';

const router = express.Router();

router.post(
  '/register', 
  Validator('registerSchema'),
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted,
  ],
  authController.register
)
router.post('/signin', Validator('signInSchema'), authController.signIn)
router.post('/signout', authController.signOut)

export default router