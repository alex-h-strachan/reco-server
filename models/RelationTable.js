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

        if(!user.lastListenWasNew) {
            return;
        }

        var parent = listen.subtopic.toString();
        var related = Object.keys(user.listenedTo).filter(id => id != parent);

        related.forEach( id => updatePair.bind(this)([parent, id]) );

        function updatePair(ids) {
            ids.forEach( id => {
                this[id]
                    .filter( rel => ids.includes(rel.subtopic + '') )
                    .forEach( rel => rel.addLink() );
            });
        }
    }
}

module.exports = RelationTable;