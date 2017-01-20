var subtopics = require('../data/subtopics.json');
var listens = require('../data/listens.json');
var RelationTable = require('../models/RelationTable');

var relationTable = new RelationTable(listens, subtopics);

var methods = {
    getRelation(subtopicID) {
        return relationTable[subtopicID];
    },
    listen(listen) {
        relationTable.recordListen(listen);
    },
    exactCount(parent, subtopic) {
        return relationTable[parent]
            .filter(rel => rel.subtopic == subtopic)[0]
            .links;
    }
};

module.exports = methods;