function genRandomArray(n) {
  var arr = [];
  for (var i = 0; i < n; i++) {
    arr[i] = Math.round(10 * Math.random());
  }
  return arr;
}

function swap(array, index1, index2) {
  var saveElement = array[index1];
  array[index1] = array[index2];
  array[index2] = saveElement;
  return array;
}

function bubbleSort(array) {
  var n = array.length;
  for (var i = 1; i < n; i++) {
    var count = 0;
    for (var j = 0; j < n - 1; j++) {
      if (array[j + 1] < array[j]) {
        count++;
        swap(array, j, j + 1);
      }
    }
    if (count == 0) {
      break;
    }
  }
  return array;
}

function search(array, x, left, right) {
  // return a Boolean: true if x is in array between left and right, and false otherwise
  if (left > right) {
    return false;
  }
  var mid = Math.floor((left + right) / 2);
  if (array[mid] === x) {
    return true;
  } else if (array[mid] > x) {
    right = mid - 1;
  } else {
    left = mid + 1;
  }
  return search(array, x, left, right);
}

function binarySearch(array, x) {
  // return a Boolean: true if x is in array, and false otherwise
  var n = array.length;
  var left = 0;
  var right = n;
  return search(array, x, left, right);
}

// Do not modify the code below this point--------------------------------
module.exports = {
  genRandomArray: genRandomArray,
  swap: swap,
  bubbleSort: bubbleSort,
  search: search,
  binarySearch: binarySearch,
};
