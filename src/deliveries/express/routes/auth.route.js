import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { verifySignUp } from '../middlewares';
import { UserSchema } from '../../../models/user';
import { RoleSchema } from '../../../models/role';

const router = express.Router();

router.post(
  '/register', 
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted,
  ],
  async(req, res) => {
    // validations pending, do them with joi, also do a controller after testing that this works
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = new UserSchema({
        username: req.body.username,
        email: req.body.email,
        password: password
    });

    try{
      const role = await RoleSchema.findOne({ name: "user" });

      user.roles = [role._id];
      await user.save();
    }
    catch(err){
      res.status(500).send({ message: err });
    }
    
    // We need to check for additional roles, do that after testing

    try {
      const savedUser = await user.save();
      res.json({
          data: savedUser
      })
    } 
    catch (error) {
        res.status(400).json({error})
    }

    //res.send({ message: "User was registered successfully!" });
  }
)

export default router