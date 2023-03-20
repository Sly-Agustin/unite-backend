import express from 'express';
import cors from 'cors';
import { port, host } from 'config';
import { connect, disconnect } from './dbConnection';

const mongoose = require('mongoose');

const app = express();
app.use(cors());

// For use later to separate things
const build = () => app;

async function startDatabase({ db }) {
  try {
    await db.connect();
    if (mongoose.STATES[mongoose.connection.readyState] == 'connected') {
      console.log('Database connected');
    }
  } 
  catch (error) {
    console.log('Could not connect to database', {
      errors: JSON.stringify(error),
    });
  }
}

async function start({ db }){
  app.listen(port, async () => {
    await startDatabase({ db });
    console.log(`App listening on port ${host}${port}`)
  })
}

start({ db: {connect, disconnect} });
