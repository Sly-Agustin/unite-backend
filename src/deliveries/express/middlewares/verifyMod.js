import { ModSchema } from "../../../models/mod";

const checkModNameDuplicate = async(req, res, next) => {
  try{
    const mod = await ModSchema.findOne({ name: req.body.name })
    if (mod){
      res.status(400).send({ message: 'name already used'});
      return
    }
    next();
  }
  catch(err){
    res.status(500).send({ message: err })
  }
}

const verifyMod = { checkModNameDuplicate }

module.exports = verifyMod