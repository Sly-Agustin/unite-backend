import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import { dburl } from "config";
import util from 'util'

const storage = new GridFsStorage({
    url: dburl,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["application/zip"];

        if (match.indexOf(file.mimetype) === -1) {
            return null;
        }
      
        return {
            bucketName: "modFile",
            filename: `${Date.now()}-mod-${file.originalname}`,
        };
    },
});

const uploadFiles = multer({ storage: storage }).single("file");
const uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;