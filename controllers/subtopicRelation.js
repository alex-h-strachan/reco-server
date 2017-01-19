class Relation {
    constructor(parent, subtopic, linkPercent) {
        this.parent = parent;
        this.subtopic = subtopic;
        this.linkPercent = linkPercent;
    }
}

function subtopicRelations(subtopic) {
    var relations = [
        new Relation(subtopic, 1, 1)
    ];

    return relations;
}

module.exports = subtopicRelations;