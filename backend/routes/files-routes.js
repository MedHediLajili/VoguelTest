const express = require('express');
const { check } = require('express-validator');

const filesController = require('../controllers/files-controller');
const fileUpload = require('../middleware/file-upload');

const router = express.Router();






router.get('/',filesController.getAllFiles);


router.post(
    '/upload', 
    fileUpload.single('fileUpload'),
    [
        check('fileName')
        .not()
        .isEmpty(),
    ], 
    filesController.addFile
    );




module.exports = router;