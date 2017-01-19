var fs = require('fs');

function gatherTestPaths(dir) {
    var names = fs.readdirSync(dir);
    return names.map(
        name => dir + '/' + name
    );
}

var testPaths = [
    ...gatherTestPaths(__dirname + '/controllers'),
    ...gatherTestPaths(__dirname + '/views'),
];

testPaths.map( path => require(path));
