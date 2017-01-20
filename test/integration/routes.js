var request = require('supertest');
var app = require('../../app');

/*global describe*/
/*global it*/

describe('integration tests', () => {
    it('returns an array of 4 suggestions by default', done => {
        request(app)
            .get('/recommendations?subtopic=57d80b25e04b0603003bffa3')
            .expect(200)
            .end((e, res) => {
                if(e) {return done(e);}

                try {
                    var body = JSON.parse(res.text);
                } catch(e) {
                    return done(new Error('Expected JSON body but parsing failed'));
                }

                if(body.length != 4) {
                    return done(new Error('body did not have expected length'));
                }

                done();
            });
    });

    it('returns an array of 10 suggestions if requested', done => {
        request(app)
            .get('/recommendations?subtopic=57d80b25e04b0603003bffa3&limit=5')
            .expect(200)
            .end((e, res) => {
                if(e) {return done(e);}

                try {
                    var body = JSON.parse(res.text);
                } catch(e) {
                    return done(new Error('Expected JSON body but parsing failed'));
                }

                if(body.length != 5) {
                    return done(new Error('body did not have expected length'));
                }

                done();
            });
    });

    it('returns html if the pretty flag is set', done => {
        request(app)
            .get('/recommendations?subtopic=57d80b25e04b0603003bffa3&pretty=true')
            .expect(200)
            .end((e, res) => {
                if(e) {return done(e);}

                if(!res.text.match(/<div>/)) {
                    return done(new Error('body did not contain html'));
                }

                done();
            });
    });

    it('accepts posts to the listen route', done => {
        request(app)
            .post('/listen')
            .send({
                subtopic: '5772c11077e23c0300e26047',
                user: '0'
            })
            .expect(200, done);
    });
});