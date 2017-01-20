/*global before*/
/*global describe*/
/*global it*/

var RelationTable,
    subtopics,
    listens;

before(function() {
    this.timeout(0);
    RelationTable = require('../../models/RelationTable');
    subtopics = require('../../data/subtopics.json');
    listens = require('../../data/listens.json');
});

describe('RelationTable', () => {
    var table;
    before( function() {
        this.timeout(0);
        table = new RelationTable(listens, subtopics);
    });

    it('constructs without error', done => {
        if(table instanceof RelationTable) {
            return done();
        } else {
            return done(
                new Error('RelationTable malformed')
            );
        }
    });
    it('has a row of relationships for each subtopic', done => {
        for(let i in subtopics) {
            let id = subtopics[i].id;
            if(!Array.isArray(table[id])) {
                return done(
                    new Error('Table was missing a subtopic')
                );
            }
        }
        return done();
    });
    it('has at least some relationship data recorded', done => {
        var nonzeroEntries = 0;
        var requiredNonzeroToPass = 100;

        for(let i in subtopics) {
            let id = subtopics[i].id;

            var nonZeroRels = table[id].filter(rel => rel.links > 0);
            nonzeroEntries += nonZeroRels.length;
        }

        if(nonzeroEntries > requiredNonzeroToPass) {
            return done();
        } else if(nonzeroEntries > 0){
            return done(new Error('some data found, but below passing threshold'));
        } else {
            return done(new Error('no data relationships recorded in data table'));
        }
    });
    it('updates relations for subtopics when a listen is recorded', done => {
        var table = new RelationTable([], subtopics);
        var subtopicID = subtopics[0].id;
        var listen = {
            subtopic: subtopicID,
            user: 0
        };

        // create a new user to listen to the subtopic
        var user = table.userTable.user(0);
        user.listen(listen);

        table.updateRelations(listen);

        var rel = table[subtopicID].filter(rel => rel.subtopic == subtopicID)[0];

        if(rel.links == 1) {
            return done();
        } else {
            return done(
                new Error('relationship didn\'t update')
            );
        }
    });
});