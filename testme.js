function getHighest(input) {
    var max = input[0];

    for (var i=1; i < input.length; i++) {
        if (input[i]>max) max = input[i]
    }
    return max
}

function testCorrectRes() {
    var input = [1, 2, 3];
    var res = getHighest(input)

    if(res == 3) return true
    else return false
}

//does it return value from the array
function testResInArray() {
    var input = [1, 2, 3];
    var res = getHighest(input)

    if(res == 1 || res == 2 || res == 3) return true
    else return false
}

function testRetVal() {
    var input = [1, 2, 3, 4, 5, 6];
    var res = getHighest(input)

    if(res === undefined) return false
    else return true
}

var res = testRetVal();
if (res) console.log("testRetVal passed")
else console.log("testRetVal failed")

var res = testResInArray();
if (res) console.log("testResInArray passed")
else console.log("testResInArray failed")


var res = testCorrectRes();
if (res) console.log("testCorrectRes passed")
else console.log(" testCorrectRes failed")