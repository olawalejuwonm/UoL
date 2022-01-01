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

  it("it should have a spells route", (done) => {
    chai
      .request("http://localhost:3000")
      .get("/spells")
      .end((err, res) => {
        assert.equal(res.status, 200);
        done();
      });
  });

  it("it should have a spells data", (done) => {
    chai
      .request("http://localhost:3000")
      .get("/spells")
      .end((err, res) => {
        // console.log(res.body.message, "res");
        assert.equal(res.status, 200);
        assert.equal(true, Array.isArray(res.body.message));
        done();
      });
  });

  it("it should return a particular spell", (done) => {
    chai
      .request("http://localhost:3000")
      .get("/spells/1002")
      .end((err, res) => {
        assert.equal(res.status, 200);
        // console.log(res.body.message, "res");
        assert.equal(res.body.message.id, 1002);
        done();
      });
  });

  it("it should update a particular spell", (done) => {
    chai
      .request("http://localhost:3000")
      .put("/spells/1002")
      .send({
        name: "test",
        ingredients: "test",
        result: "test",
      })
      .end();
    chai
      .request("http://localhost:3000")
      .get("/spells/1002")
      .end((err, res) => {
        assert.equal(res.status, 200);
        // console.log(res.body.message, "res");
        assert.equal(res.body.message.name, "test");
        assert.equal(res.body.message.ingredients, "test");
        assert.equal(res.body.message.result, "test");
        done();
      });
  });

  it("it should add a particular spell", (done) => {
    chai
      .request("http://localhost:3000")
      .post("/spells")
      .send({
        id: 1004,
        name: "test",
        ingredients: "test",
        result: "test",
      })
      .end();
    chai
      .request("http://localhost:3000")
      .get("/spells/1004")
      .end((err, res) => {
        assert.equal(res.status, 200);
        // console.log(res.body.message, "res");
        assert.equal(res.body.message.name, "test");
        assert.equal(res.body.message.ingredients, "test");
        assert.equal(res.body.message.result, "test");
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

// describe("Test /spools route", function () {
//   it("it should have a 200 status code", function (done) {
//     chai
//       .request("http://localhost:3000") // the top level web address
//       .get("/spools") // the route to add to the top level address
//       .end((err, res) => {
//         // what to do once the request returns
//         assert.equal(res.status, 200); // check we have the 200 OK HTTP code
//         done(); // finish up
//       });
//   });
// });
