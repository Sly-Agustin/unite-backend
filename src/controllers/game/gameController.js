import { GameSchema } from '../../models/game'
import { GamePictureSchema } from '../../models/gamePicture'
import mongoose from 'mongoose';

const mongodb = require('mongodb');

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

const getSpecificGame = async(req, res) => {
  const id = req.params.id;
  try{
    const game = await GameSchema.findById(id);
    if(!game){
      res.status(404).send({ message: 'game not found' });
      return;
    }
    res.status(200).send(game);
  }
  catch(err){
    res.status(500).send({ message: err })
  }
}

const uploadGamePicture = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.send({
        message: "You must select a file.",
      });
    }

    let game = await GameSchema.findById(req.params.id);
    game.picture=req.file.id;
    await game.save();

    return res.send({
      message: "Picture has been uploaded.",
    });
  } catch (error) {
    console.log(error);
    return res.send({
      message: "Error when trying upload image: ${error}",
    });
  }
}

const downloadGamePicture = async (req, res) => {
  const game = await GameSchema.findById(req.params.id);
  const gamePicture = game.picture;
  if(!gamePicture){
    res.set("Content-Type", "application/json");
    res.status(404).json({message: 'mod photo not found'})
    return;
  }

  const db = mongoose.connection.db;
  const bucket = new mongodb.GridFSBucket(db, { bucketName: 'gamePicture' });
  try{
    const stream = bucket.openDownloadStream(new mongoose.Types.ObjectId(gamePicture)).pipe(res);
  }
  catch(err){
    res.status(404).send({message: 'game photo not found'})
    return;
  }
}

export default { getAllGames, postGame, getSpecificGame, uploadGamePicture, downloadGamePicture }