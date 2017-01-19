var subtopicRelation = require('../controllers/subtopicRelation');

function getRecommendations(subtopic, limit = 10) {
    var relations = subtopicRelation.getRelation(subtopic);
    relations.sort((a, b) => {
        return a.links < b.links ? 1: -1;
    });
    return relations;
}

module.exports = getRecommendations;