function genDay() {
	//first generate a month
	var month = 1 + Math.round(11 * Math.random());

	if (((month % 2 == 1) && (month <= 7)) || ((month % 2 == 0) && (month >= 8))) {
		var day = 1 + Math.round(30 * Math.random());
	} else if (month == 2) {
		var day = 1 + Math.round(27 * Math.random());
	} else {
		var day = 1 + Math.round(29 * Math.random());
	}
	return [day, month];
}

function genBirthdays(n) {
	var birthdays = [];
	var nst = n.toString();
	for (var i = 0; i < n; i++) {
		var str = i.toString();
		var lim = nst.length - str.length;
		for (var j = 1; j <= lim; j++) {
			str = "0" + str;
		}
		birthdays[2 * i] = str;
		birthdays[1 + (2 * i)] = genDay();
	}
	return birthdays;
}

// search for unique birthdays in the array
function find(birthdays) {
	var n = birthdays.length;

}

///////////////////////////////////////////

//this function swaps membership numbers and birthdays given two indices
function swap(array,index1,index2) {
	var x1 = array[index2];
	var x2 = array[index2 - 1];
	array[index2] = array[index1];
	array[index1] = x1;
	array[index2 - 1] = array[index1 - 1];
	array[index1 - 1] = x2;
	return array;
 }

function bubbleSort(array) {
	var n = array.length;
	for (var i = 0; i <= n-2; i++) {
		var count = 0;
		for (var j = 1; j <= n-3; j = j + 2) {
			if (array[j+2][1] < array[j][1]) {
				swap(array, j, j+2);
				count++;
			}
		}
		if (count == 0) {
			break;
		}
	}
	return array;
}

function bubbleSortDays(array) {
	var n = array.length;
	for (var i = 0; i <= n-2; i++) {
		var count = 0;
		for (var j = 1; j <= n-3; j = j + 2) {
			if ((array[j+2][1] == array[j][1]) && (array[j+2][0] < array[j][0])) {
				swap(array, j, j+2);
				count++;
			}
		}
		if (count == 0) {
			break;
		}
	}
	return array;
}

// sort then search for unique birthdays
function findSorted(birthdays) {
	
}

///////////////////////////////////////////
//this creates an array for testing
//in this array the only unique birthday is held by member "1"
var birthdays = [ "0", [22, 8], "1", [11, 4], "2", [16, 10], "3", [22, 8],"4", [16, 10]];
console.log(find(birthdays));
console.log(findSorted(birthdays));
//in both cases the array printed to the console should be ["1"]

//if you are feeling confident you can uncomment the following lines of code to test a larger example
//var birthdays = genBirthdays(1589);
//console.log(find(birthdays));
//console.log(findSorted(birthdays));

// Do not modify the code below this point--------------------------------
module.exports = {
	genDay: genDay,
	genBirthdays: genBirthdays,
	find: find,
	swap: swap,
	bubbleSort: bubbleSort,
	bubbleSortDays: bubbleSortDays,
	findSorted: findSorted

}
