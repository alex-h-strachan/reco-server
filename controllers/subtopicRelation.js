class Relation {
    constructor(parent, subtopic, linkPercent = 0) {
        this.parent = parent;
        this.subtopic = subtopic;
        this.linkPercent = linkPercent;
    }
}

class RelationTable {
    constructor(listens, subtopics) {
        this.subtopicIDs = subtopics.map( st => st.id );
        this.subtopicIDs.forEach( id => {
            this[id] = this.subtopicIDs.map( st => new Relation(id, st) );
        });
    }
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