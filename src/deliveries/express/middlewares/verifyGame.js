import { GameSchema } from '../../../models/game'

const checkGameExists = async(req, res, next) => {
  if (!req.params.id) {
    res.status(400).send({ message: 'game id was not provided' });
    return;
  }
  try{
    const game = await GameSchema.findById(req.params.id);
    if(!game) {
      res.status(400).send({ message: 'game does not exist' });
      return;
    }
  }
  catch(err){
    res.status(500).send({ message: err })
    return;
  }
  next();
}

const verifyGame = { checkGameExists }
module.exports = verifyGame;