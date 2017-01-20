var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var recommendations = require('./views/recommendations');
var subtopicRelation = require('./controllers/subtopicRelation');

app.get('/recommendations', function (req, res) {
    var recs = recommendations(req.query.subtopic, req.query.limit, req.query.pretty);
    res.send(recs);
});

app.use('/listen', bodyParser.json());

app.post('/listen', function (req, res) {
    subtopicRelation.listen(req.body);
    res.send();
});

module.exports = app;