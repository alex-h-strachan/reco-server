/*global before*/
/*global describe*/
/*global it*/

var subtopicRelation, 
    subtopicData;

before(() => {
    subtopicRelation = require('../../controllers/subtopicRelation.js');
    subtopicData = require('../../data/subtopics.json');
});

describe('subtopicRelation internals', () => {
    describe('Relation', () => {
        it('constructs without error', done => {
            var relation = new subtopicRelation.internals.Relation('0', 1, 1);
            if(relation instanceof subtopicRelation.internals.Relation) {
                return done();
            } else {
                return done('Relation malformed');
            }
        });
    });
});

describe('subtopicRelation', () => {
    it('should take a subtopic and return a set of relations', done => {
        var relations = subtopicRelation(subtopicData[0]);
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