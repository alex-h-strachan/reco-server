/* eslint-disable no-console*/

var config = require('./config.json');
var app = require('./app');

app.listen(config.port, function () {
    console.log(`Server started on ${config.port}`);
    console.log(`try it out: go to localhost:${config.port}/recommendations?subtopic=57d80b25e04b0603003bffa3&limit=3&pretty=true`);
});