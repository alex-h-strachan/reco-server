/*global before*/
/*global describe*/
/*global it*/

var subtopicRelation, 
    subtopics,
    Relation;

before(function() {
    this.timeout(0);
    Relation = require('../../models/Relation');
    subtopicRelation = require('../../controllers/subtopicRelation');
    subtopics = require('../../data/subtopics.json');
});

describe('subtopicRelation', () => {
    it('should take a subtopic and return a set of relations', done => {
        var relations = subtopicRelation.getRelation(subtopics[0].id);
        if(
            Array.isArray(relations) 
            && relations[0] instanceof Relation
        ) {
            return done();
        } else {
            return done(
                new Error('Subtopic return format malformed')
            );
        }
    });
});