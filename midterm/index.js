const dotenv = require("dotenv");
dotenv.config();
// The index.js file of the application
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const xss = require("xss-clean");
const path = require("path"); //for static files

const port = process.env.PORT || 8089; //For production

console.log("process.env.host", process.env.host);

//All process.env.host are for production
const db = mysql.createConnection({
  host: process.env.host || "localhost",
  user: process.env.user || "root",
  password: process.env.password || "root",
  database: process.env.database || "mySmartHome",
  port: process.env.port || "3306",
});
// connect to database
db.connect((err) => {
  if (err) {
    console.log("An error occurred while connecting to the database", err);
    //keep retrying until connected
    setInterval(() => {
      db.connect((err) => {
        if (!err) {
          console.log("Connected to the database");
          //stop retrying
          clearInterval(this);
        }
      });
    }, 1000);

    // throw err;
  }
  //create a devices table if it doesn't exist
  db.query(
    "CREATE TABLE IF NOT EXISTS devices (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), type VARCHAR(255), status VARCHAR(255))",
    (err, result) => {
      if (err) {
        console.log("An error occurred while creating the table", err);
        // throw err;
      }
      console.log("Table devices created");
    }
  );
});
global.db = db;

app.use(bodyParser.urlencoded({ extended: true }));

//console request body
app.use((req, res, next) => {
  console.log(req.body);
  next();
});

app.use(xss()); //prevent Cross-Site Scripting attacks
require("./routes/main")(app);

//serve the static files from the public folder
app.use(express.static(path.join(__dirname, "public")));
app.set("views", __dirname + "/views");
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
