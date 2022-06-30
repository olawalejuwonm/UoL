// The main.js file of your application
module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("index");
  });
  app.get("/about", function (req, res) {
    res.render("about");
  });
  app.get("/add-device", function (req, res) {
    res.render("add-device");
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
      res.render("control-device", { devices: result, device: device });
    });
  });
};
