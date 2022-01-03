var chai = require("chai");
var chaiHttp = require("chai-http");
var assert = require("assert");
chai.use(chaiHttp);


describe("Test /user route", function () {
  it("it should create/register a new user account", (done) => {
    chai
      .request("http://localhost:3000")
      .post("/user")
      .send({
        username: "micheal",
        password: "juwon%$#@",
      })
      .end((err, res) => {
        assert.equal(res.status, 200); //check if request was successful
        // console.log(res.body.message, "res");
        assert.equal(res.body.message, "User created successfully");
      });
    chai
      .request("http://localhost:3000")
      .get("/user/all")
      .end((err, res) => {
        // console.log(res.body.message, "res");
        //find the user in the database
        const user = res.body.message.find(function (user) {
          return user.username === "micheal";
        });
        assert.equal(user.username, "micheal");
        assert.equal(user.password, "juwon%$#@");
        done();
      });
  });

  it("it should login a user", (done) => {
    chai
      .request("http://localhost:3000")
      .post("/user/login")
      .send({
        username: "micheal",
        password: "juwon%$#@",
      })
      .end();
    chai
      .request("http://localhost:3000")
      .get("/user/all")
      .end((err, res) => {
        // console.log(res.body.message, "res");
        const users = res.body.message;
        const user = users.find(
          (user) => user.username === "micheal" && user.password === "juwon%$#@"
        );
        assert.equal(user.loggedIn, true);
        done();
      });
  });

  it("it should logout a user", (done) => {
    chai
      .request("http://localhost:3000")
      .post("/user/logout")
      .send({
        username: "micheal",
        password: "juwon%$#@",
      })
      .end();
    chai
      .request("http://localhost:3000")
      .get("/user/all")
      .end((err, res) => {
        assert.equal(res.status, 200);
        // console.log(res.body.message, "res");
        const users = res.body.message;
        //find the user with the username "micheal"
        const user = users.find((user) => user.username === "micheal");
        assert.equal(user.loggedIn, false);
        done();
      });
  });
});


describe("Test /spells route", function () {
 
  it("it should return a particular spell", (done) => {
    chai
      .request("http://localhost:3000")
      .get("/spells/1002")
      .end((err, res) => {
        // console.log(res.body.message, "res");
        assert.equal(res.body.message.id, 1002);
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
        // console.log(res.body.message, "res");
        assert.equal(res.body.message.name, "test");
        assert.equal(res.body.message.ingredients, "test");
        assert.equal(res.body.message.result, "test");
        done();
      });
  });
});

// describe("Test /user/:id route", function () {
//   it("it should delete a user", function () {
//     chai
//       .request("http://localhost:3000")
//       .delete("/user/1002")
//       .end((err, res) => {
//         assert.equal(res.status, 200);
//         // console.log(res.body.message, "res");
//         assert.equal(res.body.message, "User deleted successfully");
//       });
//     chai
//       .request("http://localhost:3000")
//       .get("/user/all")
//       .end((err, res) => {
//         assert.equal(res.status, 200);
//         // console.log(res.body.message, "res");
//         const users = res.body.message;
//         //find the user with the username "micheal"
//         const user = users.find((user) => user.username === "micheal");
//         assert.equal(user, undefined);
//         done();
//       });
//   });
//   it("it should update a user", function () {
//     chai
//       .request("http://localhost:3000")
//       .put("/user/1002")
//       .send({
//         username: "micheal",
//         password: "juwon%$#@",
//       })
//       .end((err, res) => {
//         assert.equal(res.status, 200);
//         // console.log(res.body.message, "res");
//         assert.equal(res.body.message, "User updated successfully");
//       });
//     chai
//       .request("http://localhost:3000")
//       .get("/user/all")
//       .end((err, res) => {
//         assert.equal(res.status, 200);
//         // console.log(res.body.message, "res");
//         const users = res.body.message;
//         //find the user with the username "micheal"
//         const user = users.find((user) => user.username === "micheal");
//         assert.equal(user.username, "micheal");
//         assert.equal(user.password, "juwon%$#@");
//         done();
//       });
//   });

//   it("it should get a particular user", function () {
//     chai
//       .request("http://localhost:3000")
//       .get("/user/1002")
//       .end((err, res) => {
//         assert.equal(res.status, 200);
//         // console.log(res.body.message, "res");
//         assert.equal(res.body.message.username, "micheal");
//         assert.equal(res.body.message.password, "juwon%$#@");
//       });
//   });
// });
