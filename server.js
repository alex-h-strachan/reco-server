var config = require('./config.json');
var app = require('./app');

app.listen(config.port, function () {
    // eslint-disable-next-line no-console
    console.log(`Server started on ${config.port}`);
});