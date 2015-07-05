var zmqt = require('../lib/zmqtest.js');
var should = require('chai').should();
var expect = require("chai").expect;
var supertest = require('supertest');


describe("Zmq test", function () {
    describe( "#server client", function () {
        it("should return Hello World", function (done) {
            zmqt.testzmqserver();
            zmqt.testzmqclient('Hello', function (str) {
                if (str != 'Hello World') throw new Error('Wrong Reply');
                done();
            });
        });
    });
});
