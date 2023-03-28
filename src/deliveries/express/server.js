import express from 'express';
import cors from 'cors';
import { port, host } from 'config';
import profileRoute from './routes/profile.route';
import { services } from '../../services';

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());

app.use('/profile', profileRoute);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 
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

async function start({ db }) {
  app.listen(port, async () => {
    await startDatabase({ db });
    console.log(`App listening on port ${host}${port}`)
  })
}

start(services());






