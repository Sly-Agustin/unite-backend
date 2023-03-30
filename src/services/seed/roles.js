import { RoleSchema } from '../../models/role'

async function initial() {
  const numberOfDocuments = await RoleSchema.estimatedDocumentCount();
  if(numberOfDocuments===0){
    new RoleSchema({ name: "user" }).save();
    new RoleSchema({ name: "moderator" }).save();
    new RoleSchema({ name: "admin" }).save();
  }
}

export { initial }