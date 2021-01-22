const HttpError = require('../models/http-error');
const {validationResult} = require('express-validator');

const Fichier = require('../models/fichier') ;

const getAllFiles = async (req, res, next) => {
    let files ;
    try {
        files = await Fichier.find().sort({'created_at': -1});
        if(!files || files.length === 0){
            return next(
                new HttpError('Could not find files')
            );
        }

    }catch (err){
        const error = new HttpError(
            'Fetching files failed, please try again later.',
            500
        );
        return next(error);
    }



    res.status(200).json(files.map(file => file.toObject({getters: true})));
};

const addFile = async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError('Invalid inputs passed, please check your data', 422);
    }

    /*get all from req.body */
    const {fileName} = req.body;
    /*in the frontend you have to put 'http://localhost:5000/' */
    const fileUrl =  req.file.path


    const file = new Fichier({
        fileName,
        fileUrl
    });

    try{
        await file.save();
    }catch(err){
        const error = new HttpError(
            'Creating file failed, please try again', 500
        );
        return next(error);
    }
    res.status(201).json(file);
};


exports.getAllFiles  = getAllFiles;
exports.addFile  = addFile;