/*global before*/
/*global describe*/
/*global it*/

var subtopicRelation, 
    subtopics,
    listens;

before(() => {
    subtopicRelation = require('../../controllers/subtopicRelation.js');
    subtopics = require('../../data/subtopics.json');
    listens = require('../../data/listens.json');
});

describe('subtopicRelation internals', () => {
    describe('Relation', () => {
        it('constructs without error', done => {
            var relation = new subtopicRelation.internals.Relation('0', 1, 1);
            if(relation instanceof subtopicRelation.internals.Relation) {
                return done();
            } else {
                return done(
                    new Error('Relation malformed')
                );
            }
        });
        it('constructs with the expected properties', done => {
            var relation = new subtopicRelation.internals.Relation('0', 1, 1);
            if(relation.parent && relation.links && relation.subtopic) {
                return done();
            } else {
                return done(
                    new Error('Relation malformed')
                );
            }
        });
    });

    describe('User', () => {
        it('constructs without error', done => {
            var user = new subtopicRelation.internals.User(listens[0].user);
            if(user instanceof subtopicRelation.internals.User) {
                return done();
            } else {
                return done(
                    new Error('User malformed')
                );
            }
        });
        it('should increment listens', done => {
            var user = new subtopicRelation.internals.User(listens[0].user);
            user.listen(listens[0]);
            if(user.listenedTo[listens[0].subtopic] == 1) {
                return done();
            } else {
                return done(
                    new Error('user listen count wasn\'t correct')
                );
            }
        });
    });

    describe('RelationTable', () => {
        it('constructs without error', done => {
            var table = new subtopicRelation.internals.RelationTable(listens, subtopics);
            if(table instanceof subtopicRelation.internals.RelationTable) {
                return done();
            } else {
                return done(
                    new Error('RelationTable malformed')
                );
            }
        });
        it('has a row of relationships for each subtopic', done => {
            var table = new subtopicRelation.internals.RelationTable(listens, subtopics);
            for(let i in subtopics) {
                var id = subtopics[i].id;
                if(!Array.isArray(table[id])) {
                    return done(
                        new Error('Table was missing a subtopic')
                    );
                }
            }
            return done();
        });
    });
});

describe('subtopicRelation', () => {
    it('should take a subtopic and return a set of relations', done => {
        var relations = subtopicRelation(subtopics[0]);
        if(
            Array.isArray(relations) 
            && relations[0] instanceof subtopicRelation.internals.Relation
        ) {
            return done();
        } else {
            return done(
                new Error('Subtopic return format malformed')
            );
        }
    });
});