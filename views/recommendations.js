var orderedLinks = require('./orderedLinks');
var prettyRecs = require('./prettyRecs');
var subtopicIndex = require('../controllers/subtopicIndex');

function getRecommendations(subtopic, limit = 10, pretty = false) {
    var links = orderedLinks(subtopic, limit);
    var ids = links.map( l => l.subtopic );

    var recommendations = ids.map( id => subtopicIndex.get(id) );
    
    if(pretty) {
        return prettyRecs(recommendations);
    } else {
        return recommendations;
    }
}

module.exports = getRecommendations;