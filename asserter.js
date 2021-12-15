const assert = require("assert");

var sensorReading = 65000
var storedValue = sensorReading
assert(sensorReading == storedValue)

sensorReading = 65000
storedValue = sensorReading + 1
assert(sensorReading == storedValue)