var express = require('express');
var app = express();

var recommendations = require('./views/recommendations');

app.get('/recommendations', function (req, res) {
    var recs = recommendations(req.query.subtopic, req.query.limit);
    res.send(recs);
});

module.exports = app;