var request = require('supertest');
var app = require('../../app');
var subtopics = require('../../data/subtopics.json');
var subtopicRelation = require('../../controllers/subtopicRelation');

/*global describe*/
/*global before*/
/*global it*/

var parent = subtopics[0].id;
var subtopic = subtopics[1].id;

var originalLinks = subtopicRelation.exactCount(parent, subtopic);

describe('verify the update works', () => {
    before(done => {
        request(app)
            .post('/listen')
            .send({
                subtopic: parent,
                user: '1'
            })
            .expect(200, done);
    });

    before(done => {
        request(app)
            .post('/listen')
            .send({
                subtopic: subtopic,
                user: '1'
            })
            .expect(200, done);
    });

    it('should show a higher link count than originally', done => {
        if(subtopicRelation.exactCount(parent, subtopic) > originalLinks) {
            return done();
        }

        return done(new Error('Link count did not increase'));
    });
});