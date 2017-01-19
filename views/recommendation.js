var subtopicRelation = require('../controllers/subtopicRelation');

function getRecommendations(subtopic, limit = 10) {
    var relations = subtopicRelation.getRelation(subtopic);
    return relations;
}

module.exports = getRecommendations;