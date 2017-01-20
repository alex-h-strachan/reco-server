class Relation {
    constructor(parent, subtopic, links = 0) {
        this.parent = parent;
        this.subtopic = subtopic;
        this.links = links;
    }

    addLink() {
        // increase link count
        this.links++;
        return this;
    }
}

module.exports = Relation;