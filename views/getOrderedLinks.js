var subtopicRelation = require('../controllers/subtopicRelation');

function getOrderedLinks(subtopic, limit = 10) {

    // get relations
    var relations = subtopicRelation.getRelation(subtopic);

    // remove own subtopic from the array
    relations = relations.filter( r => r.subtopic != subtopic);

    // sort by the number of links
    relations.sort((a, b) => {
        return a.links < b.links ? 1: -1;
    });

    // limit the return
    return relations.slice(0, limit);
}

module.exports = getOrderedLinks;