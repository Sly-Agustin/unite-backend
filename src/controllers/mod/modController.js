import mongoose from 'mongoose';
import { ModSchema } from '../../models/mod'

const upload = require("../../deliveries/express/middlewares/files/photos/modPhotos");
import { dburl } from 'config'
const mongodb = require('mongodb');

const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;
const mongoClient = new MongoClient(dburl);

const getMod = async(req, res) => {
  const modId = req.params.id;
  try{
    let mod = await ModSchema.findById(modId);
    res.status(200).json({ data: mod });
  }
  catch(err){
    res.status(500).send({ message: err });
  }
}

const postMod = async(req, res) => {
  const newMod = new ModSchema({
    name: req.body.name,
    description : req.body.description,
    additionalInfo: req.body.additionalInfo,
    ownerId: new mongoose.Types.ObjectId(req.body.ownerId),
    gameId: new mongoose.Types.ObjectId(req.body.gameId),
    comments: []
  });

  try{
    await newMod.save();
    res.status(200).send({ message: 'mod succesfully created' })
  }
  catch(err){
    res.status(500).send({ message: err });
  }

}

const putMod = async(req, res) => {
  let modId = req.params.id;
  try{
    let mod = await ModSchema.findById(modId);
    if (req.body.name) mod.name = req.body.name;
    if (req.body.description) mod.description = req.body.description;
    if (req.body.additionalInfo) mod.additionalInfo = req.body.additionalInfo;
    await mod.save();
  }
  catch(err){
    res.status(500).send({ message: err });
  }

  res.status(200).send({ message: 'Mod updated successfully'});
}

const getModsOfGame = async(req, res) => {
  let gameId = req.params.id;
  try{
    const mods = await ModSchema.find({ gameId: gameId });
    res.status(200).send(mods);
  }
  catch(err){
    res.status(500).send({ message: err });
  }
}

const getModsOfUser = async(req, res) => {
  let ownerId = req.params.id;
  try{
    const mods = await ModSchema.find({ ownerId: ownerId });
    res.status(200).send(mods);
  }
  catch(err){
    res.status(500).send({ message: err });
  }
}

const uploadModPhoto = async (req, res) => {
  try {
    await upload(req, res);
    console.log(req.file);

    if (req.file == undefined) {
      return res.send({
        message: "You must select a file.",
      });
    }

    return res.send({
      message: "File has been uploaded.",
    });
  } catch (error) {
    console.log(error);
    return res.send({
      message: "Error when trying upload image: ${error}",
    });
  }
}

const downloadModPhoto = async(req, res) => {
  if (req.params.idPic==null){
    res.send({
      error: 'no filename specified'
    })
  }
  res.set("Content-Type", "image/png");

  const db = mongoose.connection.db;
  const bucket = new mongodb.GridFSBucket(db, { bucketName: 'modPicture' });
  try{
    const stream = bucket.openDownloadStream(new mongoose.Types.ObjectId(req.params.idPic)).pipe(res);
  }
  catch(err){
    res.status(404).send({message: 'mod photo not found'})
    return;
  }
};

export default { getMod, postMod, putMod, getModsOfGame, getModsOfUser, uploadModPhoto, downloadModPhoto }