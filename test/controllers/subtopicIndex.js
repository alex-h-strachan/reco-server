/*global before*/
/*global describe*/
/*global it*/

var subtopicIndex, 
    subtopics;

before(function() {
    subtopicIndex = require('../../controllers/subtopicIndex');
    subtopics = require('../../data/subtopics.json');
});

describe('subtopicIndex', () => {
    it('enables querying of a subtopic', done => {
        var topic = subtopicIndex.get(subtopics[0].id);
        if(topic.name) {
            return done();
        } else {
            return done(new Error('topic didn\'t have a name property'));
        }
    });
});