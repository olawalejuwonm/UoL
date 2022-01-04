const express = require("express");
const router = express.Router();

let users = [
  {
    username: "test",
    password: "test",
    loggedIn: false,
    id: 1,
  },
];

//create a user account
router.post("/", function (req, res) {
  // console.log(req.body)
  let body = req.body;
  body.id = users.length + 1;
  users.push(body);
  return res.json({
    message: "User created successfully",
  });
});

//Get all user in the server
router.get("/all", function (req, res) {
  return res.json({
    message: users,
  });
});

// login
router.post("/login", function (req, res) {
  let body = req.body;
  let user = users.find(function (user) {
    return user.username === body.username && user.password === body.password;
  });
  if (user) {
    user.loggedIn = true;
    //save the user back to users variable
    // users[user.id - 1] = user
    return res.json({
      message: "User logged in successfully",
    });
  } else {
    return res.json({
      message: "Either the password or username is incorrect",
    });
  }
});

//logout a user
router.post("/logout", function (req, res) {
  let body = req.body;
  let user = users.find(function (user) {
    return user.username === body.username && user.password === body.password;
  });
  if (user.loggedIn === true) {
    user.loggedIn = false;
    return res.json({
      message: "User logged out successfully",
    });
  } else {
    return res.json({
      message: "User does not exist or is not logged in",
    });
  }
});

//user/:id route
router.put("/:id", function (req, res) {
  let id = req.params["id"];
  let userExist = users.find((user) => user.id == id);

  if (!userExist) {
    return res.json({
      message: "User does not exist",
    });
  }
  if (userExist.password != req.body.password) {
    return res.json({
      message: "Unauthorized: Incorrect Password",
    });
  }

  userExist.username = req.body.username;
  return res.json({
    message: userExist,
  });
});

module.exports = router;
