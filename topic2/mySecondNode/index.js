// The index.js file of your application
var http = require("http");
var dt = require("./myFirstModule.js");

http.createServer(function(req, res) {
    res.end("The date and time are currently: "+ dt.myDateTime() + "\n");

// res.writeHead(200, { "Content-Type": "text/plain" });
// res.end("Hello World again!");

}).listen(8082, function() {
console.log("Node server is running...");
});