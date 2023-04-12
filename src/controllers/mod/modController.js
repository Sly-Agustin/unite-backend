import mongoose from 'mongoose';
import { ModSchema } from '../../models/mod'

const upload = require("../../deliveries/express/middlewares/files/photos/modPhotos");
const mongodb = require('mongodb');


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
    res.status(200).send({ message: 'mod succesfully created', id: newMod._id })
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

    if (req.file == undefined) {
      return res.send({
        message: "You must select a file.",
      });
    }

    let mod = await ModSchema.findById(req.params.id);
    mod.picture=req.file.id;
    await mod.save();

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
  res.set("Content-Type", "image/png");

  const mod = await ModSchema.findById(req.params.id);
  const modPicture = mod.picture;
  if(!modPicture){
    res.set("Content-Type", "application/json");
    res.status(404).json({message: 'mod photo not found'})
    return;
  }

  const db = mongoose.connection.db;
  const bucket = new mongodb.GridFSBucket(db, { bucketName: 'modPicture' });
  try{
    const stream = bucket.openDownloadStream(new mongoose.Types.ObjectId(modPicture)).pipe(res);
  }
  catch(err){
    res.status(404).send({message: 'mod photo not found'})
    return;
  }
};

const uploadModFile = async(req, res) => {
  try {
    if (req.file == undefined) {
      return res.send({
        message: "You must select a file.",
      });
    }

    let mod = await ModSchema.findById(req.params.id);
    mod.file=req.file.id;
    await mod.save();

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

const downloadModFile = async(req, res) => {
  const mod = await ModSchema.findById(req.params.id);
  const modFile = mod.file;
  if(!modFile){
    res.set("Content-Type", "application/json");
    res.status(404).json({message: 'mod photo not found'})
    return;
  }

  const db = mongoose.connection.db;
  const bucket = new mongodb.GridFSBucket(db, { bucketName: 'modFile' });
  try{
    const stream = bucket.openDownloadStream(new mongoose.Types.ObjectId(modFile)).pipe(res);
  }
  catch(err){
    res.status(404).send({message: 'mod photo not found'})
    return;
  }
};

export default { getMod, postMod, putMod, getModsOfGame, getModsOfUser, uploadModPhoto, downloadModPhoto, uploadModFile, downloadModFile }