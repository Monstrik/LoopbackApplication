var should = require('chai').should();
var expect = require("chai").expect;
var supertest = require('supertest');
var api = supertest('http://localhost:3000/api');


describe("Api test", function () {
    
    describe("#User", function () {
        it("should return a 401 code", function (done) {
            api.get('/Users/')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .expect(401, done);
        });
    });
    
    describe('Authentication', function () {
        it('errors if wrong basic auth', function (done) {
            api.get('/Users')
            .set('x-api-key', '123myapikey')
            .auth('incorrect', 'credentials')
            .expect(401, done)
        });
        
        //it('errors if bad x-api-key header', function (done) {
        //    api.get('/blog')
        //    .auth('correct', 'credentials')
        //    .expect(401)
        //    .expect({
        //        error: "Bad or missing app identification header"
        //    }, done);
        //});

    });
});


