import express from 'express';
import cors from 'cors';
import { port, host } from 'config';

const app = express();
app.use(cors());

// For use later to separate things
const build = () => app;

app.listen(port, () => {
  console.log(`App listening on port ${host}${port}`)
})