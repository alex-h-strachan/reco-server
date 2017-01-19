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
    constructor() {
        this._users = {};
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

        this.userTable = new UserTable();
        listens.forEach( l => this.recordListen(l) );
    }

    recordListen(listen) {
        var user = this.userTable.user(listen.user);
        user.listen(listen);
        this.updateRelations(listen);
    }

    updateRelations(listen) {
        var user = this.userTable.user(listen.user);
        var row = this[listen.subtopic];

        row.filter( rel => user.listenedTo[rel.subtopic] ).forEach( rel => rel.addLink() );
    }
}


// initialize the controller
var subtopics = require('../data/subtopics.json');
var listens = require('../data/listens.json');

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
module.exports.internals = {
    Relation,
    RelationTable,
    User,
    UserTable
};