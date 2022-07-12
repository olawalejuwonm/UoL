const dotenv = require("dotenv");
dotenv.config();
// The index.js file of the application
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const xss = require("xss-clean");
const path = require("path"); //for static files
const axios = require("axios");
//library for running cron jobs
const cron = require("node-cron");

const port = process.env.PORT || 8089; //For production

console.log("process.env.host", process.env.host);

//All process.env.host are for production
let db = mysql.createConnection({
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

app.use(bodyParser.urlencoded({ extended: true }));

const herokuDynoUpgrade = async (quantity) => {
  try {
    //upgrade heroku dyno to web:1 using fromation
    const apiKey = process.env.apiKey;
    const appName = "mysmarthome-uol";
    const fromationType = "web";
    //     $ curl -n -X PATCH https://api.heroku.com/apps/$APP_ID_OR_NAME/formation/$FORMATION_ID_OR_TYPE \
    //   -d '{
    //   "quantity": 1,
    //   "size": "standard-1X"
    // }' \
    //   -H "Content-Type: application/json" \
    //   -H "Accept: application/vnd.heroku+json; version=3"
    const url = `https://api.heroku.com/apps/${appName}/formation/${fromationType}`;
    const data = {
      quantity,
      // size: "web",
    };
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/vnd.heroku+json; version=3",
      Authorization: `Bearer ${apiKey}`,
    };
    const response = await axios.patch(url, data, { headers });
    console.log(response.data, "response");
  } catch (error) {
    throw error;
  }
};

//console request body
app.use(async (req, res, next) => {
  try {
    // await herokuDynoUpgrade(1);
    console.log(req.body);
    next();
  } catch (err) {
    console.log(err);
    next();
  }
});

app.use(xss()); //prevent Cross-Site Scripting attacks
require("./routes/main")(app);

//serve the static files from the public folder
app.use(express.static(path.join(__dirname, "public")));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.listen(port, () => console.log(`Node server is running on port ${port}!`));

//run cron jobs every 15 minutes
cron.schedule("*/15 * * * *", async () => {
  try {
    // console.log("cron job running");
    //Terminate sql connection and reconnect
    db.end();
    db = mysql.createConnection({
      host: process.env.host || "localhost",
      user: process.env.user || "root",
      password: process.env.password || "root",
      database: process.env.database || "mySmartHome",
      port: process.env.port || "3306",
    });
    db.connect((err) => {
      if (err) {
        console.log("An error occurred while connecting to the database", err);
        //keep retrying until connected
        setInterval(() => {
          db.connect((err) => {
            if (!err) {
              // console.log("Connected to the database");
              //stop retrying
              clearInterval(this);
            }
          });
        }, 1000);

        // throw err;
      }
      else {
        // console.log("Connected to the database");
      }
    });
  } catch (error) {
    console.log(error, "error in cron job");
  }
});

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
global.db = db;
