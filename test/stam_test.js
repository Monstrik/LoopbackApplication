var assert = require('assert');
var expect = require("chai").expect;
var stam = require('../lib/stam.js');

describe("StamTest", function () {
    describe("#hello()", function () {
        it("should return Hello World", function () {
            expect(stam.hello()).to.deep.equal('Hello World');
            //expect(results).to.have.a.property("depth", 4);
            //expect(results).to.have.a.property("hello", "world");
        });
      
    });
});




//describe('Mail', function () {
//    describe('#sendmail()', function () {
//        it('should send mail ', function () {
//            stam.mail()
//        })
//    })
//})
//describe('Array', function () {
//    describe('#indexOf()', function () {
//        it('should return -1 when the value is not present', function () {
//            assert.equal(-1, [1, 2, 3].indexOf(5));
//            assert.equal(-1, [1, 2, 3].indexOf(0));
//        })
//    })
//})