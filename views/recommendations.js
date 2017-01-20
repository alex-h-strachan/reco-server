var orderedLinks = require('./orderedLinks');
var subtopicIndex = require('../controllers/subtopicIndex.js');

function getRecommendations(subtopic, limit = 10) {
    var links = orderedLinks(subtopic, limit);
    var ids = links.map( l => l.subtopic );

    var recommendations = ids.map( id => subtopicIndex.get(id) );
    return recommendations;
}

module.exports = getRecommendations;