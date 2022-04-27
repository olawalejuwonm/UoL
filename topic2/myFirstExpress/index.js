// The index.js file of your application
const express = require("express");
const app = express();
const port = 8083;
app.get("/", (req, res) => res.send("<h1>Hello World!</h1>"));
app.get("/about", (req, res) => res.send ("<h1>This is the about page</h1>")); 
app.get("/search", (req, res) => res.send("Welcome to search page") )
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
