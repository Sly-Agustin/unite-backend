import { ModSchema } from "../../../models/mod";

const checkModNameDuplicate = async(req, res, next) => {
  if (!req.body.name){
    res.status(400).send({ message: 'name for the mod was not provided' })
    return;
  }
  try{
    const mod = await ModSchema.findOne({ name: req.body.name })
    if (mod){
      res.status(400).send({ message: 'name already used'});
      return;
    }
    next();
  }
  catch(err){
    res.status(500).send({ message: err })
    return;
  }
}

const checkModExists = async(req, res, next) => {
  if (!req.params.id) {
    res.status(400).send({ message: 'mod id was not provided' });
    return;
  }
  try {
    const mod = await ModSchema.findById(req.params.id);
    if (!mod){
      res.status(400).send({ message: 'mod does not exist' });
      return;
    }
  }
  catch(err){
    res.status(500).send({ message: err })
    return;
  }
  next();
}

const verifyMod = { checkModNameDuplicate, checkModExists }

module.exports = verifyMod