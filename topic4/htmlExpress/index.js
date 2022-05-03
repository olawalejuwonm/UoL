// The index.js file of your application
const express = require ("express");
const bodyParser= require ("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const port = 8086;
require("./routes/main")(app); 
app.set("views",__dirname + "/views"); 
app.set("view engine", "ejs"); 
app.engine("html", require("ejs").renderFile);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))