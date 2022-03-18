const { exec, execFile } = require("child_process");
const { compileFunction } = require("vm");

// console.log(typeof (2 + "2"));
// eval("console.log('wrong')");
// add(3, 5);
// function add(x, y) {
//   return (x + y);
// }

// console.log(add(2))
// add(2, 3);

// console.log(eval("3 + 3"));
// console.log("x" + eval("add(33, 3)"))

// function queryDatabase(query) {
//   try {
//     var database = checkDatabase(); //assuming that the function has been defined
//     return database.query(); //assumption
//   } catch (error) {
//     console.log("An error ocurred connecting to the database", error.message); //output an error to the user
//   }
// }
// exec()
// execFile()
// compileFunction()


var x = 0;

var y = 10;

try

{

var  z = y / x;

console.log("I am still running", z);

}

catch(ex)

{

console.log("Divide by Zero Error");

}