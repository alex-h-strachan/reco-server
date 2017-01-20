var UserTable = require('./UserTable');
var Relation = require('./Relation');

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

module.exports = RelationTable;