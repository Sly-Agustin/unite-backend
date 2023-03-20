import mongoose from 'mongoose';
import { dburl } from 'config';

const disconnect = async () => {
  return await mongoose.connection.close();
};

const connect = async () => {
  console.log("what is dburl "+dburl);
  return await mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export { connect, disconnect };