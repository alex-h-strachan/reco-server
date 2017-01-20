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

    it('adds a new relationship accurately', done => {
        var table = new RelationTable([
            {subtopic: '1', user: '1'},
            {subtopic: '2', user: '1'}
        ], [
            {name: '1', id: '1'},
            {name: '2', id: '2'}
        ]);

        if(table[1][0].links == 1 && table[1][1].links == 1) {
            return done();
        } else {
            return done(new Error('relationship wasn\'t correctly added'));
        }
    });

    it('correctly handles duplicate listens', done => {
        var table = new RelationTable([
            {subtopic: '1', user: '1'},
            {subtopic: '2', user: '1'},
            {subtopic: '1', user: '1'},
        ], [
            {name: '1', id: '1'},
            {name: '2', id: '2'}
        ]);

        if(table[1][0].links == 1 && table[1][1].links == 1) {
            return done();
        } else {
            return done(new Error('relationship wasn\'t correctly added'));
        }
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
        
        var listens = [{
            subtopic: subtopics[0].id,
            user: 0
        },
        {
            subtopic: subtopics[1].id,
            user: 0
        }];

        listens.forEach( l => table.recordListen(l) );

        var rel = table[subtopics[0].id].filter(rel => rel.subtopic == subtopics[0].id)[0];

        if(rel.links == 1) {
            return done();
        } else {
            return done(
                new Error('relationship didn\'t update')
            );
        }
    });
});