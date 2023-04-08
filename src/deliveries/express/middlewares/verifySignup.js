import { UserSchema } from '../../../models/user'
import roles from '../../../models/roles';
import registrationErrors from '../../../services/errors/registration';

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const usernameExists = await UserSchema.findOne({
      username: req.body.username
    })
    if (usernameExists != undefined) {
      res.status(400).send({ 
        status: registrationErrors.userAlreadyExists,
        message: "Failed! Username is already in use!" 
      });
      return;
    }
    
    const userExists = await UserSchema.findOne({ email: req.body.email })
    if (userExists != undefined) {
      res.status(400).send({ 
        status: registrationErrors.emailAlreadyExists,
        message: "Failed! Email is already in use!" 
      });
      return;
    }
  }  
  catch(err){
      res.status(500).send({ message: err });
  }

  next();
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!roles.includes(req.body.roles[i])) {
        res.status(400).send({
          message: 'Invalid role: ${req.body.roles[i]} is not a valid role'
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;