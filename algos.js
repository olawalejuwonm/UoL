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
  for (let i = 0; i <= n - 2; i++) {
    //should be n-2
    let count = 0; //count should be here if not it'll affect pass
    for (let j = 0; j <= n - 2; j++) {
      //should be n-2
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
    console.log(pass, "pass", vecArr)
  }

  console.log("The pass was", pass, "and total comparison/swap is", comp);

  return vecArr;
}

// console.log("Bubble Sort", BubbleSort([3, 1, 2, 5, 4, 10, 8]));
// console.log("Bubble Sort", BubbleSort([9, 5, 1, 4, 1, 5]));
// console.log("Bubble Sort", BubbleSort([ 8, 3, 4, 1]));
// console.log("Bubble Sort", BubbleSort([ 2, 1, 5, 5, 4]));
// console.log("Bubble Sort", BubbleSort([1, 2, 3, 1, 4, 5]));


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
  console.log("after shift", noShift, vecArr)

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
// console.log("Insertion Sort", insertionSort([ 2, 1, 4, 3, 1]));


function genRandomArray(n) {
  var arr = [];
  for (let i = 0; i < n; i++) {
    arr[i] = Math.round(10 * Math.random());
  }
  return arr;
}

// var arr = genRandomArray(8)
// console.log("initial array", arr)
// console.log(BubbleSort(arr))
// function Swap(thevecArr, indexi, indexj) {
//   let x = thevecArr[indexj];
//   thevecArr[indexj] = thevecArr[indexi];
//   thevecArr[indexi] = x;
//   return thevecArr;
// }

// function Swap(array, index1, index2) {
//   var x = array[index2];
//   array[index2] = array[index1];
//   array[index1] = x;
//   // console.log("swap", array)
//   return array;
// }
// const arr = [9, 5, 1, 4, 1, 5];
// const s1 = Swap(arr, (1-1), (2-1));
// const s2 = Swap(s1, 2-1, 5-1);
// const s3 = Swap(s2, 4-1, 5-1);
// console.log(Swap(Swap(Swap(arr, 1, 2), 2, 5), 4, 5));
// console.log("s1,2,3", s1, s2, s3)

// var arr = [1, 2, 2, 3];
// const s1 =  Swap(arr,(1-1),(2-1));
// const s2 =  Swap(arr,(2-1),(3-1));
// console.log("s1,2,3", s1, s2)

// function Shift(array, index1, index2) {
//   if (index1 < index2) {
//     return array;
//   }
//   var x = array[index1];
//   for (var i = index1; i >= index2 + 1; i--) {
//     array[i] = array[i - 1];
//   }
//   array[index2] = x;
//   return array;
// }

// function Shift(arr, ith, jth) {
//   //correct this shift function
//   if (ith <= jth) {
//     return arr;
//   }
//   let store = arr[ith];
//   for (let kthIndex = 0; kthIndex <= ith - jth - 1; kthIndex++) {
//     //tricky
//     arr[ith - kthIndex] = arr[ith - kthIndex - 1];
//   }
//   arr[jth] = store;
//   // noShift += 1;
//   return arr;
// }
// const arr = [2, 3, 4, 1, 5];
// const s1 = Shift(arr, (5-1), (4-1));
// const s2 = Shift(s1, (3-1), (1-1));
// const s3 = Shift(s2, 4-1, 5-1);
// console.log(Swap(Swap(Swap(arr, 1, 2), 2, 5), 4, 5));
// console.log("s1,2,3", s1, s2 )


// var n = 6;
// var sum = 2;
// for (var i = 0; i < n; i++) {
//     sum = 2 * sum;
// }
// console.log(sum);

// var arr = [];
// for (var i = 0; i < 4; i++) {
//     arr[i] = i;
// }
// console.log(arr.length);

function swap(array,index1,index2) {
	var x = array[index2];
	array[index2] = array[index1];
	array[index1] = x;
	return array;
 }
 var arr = [1, 2, 2, 3];
 const s1 = swap(arr,(1-1),(2-1));
 const s2 = swap(arr,(2-1),(3-1));
 console.log(s1, s2);