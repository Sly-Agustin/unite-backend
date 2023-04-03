import { ModSchema } from '../../../models/mod'
import jwt from 'jsonwebtoken'
import { secret_access_token } from 'config'

const checkOwnerSameAsActiveUser = async(req, res, next) => {
  const token = req.session.token;
  const tokenDeconstructed = jwt.verify(token, secret_access_token);
  const modId = req.params.id;
  try{
    const mod = await ModSchema.findById(modId);
    const userId = mod.ownerId;
    if (tokenDeconstructed.id != userId){
      res.status(401).send({ message: 'Unauthorized' });
      return;
    }
  }
  catch(err){
    res.status(500).send({ message: err })
    return;
  }
  next();
}

const verifyModOwner = { checkOwnerSameAsActiveUser }

module.exports = verifyModOwner