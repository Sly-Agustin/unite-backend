import { connect, disconnect } from "../deliveries/express/dbConnection";

export const services = () => {
  return { db: { connect, disconnect } };
};