var express = require('express');
var schemas = require('./models.js')
var app = express();
var bodyParser = require('body-parser');
const PORT = 9000

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/center_bank', { useNewUrlParser: true, useUnifiedTopology: true });


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'x-Resquested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', function (req, res) {
    res.send('hello world');
});

app.get('/ncm', function (req, res) {
    if (req.method == "GET") {
        const model = mongoose.model('ncm', new mongoose.Schema(schemas.ncm),'ncm');

        model.find({}, (err, resp) => {
            if (err) {
                process.stdout.write(err)
                res.send(err)
            }
            else {
                process.stdout.write(schemas.ncm)
                res.send(resp)
            }
        })
    }
});


app.listen(PORT, () => console.log(`Express started at http://localhost:${PORT}`));
