class Relation {
    constructor(parent, subtopic, linkPercent = 0) {
        this.parent = parent;
        this.subtopic = subtopic;
        this.linkPercent = linkPercent;
    }
}

class RelationTable {
    
}

function subtopicRelations(subtopic) {
    var relations = [
        new Relation(subtopic, 1, 1)
    ];

    return relations;
}

module.exports = subtopicRelations;
module.exports.internals = {
    Relation,
    RelationTable
};