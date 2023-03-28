import mongoose from 'mongoose';
import { dburl } from 'config';

const disconnect = async () => {
  return await mongoose.connection.close();
};

const connect = async () => {
  return await mongoose.connect(dburl);
};

export { connect, disconnect };