import express from 'express';
import cors from 'cors';
import { port, host, origin, secretCookie } from 'config';
import profileRoute from './routes/profile.route';
import healthRoute from './routes/health.route';
import { services } from '../../services';
import { initial } from '../../services/seed/roles';

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require("cookie-session");

const corsOptions = {
  origin: origin
}

const app = express();

app.use(cors(corsOptions));

app.use('/', healthRoute);
app.use('/profile', profileRoute);

app.use(bodyParser.urlencoded({ extended: true })) // This could be true... Further testing needed
app.use(bodyParser.json())

app.use(
  cookieSession({
    name: "unite-session",
    secret: secretCookie,
    httpOnly: true
  })
);
 
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
    await initial();
    console.log(`App listening on port ${host}${port}`)
  })
}


start(services());






