/*global before*/
/*global describe*/
/*global it*/

var subtopicRelation, 
    subtopicData;

before(function() {
    subtopicRelation = require('../../controllers/subtopicRelation.js');
    subtopicData = require('../../data/subtopics.json');
});

describe('subtopicRelation', function() {
    it('should take a subtopic and return a set of relations', function(done) {
        var relations = subtopicRelation(subtopicData[0]);
        if(
            Array.isArray(relations) 
            && relations[0] 
            && relations[0].linkPercent
            && relations[0].subtopic
            && relations[0].parent
        ) {
            return done();
        } else {
            return done(
                new Error('Subtopic return format malformed')
            );
        }
    });
});