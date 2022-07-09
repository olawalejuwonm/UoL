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
      res.render("device-status", { devices: result, device});
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
};
