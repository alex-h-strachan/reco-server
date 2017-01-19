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

class User {
    constructor(id) {
        this.id = id;
        this.listenedTo = {};
    }

    listen(listen) {
        this.listenedTo[listen.subtopic] = (this.listenedTo[listen.subtopic] || 0) + 1;
    }
}

class UserTable {
    constructor(listens) {
        this._users = {};

        listens.forEach(l => {
            var user = this.user(l.user);
            user.listen(l);
        });
    }

    user(id) {
        if(!this._users[id]) {
            this._users[id] = new User(id);
        }

        return this._users[id];
    }
}

class RelationTable {
    constructor(listens, subtopics) {
        this.subtopicIDs = subtopics.map( st => st.id );
        this.subtopicIDs.forEach( id => {
            this[id] = this.subtopicIDs.map( st => new Relation(id, st) );
        });

        this.userTable = new UserTable(listens);
        listens.forEach( l => this.updateRelations(l) );
    }

    updateRelations(listen) {
        var user = this.userTable.user(listen.user);
        var row = this[listen.subtopic];

        row.filter( rel => user.listenedTo[rel.subtopic] ).forEach( rel => rel.addLink() );
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
    RelationTable,
    User,
    UserTable
};