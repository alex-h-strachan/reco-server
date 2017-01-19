var express = require('express');
var app = express();

app.get('/recommendations', function (req, res) {
    res.send('Hello World!');
});

module.exports = app;