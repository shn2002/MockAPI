const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const fs = require('fs');
const cors = require('cors')
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/profiles',cors(), (req, res, next) => {
    const rawdata = fs.readFileSync('data/profiles.json');
    let profiles = JSON.parse(rawdata);
    res.json(profiles);
});


app.get('/reports',cors(), (req, res, next) => {
    const rawdata = fs.readFileSync('data/reports.json');
    let reports = JSON.parse(rawdata);
    res.json(reports);
});


app.use((err, req, res, next) => {
    if (err) {
        res.status(500).json({
            message: err.message
        })

    }
});

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
})
