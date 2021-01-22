const multer = require('multer');
const { v1 : uuidv1 } = require('uuid');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg':'jpg',
    'application/pdf': 'pdf',
};


const fileUpload = multer({
    storage: multer.diskStorage({
        destination:(req, file, cb) => {
            const ext = MIME_TYPE_MAP[file.mimetype];
            if(ext=== 'pdf'){
                cb(null, 'uploads/files');
            }
            else {
                cb(null, 'uploads/images')
            }
        },
        filename: (req, file, cb) => {
            const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null,uuidv1()+'.'+ ext);
        },
    }),
    fileFilter: (req, file, cb) => {
        const isValid = !!MIME_TYPE_MAP[file.mimetype];
        let error = isValid ? null : new Error('Invalid mime type!');
        cb(error, isValid);
    }
});

module.exports = fileUpload;