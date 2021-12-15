
var assert = require("assert")
describe("Set of tests", function() {
    describe("One test", function(){
        var s = "Hello mocha";
        var parts = s.split(" ")
        it("should have two elements", function() {
            assert.equal(parts.length, 2)
        })

        it("should have three elements", function() {
            assert.equal(parts.length, 3)
        })
    })
})