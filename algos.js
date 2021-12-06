function BubbleSort(vecArr) {
  const n = vecArr.length;
  function Swap(thevecArr, indexi, indexj) {
    let x = thevecArr[indexj];
    thevecArr[indexj] = thevecArr[indexi];
    thevecArr[indexi] = x;
    return thevecArr;
  }
  let pass = 0;
  let comp = 0;
  for (let i = 0; i <= n - 1; i++) { //should be n-2
    let count = 0; //count should be here if not it'll affect pass
    for (let j = 0; j <= n - 1; j++) {  //should be n-2
      if (vecArr[j + 1] < vecArr[j]) {
        Swap(vecArr, j, j + 1);
        count += 1;
        comp += 1;
      }
    }

    if (count == 0) {
      //if everything is already sorted and the pass run no swap was made stop looping
      break;
    }
    pass += 1;
    // console.log(pass, "pass", vecArr)
  }

  console.log("The pass was", pass, "and total comparison/swap is", comp);

  return vecArr;
}

// console.log("Bubble Sort", BubbleSort([3, 1, 2, 5, 4, 10, 8]));
// console.log("Bubble Sort", BubbleSort([9, 5, 1, 4, 1, 5]));
// console.log("Bubble Sort", BubbleSort([ 8, 3, 4, 1]));
// console.log("Bubble Sort", BubbleSort([ 6, 7, 3, 4]));

function insertionSort(vecArr) {
    let noShift = 0
    let noOfComp = 0
  function shift(arr, ith, jth) {
    if (ith <= jth) {
      return arr;
    }
    let store = arr[ith];
    for (let kthIndex = 0; kthIndex <= ith - jth - 1; kthIndex++) { //tricky
      arr[ith - kthIndex] = arr[ith - kthIndex - 1];
    }
    arr[jth] = store;
    noShift += 1
    return arr;
  }
  for (let iindex = 1; iindex <= vecArr.length; iindex++) {
    let j = iindex;
    while (vecArr[iindex] < vecArr[j - 1] && j > 0) {
      j = j - 1;
      noOfComp += 1;
    }
    shift(vecArr, iindex, j)
  }
  console.log("No of shift was", noShift, "and No Of Comparison was", noOfComp)
  return vecArr
}

// console.log("Insertion Sort", insertionSort([ 6, 7, 3, 4]));
// console.log("Insertion Sort", insertionSort([9, 5, 1, 4, 1, 5]));
// console.log("Insertion Sort", insertionSort([ 8, 3, 4, 1]));
// console.log("Insertion Sort", insertionSort([ 6, 7, 3, 4]));


function genRandomArray(n) {
  var arr = [];
  for (let i = 0; i < n; i++) {
    arr[i] = Math.round(10 * Math.random())
  }
  return arr
}

// var arr = genRandomArray(8)
// console.log("initial array", arr)
// console.log(BubbleSort(arr))