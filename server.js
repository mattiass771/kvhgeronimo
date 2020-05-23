const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI || process.env.ATLAS_URI;
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

app.use('/equipment', equipRouter);
app.use('/soldier', soldierRouter);
app.use('/equipInfo', equipInfoRouter);
app.use('/gallery', galleryRouter);
app.use('/aboutUs', aboutUsRouter);
app.use('/reports', reportsRouter);
app.use('/calendar', calendarRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('geroproject/build'));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname,  "geroproject/build", "index.html"));
    });
}

app.listen(port, () => {
    console.log(`Server bezi pod portom: ${port}`);
});