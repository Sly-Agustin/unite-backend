import { GameSchema } from '../../models/game'

const getAllGames = async(req, res) => {
  const games = await GameSchema.find({})
  res.status(200).send({
    games: games
  })
}

const postGame = async(req, res) => {
  const newGame = new GameSchema({
    name: req.body.name
  });
  try{
    await newGame.save();
    res.status(200).send({ message: 'game added successfully' })
  }
  catch(err){
    res.status(500).send({ message: err }) 
  }
}

export default { getAllGames, postGame }