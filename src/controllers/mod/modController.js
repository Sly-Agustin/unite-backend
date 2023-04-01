import mongoose from 'mongoose';
import { ModSchema } from '../../models/mod'

const getMod = async(req, res) => {
  const modId = req.params.id;
  try{
    let mod = await ModSchema.findById(modId);
    if (!mod) {
      res.status(400).json({ message: 'mod id not found' });
      return;
    }
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

export default { getMod, postMod }