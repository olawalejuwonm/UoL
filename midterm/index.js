var http = require("http");
// The index.js file of your application
const express = require ("express");
const bodyParser = require ("body-parser");
const app = express();
const mysql = require ("mysql");

const port = 8089;

const db = mysql.createConnection ({ 
    host: "localhost", 
    user: "root", 
    password: "root", 
    database: "mySmartHome" 
   });
   // connect to database 
   db.connect((err) => { 
    if (err) { 
    throw err; 
    } 
    console.log("Connected to database"); 
   }); 
   global.db = db;
app.use(bodyParser.urlencoded({ extended: true }));
//serve the static files from the public folder
app.use(express.static("public"));

require("./routes/main")(app); 
app.set("views",__dirname + "/views"); 
app.set("view engine", "ejs"); 
app.engine("html", require("ejs").renderFile);

app.listen(port, () => console.log(`Node server is running on port ${port}!`));

// http
//   .createServer(function(req, res) {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.write("Welcome to the mid-term application! \n\n");
//     res.write("This application must run on PORT 8089");
//     res.end();
//   })
//   .listen(8089, function() {
//     console.log("Node server is running on 8089...");
//   });
