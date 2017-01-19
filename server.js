var config = require('./config.json');
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(config.port, function () {
    // eslint-disable-next-line no-console
    console.log(`Server started on ${config.port}`);
});