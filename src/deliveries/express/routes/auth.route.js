import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { verifySignUp } from '../middlewares';
import { UserSchema } from '../../../models/user';
import { RoleSchema } from '../../../models/role';
import { secret_access_token } from 'config';

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

router.post('/signin', async(req, res) => {
  const user = await UserSchema.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).json({ error: 'User not found' });
    return
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    res.status(400).json({ error: 'Incorrect password' })
    return
  }

  let token = jwt.sign({ id: user.id }, secret_access_token, {
    expiresIn: 86400, // 24 hours
  });

  var authorities = [];

  for (let i = 0; i < user.roles.length; i++) {
    let role = await RoleSchema.findById(user.roles[i]);
    authorities.push(role.name.toLowerCase());
  }

  req.session.token = token;
  res.status(200).send({
    id: user._id,
    username: user.username,
    email: user.email,
    roles: authorities,
  });
})

router.post('/signout', async(req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
})

export default router