var broadcast = function (msg, timeout, callback) {
  // initiate an async call using a timer
  setTimeout(function () {
    // the first message
    console.log(msg);
    // execute the callback function
    callback();
  }, timeout);
};

broadcast("Is there anybody out there?", 10000, function () {
  console.log("Message sent");
});
