const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const mime = require('mime');
const fileUpload = require('express-fileupload')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use (function (req, res, next) {
    if (req.secure) {
            next();
    } else if (!req.secure) {
            res.redirect('https://' + req.headers.host + req.url);
    }
});

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, 
    useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB databaza je uspesne pripojena");
});

const equipRouter = require('./routes/equipment');
const soldierRouter = require('./routes/soldier');
const equipInfoRouter = require('./routes/equipInfo');
const galleryRouter = require('./routes/gallery');
const aboutUsRouter = require('./routes/aboutUs');
const reportsRouter = require('./routes/reports');
const calendarRouter = require('./routes/calendar');
const libraryRouter = require('./routes/library');

app.use('/equipment', equipRouter);
app.use('/soldier', soldierRouter);
app.use('/equipInfo', equipInfoRouter);
app.use('/gallery', galleryRouter);
app.use('/aboutUs', aboutUsRouter);
app.use('/reports', reportsRouter);
app.use('/calendar', calendarRouter);
app.use('/library', libraryRouter);
app.use(fileUpload())

//Upload Endpoint
app.post('/fileUpload', (req, res) => {
    if(req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files.file;
    file.mv(`${__dirname}/geroproject/public/uploads/${file.name}`, err => {
        if(err) {
            console.error(err);
            return res.status(500).send(err);
        }

        res.json({ fileName: file.name });
    });
});

//Get Files from uploads
app.get('/getFiles', (req, res) => {

    const dirPath = path.join(__dirname, 'geroproject', 'public', 'uploads');

    fs.readdir(dirPath, (err, files) => {
        if (err) {
            return console.log(`Unable to scan directory: ${err}`);
        }
        if (files) {
            const outputArr = []
            files.forEach(file => {
                outputArr.push(file)
            })
            console.log(outputArr)
            return res.json( {outputArr} )
        }
    })
});

//Download Files from uploads
app.get('/download', function(req, res){
    const file = req.query[0];
    const filePath = `${__dirname}/geroproject/public/uploads/${file}`;
    res.download(filePath, file);
});

//Delete a File from uploads
app.get('/delete', function(req, res){
    const file = req.query[0];
    const filePath = `${__dirname}/geroproject/public/uploads/${file}`;
    fs.unlink(filePath, () => {
        res.send ({
            status: "200",
            responseType: "string",
            response: "success"
        });
    });
});


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('geroproject/build'));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname,  "geroproject/build", "index.html"));
    });
}

app.listen(port, () => {
    console.log(`Server bezi pod portom: ${port}`);
});