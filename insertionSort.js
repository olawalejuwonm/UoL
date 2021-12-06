function genRandomArray(n) {
  var arr = [];
  for (var i = 0; i < n; i++) {
    arr[i] = Math.round(10 * Math.random());
  }
  return arr;
}

// This implements the swap function
function swap(array, index1, index2) {
  var x = array[index2];
  array[index2] = array[index1];
  array[index1] = x;
  return array;
}

// This implements the shift function
function shift(array, index1, index2) {
  if (index1 < index2) {
    return array;
  }
  var x = array[index1];
  for (var i = index1; i >= index2 + 1; i--) {
    array[i] = array[i - 1];
  }
  array[index2] = x;
  return array;
}

function insertionSort(array) {
  let noOfComp = 0;

  for (let iindex = 1; iindex <= array.length - 1; iindex++) {
    let j = iindex;
    while (array[iindex] < array[j - 1] && j > 0) {
      j = j - 1;
      noOfComp += 1;
    }
    shift(array, iindex, j);
  }
  //   console.log("No of shift was", noShift, "and No Of Comparison was", noOfComp)
  return array;
}

// This will generate a random array with 12 elements, print it to the console, and also print what is returned by insertionSort also to the console
var arr = genRandomArray(12);
console.log(arr);
console.log(insertionSort(arr));

// Do not modify the code below this point--------------------------------
module.exports = {
  genRandomArray: genRandomArray,
  swap: swap,
  shift: shift,
  insertionSort: insertionSort,
};
