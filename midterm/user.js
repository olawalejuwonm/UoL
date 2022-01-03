const express = require('express');
const router = express.Router();


let users = [
    {
        username: "test",
        password: "test",
        loggedIn: "false",
        id: 1
    }
]



//create a user account
router.post('/', function (req, res) {
    // console.log(req.body)
    let body = req.body;
    body.id = users.length + 1
    users.push(body)
    return res.json({
        message: "User created successfully"
    })
})

router.get('/all', function (req, res) {
    return res.json({
        message: users
    })
})



// login
router.post('/login', function(req, res){
    res.json({
        message:"Login successful"
    });
});

// get current user
router.get('/', function(req, res){
    res.json({
        username:"admin", 
        password:"notsogood"
    });
});



module.exports = router;
