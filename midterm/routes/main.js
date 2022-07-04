// The main.js file of your application
let message; // global variable to store the message

//This function will set message to  undefined after 3 seconds when called
function clearMessage() {
  setTimeout(() => {
    message = undefined;
  }, 1000);
}

module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("index");
  });
  app.get("/about", function (req, res) {
    res.render("about");
  });
  app.get("/add-device", function (req, res) {
    res.render("add-device", {
      message,
    });
  });
  app.post("/add-device", function (req, res) {
    let sqlquery = "INSERT INTO devices (name, type, status) VALUES (?,?,?)";
    let newrecord = [req.body.name, req.body.type, req.body.status];
    db.query(sqlquery, newrecord, (err, result) => {
      if (err) {
        console.log("An error occurred while inserting data", err);
        res.redirect("/");
      }
      console.log("Data inserted successfully", result);
      message = `Device ${req.body.name} added successfully`;
      res.redirect("/list-devices");
    });
  });
  app.get("/list-devices", function (req, res) {
    let sqlquery = "SELECT * FROM devices";
    db.query(sqlquery, (err, result) => {
      if (err) {
        console.log("An error occurred while selecting data", err);
        res.redirect("/");
      }
      console.log("Data selected successfully", result);
      res.render("list-devices", { devices: result });
    });
  });
  app.get("/device-status", function (req, res) {
    let sqlquery = "SELECT * FROM devices";
    db.query(sqlquery, (err, result) => {
      if (err) {
        console.log("An error occurred while selecting data", err);
        res.redirect("/");
      }
      console.log("Data selected successfully", result);
      const id = req.query.id;
      let device = result.find((device) => device.id == id); //This will return the device with the id that was passed in the query
      console.log("Device found", device);
      res.render("device-status", { devices: result, device: device });
    });
  });
  app.get("/control-device", function (req, res) {
    let sqlquery = "SELECT * FROM devices";
    db.query(sqlquery, (err, result) => {
      if (err) {
        console.log("An error occurred while selecting data", err);
        res.redirect("/");
      }
      console.log("Data selected successfully", result);
      const id = req.query.id;
      let device = result.find((device) => device.id == id); //This will return the device with the id that was passed in the query
      console.log("Device found", device);
      res.render("control-device", {
        devices: result,
        device: device,
        message,
      });
    });
  });
  app.post("/control-device", function (req, res) {
    //This post request will be used to update the status of the device using the name of the device
    let sqlquery = "UPDATE devices SET status = ? WHERE name = ?";
    let newrecord = [req.body.status, req.body.name];
    console.log("New record", newrecord);
    db.query(sqlquery, newrecord, (err, result) => {
      if (err) {
        console.log("An error occurred while updating data", err);
        res.redirect("/");
      }
      console.log("Data updated successfully", result);
      message = `The status of ${req.body.name} has been updated to ${req.body.status} successfully`;
      res.redirect("/control-device"); //For hot reloading
      clearMessage();
    });
  });
  app.get("/delete-device", function (req, res) {
    let sqlquery = "SELECT * FROM devices";
    db.query(sqlquery, (err, result) => {
      if (err) {
        console.log("An error occurred while selecting data", err);
        res.redirect("/");
      }
      console.log("Data selected successfully", result);
      const id = req.query.id;
      let device = result.find((device) => device.id == id); //This will return the device with the id that was passed in the query
      console.log("Device found", device);
      res.render("delete-device", { devices: result, device: device, message });
      message = undefined; //This will clear the message
    });
  });
  app.post("/delete-device", function (req, res) {
    //This  uses the device name to delete the device and related data from the database
    let sqlquery = "DELETE FROM devices WHERE name = ?";
    let newrecord = [req.body.name];
    console.log("New record", newrecord);
    db.query(sqlquery, newrecord, (err, result) => {
      if (err) {
        console.log("An error occurred while deleting data", err);
        res.redirect("/");
      }
      console.log("Data deleted successfully", result);
      res.redirect("/delete-device");
      clearMessage();

    });
  });
};
