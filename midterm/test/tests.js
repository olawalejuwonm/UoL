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
      .end(() => {
        chai
          .request("http://localhost:3000")
          .get("/user/all")
          .end((err, res) => {
            // console.log(res.body.message, "res");
            const users = res.body.message;
            const user = users.find(
              (user) =>
                user.username === "micheal" && user.password === "juwon%$#@"
            );
            assert.equal(user.loggedIn, true);
            done();
          });
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
      .end(() => {
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
});

describe("Test /spells route", function () {
  it("it should return a particular spell", (done) => {
    chai
      .request("http://localhost:3000")
      .get("/spells/1001")
      .end((err, res) => {
        // console.log(res.body.message, "res");
        assert.equal(res.body.message.id, 1001);
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
      .end(() => {
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

  it("it should not add a spell with duplicate id", (done) => {
    chai
      .request("http://localhost:3000")
      .post("/spells")
      .send({
        id: 1004,
        name: "duplicate",
        ingredients: "duplicate",
        result: "test",
      })
      .end((err, res) => {
        // console.log(res.body.message, "res");
        assert.equal(res.body.message, "Spell already exist");
        done();
      });
  });
});

describe("Test /user/:id route", function () {
  it("it should not update the user that does not exist", (done) => {
    chai
      .request("http://localhost:3000")
      .put("/user/100001")
      .send({
        username: "user",
        password: "pass",
      })
      .end((err, res) => {
        // console.log(res.body.message, "res");
        assert.equal(res.body.message, "User does not exist");
        done();
      });
  });
  it("it should not update a user with incorrect password", (done) => {
    chai
      .request("http://localhost:3000")
      .put("/user/1")
      .send({
        username: "newUsername",
        password: "wrong",
      })
      .end((err, res) => {
        // console.log(res.body.message, "res");
        assert.equal(res.body.message, "Unauthorized: Incorrect Password");
        done();
      });
  });

  it("it should update a user", (done) => {
    chai
      .request("http://localhost:3000")
      .put("/user/1")
      .send({
        username: "newUsername",
        password: "test",
      })
      .end((err, res) => {
        // console.log(res.body.message, "res");
        assert.equal(res.body.message.username, "newUsername");
        done();
      });
  });
});
//should not update the user that does not exist
//should not update a user without a password (authentication)
//should delte the user in the system

// it("it should update a user", function () {
//   chai
//     .request("http://localhost:3000")
//     .put("/user/1002")
//     .send({
//       username: "micheal",
//       password: "juwon%$#@",
//     })
//     .end((err, res) => {
//       assert.equal(res.status, 200);
//       // console.log(res.body.message, "res");
//       assert.equal(res.body.message, "User updated successfully");
//     });
//   chai
//     .request("http://localhost:3000")
//     .get("/user/all")
//     .end((err, res) => {
//       assert.equal(res.status, 200);
//       // console.log(res.body.message, "res");
//       const users = res.body.message;
//       //find the user with the username "micheal"
//       const user = users.find((user) => user.username === "micheal");
//       assert.equal(user.username, "micheal");
//       assert.equal(user.password, "juwon%$#@");
//       done();
//     });
// });

// it("it should delete a user", function () {
//   chai
//     .request("http://localhost:3000")
//     .delete("/user/1002")
//     .end((err, res) => {
//       assert.equal(res.status, 200);
//       // console.log(res.body.message, "res");
//       assert.equal(res.body.message, "User deleted successfully");
//     });
//   chai
//     .request("http://localhost:3000")
//     .get("/user/all")
//     .end((err, res) => {
//       assert.equal(res.status, 200);
//       // console.log(res.body.message, "res");
//       const users = res.body.message;
//       //find the user with the username "micheal"
//       const user = users.find((user) => user.username === "micheal");
//       assert.equal(user, undefined);
//       done();
//     });
// });

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
