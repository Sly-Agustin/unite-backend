import mongoose from "mongoose";
const mongodb = require('mongodb');
const fs = require('fs');

const express = require("express");
const router = express.Router();
import { authJwt } from "../middlewares";

import { UserSchema } from "../../../models/user";
const multer = require('multer');
const upload = multer();


router.post('/uploadProfileImage', upload.single('file'), async(req, res) => { 
  const db = mongoose.connection.db;
  const bucket = new mongodb.GridFSBucket(db, { bucketName: 'profilePicture' });
  if(req.file===undefined){
    console.log("undefined file")
  }
  else {
    console.log("not undefined file")
  }
  // Second parameter is the name assigned in db, first is the received
  fs.createReadStream('test.txt').pipe(bucket.openUploadStream('test.txt'));

  res.send({
    message: 'all guchi',
  })
})

router.get('/profileImage/id/:photoid', async(req, res) => {
  if (req.params.photoid==null){
    res.send({
      error: 'no photoid specified'
    })
  }
  const db = mongoose.connection.db;
  const bucket = new mongodb.GridFSBucket(db, { bucketName: 'profilePicture' });
  
  const cursor = bucket.find({_id: new mongoose.Types.ObjectId(req.params.photoid)});
  cursor.forEach(doc => console.log(doc));

  res.send({
    message: 'success'
  })
})

router.get('/profileImage/filename/:filename', async(req, res) => {
  if (req.params.filename==null){
    res.send({
      error: 'no filename specified'
    })
  }
  const db = mongoose.connection.db;
  const bucket = new mongodb.GridFSBucket(db, { bucketName: 'profilePicture' });
  
  const cursor = bucket.find({filename: req.params.filename});
  let data;
  await cursor.forEach(doc => {
    data=doc;
  });

  res.send({
    message: 'success',
    data: data
  })
})

router.get('/profileImage/download/:filename', async(req, res) => {
  if (req.params.filename==null){
    res.send({
      error: 'no filename specified'
    })
  }
  res.set("Content-Type", "image/png");

  const db = mongoose.connection.db;
  const bucket = new mongodb.GridFSBucket(db, { bucketName: 'profilePicture' });

  const stream = bucket.openDownloadStreamByName(req.params.filename).pipe(res);

})

router.get('/', authJwt.verifyToken, async(req, res) => {
  if (!req.body.username) {
    res.status(400).json({ message: 'no username provided'})
    return
  }
  let user = await UserSchema.findOne({username: req.body.username});
  if (!user) {
    res.status(400).json({ message: 'user not found' })
  }
  res.status(200).json({
    userdata: user
  })
})

export default router;