// The main.js file of your application
let message; // global variable to store the message

//This function will set message to  undefined after 3 seconds when called
//This will ensure that message from previous page is not displayed on
//newly navigated page
function clearMessage() {
  setTimeout(() => {
    message = undefined;
  }, 1000);
}

module.exports = function (app) {
  app.get("/", function (req, res) {
    //This is the main and initial page of the application
    //It renders the home page of the application
    res.render("index");
  });
  app.get("/about", function (req, res) {
    //This is the about page of the application
    res.render("about");
  });

  app.post("/add-device", function (req, res) {
    //This is post request to add a new device to the database
    //It will add the device to the database and redirect to the add-device page for hot reloading
    //It will also set the message to the success or error message
    //And it will clear the message after 3 seconds.
    //It firstly checks if the device name already exists in the database
    //If it does, it will set the message to error message
    //If it doesn't, it will add the device to the database and set the message to success message
    //It will then redirect to the add-device page for hot reloading
    let sqlquery = "INSERT INTO devices (name, type, status) VALUES (?,?,?)";
    let newrecord = [req.body.name, req.body.type, req.body.status];
    db.query(
      "SELECT * FROM devices WHERE name = ?",
      [req.body.name],
      (err, result) => {
        if (err) {
          message = "An error occurred";
          console.log(err);
          res.redirect("/add-device");
          clearMessage();
        } else if (result.length > 0) {
          //This will check if the name is already in the database
          message = "Device already exists";
          res.redirect("/add-device");
          clearMessage();
        } else {
          db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
              console.log("An error occurred while inserting data", err);
              message = "An error occurred";
              res.redirect("/");
              clearMessage();
            }
            console.log("Data inserted successfully", result);
            message = `Device ${req.body.name} added successfully`;
            res.redirect("/add-device");
            clearMessage();
          });
        }
      }
    );
  });

  app.get("/add-device", function (req, res) {
    //This is the add-device page of the application where user can add a new device
    //It renders the add-device page of the application
    //It also sends the message set by the post request to the add-device page
    res.render("add-device", {
      message,
    });
  });

  app.get("/device-status", function (req, res) {
    //This is the device-status page of the application
    //It renders the device-status page of the application
    //It will send the data of all the devices in the database to the page as devices varaible
    //It accepts the device id as a query parameter
    //If the query id is found in the database, it will send the data of the device to the page as  device variable
    let sqlquery = "SELECT * FROM devices";
    db.query(sqlquery, (err, result) => {
      if (err) {
        console.log("An error occurred while selecting data", err);
        message = "An error occurred";
        res.redirect("/");
        clearMessage();
      }
      console.log("Data selected successfully", result);
      const id = req.query.id;
      let device = result.find((device) => device.id == id);
      //This will return the device with the id that was passed in the query
      console.log("Device found", device);
      res.render("device-status", { devices: result, device });
    });
  });
  app.get("/control-device", function (req, res) {
    //This is the control-device page of the application
    //It renders the control-device page of the application
    //It will send the data of all the devices in the database to the page as devices varaible
    //It accepts the device id as a query parameter
    //If the query id is found in the database, it will send the data of the device to the page as  device variable
    //It also sends the message set by the post request to the control-device page
    let sqlquery = "SELECT * FROM devices";
    db.query(sqlquery, (err, result) => {
      if (err) {
        console.log("An error occurred while selecting data", err);
        message = "An error occurred";
        res.redirect("/");
        clearMessage();
      }
      console.log("Data selected successfully", result);
      const id = req.query.id;
      let device = result.find((device) => device.id == id);
      //This will return the device with the id that was passed in the query
      console.log("Device found", device);
      res.render("control-device", {
        devices: result,
        device,
        message,
      });
    });
  });
  app.post("/control-device", function (req, res) {
    //This post request is used to update the status of the device using the name of the device
    //It will update the status of the device in the database and redirect to the control-device page for hot reloading
    //It will also set the message to the success or error message
    //And it will clear the message after 3 seconds.
    //It accepts the device name and status as post parameters

    let sqlquery = "UPDATE devices SET status = ? WHERE name = ?";
    let newrecord = [req.body.status, req.body.name];
    console.log("New record", newrecord);
    db.query(sqlquery, newrecord, (err, result) => {
      if (err) {
        console.log("An error occurred while updating data", err);
        message = "An error occurred";
        res.redirect("/");
        clearMessage();
      }
      console.log("Data updated successfully", result);
      message = `The status of ${req.body.name} has been updated to ${req.body.status} successfully`;
      res.redirect("/control-device"); //For hot reloading
      clearMessage();
    });
  });
  app.get("/delete-device", function (req, res) {
    //This is the delete-device page of the application
    //It renders the delete-device page of the application
    //It will send the data of all the devices in the database to the page as devices varaible
    //It accepts the device id as a query parameter
    //If the query id is found in the database, it will send the data of the device to the page as  device variable
    //It also sends the message set by the post request to the delete-device page
    let sqlquery = "SELECT * FROM devices";
    db.query(sqlquery, (err, result) => {
      if (err) {
        console.log("An error occurred while selecting data", err);
        message = "An error occurred";
        res.redirect("/");
        clearMessage();
      }
      console.log("Data selected successfully", result);
      const id = req.query.id;
      let device = result.find((device) => device.id == id); //This will return the device with the id that was passed in the query
      console.log("Device found", device);
      res.render("delete-device", { devices: result, device, message });
    });
  });
  app.post("/delete-device", function (req, res) {
    //This uses the device name to delete the device and related data from the database
    //It will delete the device and related data from the database and redirect to the delete-device page for hot reloading
    //It will also set the message to the success or error message
    //And it will clear the message after 3 seconds.
    //It accepts the device name as post parameters

    let sqlquery = "DELETE FROM devices WHERE name = ?";
    let newrecord = [req.body.name];
    console.log("New record", newrecord);
    db.query(sqlquery, newrecord, (err, result) => {
      if (err) {
        console.log("An error occurred while deleting data", err);
        message = "An error occurred";
        res.redirect("/");
        clearMessage();
      }
      console.log("Data deleted successfully", result);
      message = `Device ${req.body.name} deleted successfully`;
      res.redirect("/delete-device");
      clearMessage();
    });
  });

  //PERSONAL EXTENSION: List all device
  app.get("/list-devices", function (req, res) {
    //This is the list-devices page of the application
    //It renders the list-devices page of the application
    //It will send the data of all the devices in the database to the page as devices varaible
    let sqlquery = "SELECT * FROM devices";
    db.query(sqlquery, (err, result) => {
      if (err) {
        console.log("An error occurred while selecting data", err);
        message = "An error occurred";
        res.redirect("/");
        clearMessage();
      }
      console.log("Data selected successfully", result);
      res.render("list-devices", { devices: result });
    });
  });

  //This create-user post endpoint retrieves username, email and password from the request. It will then insert the data into 
  //the database assuming that db variable is the mysql connection. It also handle an error condition where the database query fails and 
  //display a message once the new user is successfully created. The app variable is assumed to be the express app that has been created just
  // like the db variable is the mysql connection. Likewise the body-parser middleware has been added to the app like this app.use(bodyParser.urlencoded({ extended: true })); 
  //to be able to retrieve the data from the request body and the ejs view engine has been added to the app like this app.set("view engine", "ejs"); in order to render the views.

  app.post("/create-user", function (req, res) { //The app.post method is defined inside the express app and it takes the path and a callback function as parameters
    //The callback function takes the request and response as parameters called req and res respectively, it also takes a next parameter which is a function that is called to move to the next middleware in the stack
    //The request object contains the data sent by the client to the server which includes the data sent in the request body, query parameters, url parameters, headers, cookies, etc.
    //The response object contains the data that will be sent back to the client by the server. It contains methods to send data back to the client like res.send, res.json, res.render, etc. This is also responsible for setting the status code and headers to the client.
    //The next parameter is a function that is called to move to the next middleware in the stack. It is optional and is only used when there are multiple middlewares in the stack.
    let sqlquery = "INSERT INTO users (username, email, password) VALUES (?,?,?)"; //This is the sql query to insert data into the users table
    //The query adds a new record to the users table with the username, email and password from the request body. The VALUES (?, ?, ?) is a placeholder for the values that will be inserted into the table.
    // The ? are placeholders for the data that will be inserted into the table. Each order corresponds to the username, email and password in the request body. The values will be inserted into the table in the order of the placeholder in the query as an array.
    const { username, email, password } = req.body; //This is destructuring the request body object to get the username, email and password name fields from the html form
    let data = [username, email, password]; //This is the data that will be inserted into the table
    db.query(sqlquery, data, (err, result) => {
      if (err) { // If the error is not null, it means that there was an error while inserting the data into the table
        console.log("An error occurred while inserting data", err); //This logs the error to the console. It's useful as a backend developer to know what the error is when checking through the application logs
        message = "An error occurred"; //This sets the message to be displayed to the user
        res.redirect("/create-user", { message }); //This redirects to the create-user page and sends the message to the page
      }
      //If the error is null, it means that the data was inserted successfully and the result variable will contain the result of the query
      message = "New user created successfully";
      res.redirect("/create-user", { message });
    });
  });

  //This ‘workouts’ route which will query the database to retrieve all of the workout routines for a given user and then render them in an ejs template fle called ‘workouts.ejs.’
  //The app.get method is defined inside the express app and it takes the path and a callback function as parameters
  app.get("/workouts", function (req, res) {
    let sqlquery = "SELECT * FROM workouts WHERE user_id = ?"; //This is the sql query to select data from the workouts table. It's assumed that the workouts table has a user_id column that is a foreign key to the users table. 
    //The user_id column is used to filter the workouts for a given user.
    let data = [req.query.user_id]; //This is the data that will be inserted into the table
    db.query(sqlquery, data, (err, result) => {
      if (err) { // If the error is not null, it means that there was an error while inserting the data into the table
        console.log("An error occurred while selecting data", err); //This logs the error to the console. It's useful as a backend developer to know what the error is when checking through the application logs
        message = "An error occurred"; //This sets the message to be displayed to the user
        res.redirect("/workouts", { message, workouts: [] }); //This redirects to the workouts page and sends the message and an empty array to the page so that the page doesn't break
      }
      res.render("workouts", { workouts: result }); //This renders the workouts page and sends the workouts to the page
    });
  });

}

