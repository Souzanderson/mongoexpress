var express = require('express');
var schemas = require('./models.js')
var dbconfig = require('./dbconfig.js')
var app = express();
var bodyParser = require('body-parser');
const PORT = 9000

const mongoose = require('mongoose');
mongoose.connect(dbconfig.mongoexterno, { useNewUrlParser: true, useUnifiedTopology: true });

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
    res.send('MongoDb using Mongoose!');
});

app.get('/ncm', function (req, res) {
    if (String(req.query.find)!=="undefined")
        var find = { "descricao": { "$regex": `.*${req.query.find}.*` } }
    else find = {}
    console.log(find);
    if (req.method == "GET") {
        schemas.ncm.find(find, (err, resp) => {
            if (err) {
                res.send(err)
            }
            else {
                res.send(resp)
            }
        })
    }
});


app.listen(PORT, () => console.log(`Express started at http://localhost:${PORT}`));
