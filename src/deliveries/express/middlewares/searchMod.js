import { ModSchema } from "../../../models/mod";

const checkParamsAndBody = async (req, res, next) => {
  if(!req.body.name) {
    return res.status(400).send({message: 'name field required'})
  }
  if(!req.params.id) {
    return res.status(400).send({ message: 'name for the mod was not provided' })
  }
  next();
}

const searchMod = { checkParamsAndBody }

module.exports = searchMod