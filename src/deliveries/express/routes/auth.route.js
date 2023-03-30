import express from 'express';
import { verifySignUp } from '../middlewares';
import authController from '../../../controllers/authController'

const router = express.Router();

router.post(
  '/register', 
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted,
  ],
  authController.register
)
router.post('/signin', authController.signIn)
router.post('/signout', authController.signOut)

export default router