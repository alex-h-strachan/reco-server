var orderedLinks = require('./orderedLinks');
var prettyRecs = require('./prettyRecs');
var subtopicIndex = require('../controllers/subtopicIndex');

function getRecommendations(subtopic, limit = 4, pretty = false) {
    var links = orderedLinks(subtopic, limit);
    var ids = links.map( l => l.subtopic );

    if(pretty) {
        var recommendations = ids.map( id => subtopicIndex.get(id) );
        return prettyRecs(recommendations);
    } else {
        return ids;
    }
}

module.exports = getRecommendations;