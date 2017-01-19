var fs = require('fs');

function gatherTestPaths(dir) {
    var names = fs.readdirSync(dir);
    return names.map(
        name => dir + '/' + name
    );
}

var testPaths = [
    ...gatherTestPaths(__dirname + '/controllers')
];

testPaths.map( path => require(path));
