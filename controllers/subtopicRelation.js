var subtopics = require('../data/subtopics.json');
var listens = require('../data/listens.json');
var RelationTable = require('../models/RelationTable');

var relationTable = new RelationTable(listens, subtopics);

var methods = {
    getRelation(subtopicID) {
        return relationTable[subtopicID];
    },
    listen(listen) {
        relationTable.updateRelations(listen);
    }
};

module.exports = methods;