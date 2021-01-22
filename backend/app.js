const fs = require('fs');
const path = require('path');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const filesRoutes = require('./routes/files-routes');
const HttpError = require('./models/http-error');


const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());


app.use('uploads/images', express.static(path.join('uploads','images')));
app.use('uploads/files',express.static(path.join('uploads','files')));

app.use('/api/files',filesRoutes);

app.use((req, res, next)=>{
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

app.use((error,req, res, next) => {
    if(req.file){
        fs.unlink(req.file.path, ()=> {
            console.log(err);
        });
    }
    if(res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error occurred!'});
});

mongoose
    .connect(
        'mongodb://localhost/voguelTest'
    )
    .then(()=>{
        app.listen(5000);
    })
    .catch( err => {
        console.log(err);
    });