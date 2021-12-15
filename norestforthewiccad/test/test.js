var chai = require("chai");
var chaiHttp = require("chai-http");
var assert = require("assert");
chai.use(chaiHttp);
describe("Test top level / route", function () {
  it("it should have a 200 status code", function (done) {
    chai
      .request("http://localhost:3000") // the top level web address
      .get("/") // the route to add to the top level address
      .end((err, res) => {
        // what to do once the request returns
        assert.equal(res.status, 200); // check we have the 200 OK HTTP code
        done(); // finish up
      });
  });

  it("it should send the right message", (done) => {
    chai
      .request("http://localhost:3000")
      .get("/")
      .end((err, res) => {
        let data = JSON.parse(res.text);
        assert.equal(data.message, "Welcome to the norestforthewiccad API");
        done();
      });
  });
});

// describe("Test /spells route", function () {
//     it("it should have a 200 status code", function (done) {
//       chai
//         .request("http://localhost:3000") // the top level web address
//         .get("/spells") // the route to add to the top level address
//         .end((err, res) => {
//           // what to do once the request returns
//           assert.equal(res.status, 200); // check we have the 200 OK HTTP code
//           done(); // finish up
//         });
//     });
//   });

describe("Test /spools route", function () {
  it("it should have a 200 status code", function (done) {
    chai
      .request("http://localhost:3000") // the top level web address
      .get("/spools") // the route to add to the top level address
      .end((err, res) => {
        // what to do once the request returns
        assert.equal(res.status, 200); // check we have the 200 OK HTTP code
        done(); // finish up
      });
  });
});
