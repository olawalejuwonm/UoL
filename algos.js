

// function A(a, b) {
//   if (b == 0) {
//     return a;
//   } else {
//     return A(a + 1, b - 1);
//   }
// }

// console.log(A(12, 1));

// function A(a, b) {
//     if (a<b) {
//         return a
//     }
//     else {
//         return A(a-b, b)
//     }
// }

// console.log(A(26, 6))

// function A(a, b) {
//     if (b == 0) {
//         return 1
//     }
//     else {
//         return A(a , b-1) * a
//     }
// }

// function A(a, b) {
//     if (a==0) {
//         return a
//     }
//     else {
//         return A(a+1 , b-1) * a
//     }
// }

// function A(a, b) {
//     if (a<b) {
//         return 0
//     }
//     else {
//         return A(a - b, b) + 1
//     }
// }
// console.log(A(26, 4))

// A: a bit vector (an array storing only 1's and 0's)
// pos: highest index of array A
function F(A, pos) {
  if (pos < 0) return 0;
  if (pos == A.length - 1 || pos == 0 || A[pos - 1] == 1 || A[pos + 1] == 1) {
    return 0 + F(A, pos - 1);
  }
  if (A[pos - 1] == 0 && A[pos + 1] == 0) {
    return 1 + F(A, pos - 1);
  }
}

//What is the recurrence equation describing the worst-case running time of the recursive algorithm above?
//The recurrence equation describing the recursive algorithm above is T(n) = T(n-1) + T(n-2) + 1
console.log(F([1,1,0,1,0,1,1,1], 5));

// console.log(F([1, 0, 1, 1, 0, 1], 5));

//convert this to js:
// function Search_Matrix(M, low, high, x):
//     C=number of columns of M
//     if(low<=high)
//         mid=int(low+(high-low)/2) //int(x) returns the integer part of x
//         if((M[mid,0]<=x) and (M[mid,C-1]>=x))
//             return mid
//         else
//             if(M[mid,0]>x)
//                  return Search_Matrix(M,low,mid-1,x)
//             if(M[mid,C-1]<x)
//                  return Search_Matrix(M,mid+1,high,x)
//     else
//         return -1

function Search_Matrix(M, low, high, x) {
  console.log("low: ", low, "high: ", high);
  let C = M[0].length;
  if (low <= high) {
    let mid = Math.floor(low + (high - low) / 2);
    console.log("mid", mid);
    if (M[mid][0] <= x && M[mid][C - 1] >= x) {
      return mid;
    } else {
      if (M[mid][0] > x) {
        return Search_Matrix(M, low, mid - 1, x);
      }
      if (M[mid][C - 1] < x) {
        return Search_Matrix(M, mid + 1, high, x);
      }
    }
  } else {
    return -1;
  }
}

// console.log(
//   Search_Matrix(
//     [
//       [1, 3, 5, 7],
//       [9, 23, 25, 27],
//       [31, 33, 45, 72],
//       [82, 83, 95, 107],
//       [120, 150, 180, 200],
//     ],
//     0,
//     4,
//     90
//   )
// );

// console.log(
//   Search_Matrix(
//     [
//       [1, 3, 5, 7],
//       [9, 23, 25, 27],
//       [31, 33, 45, 72],
//       [82, 83, 95, 107],
//       [120, 150, 180, 200],
//     ],
//     0,
//     4,
//     20
//   )
// );
//What is the worst-case time complexity of the algorithm Search_Matrix? Assume that the number of rows is equal to N.
//The worst-case time complexity of the algorithm Search_Matrix is O(logN)
function BubbleSort(vecArr) {
  const n = vecArr.length;
  let pass = 0;
  let comp = 0;
  function Swap(thevecArr, indexi, indexj) {
    let x = thevecArr[indexj];
    thevecArr[indexj] = thevecArr[indexi];
    thevecArr[indexi] = x;
    comp += 1;

    console.log("swapped", comp, thevecArr);
    return thevecArr;
  }

  for (let i = 0; i <= n - 2; i++) {
    //should be n-2
    let count = 0; //count should be here if not it'll affect pass, it should 
    //be here so it get breaked before increasing pass
    for (let j = 0; j <= n - 2; j++) {
      //should be n-2
      if (vecArr[j + 1] < vecArr[j]) {
        count += 1;
        Swap(vecArr, j, j + 1);
      }
    }

    if (count == 0) {
      //add this if you want to include pass to check if it's sorted

      //if everything is already sorted and the pass run no swap was made stop looping
      break;
    }
    pass += 1;
    // console.log(pass, "pass", vecArr);
  }

  console.log("The pass with swap was", pass, " last pass with sorted is: " , pass+1, "and total comparison/swap is", comp);
  console.log("sorted array", vecArr);
  return vecArr;
}

// console.log("Bubble Sort", BubbleSort([3, 1, 2, 5, 4, 10, 8]));
// console.log("Bubble Sort", BubbleSort([9, 5, 1, 4, 1, 5]));
// console.log("Bubble Sort", BubbleSort([ 8, 3, 4, 1]));
// console.log("Bubble Sort", BubbleSort([ 2, 1, 5, 5, 4]));
// console.log("Bubble Sort", BubbleSort([1, 2, 3, 1, 4, 5]));

function insertionSort(vecArr) {
  let noShift = 0;
  let noOfComp = 0;
  function shift(arr, ith, jth) {
    if (ith <= jth) {
      return arr;
    }
    let store = arr[ith];
    for (let kthIndex = 0; kthIndex <= ith - jth - 1; kthIndex++) {
      //tricky
      arr[ith - kthIndex] = arr[ith - kthIndex - 1];
    }
    arr[jth] = store;
    noShift += 1;
    console.log("after shift", noShift, vecArr);

    return arr;
  }
  for (let iindex = 1; iindex <= vecArr.length; iindex++) {
    let j = iindex;
    while (vecArr[iindex] < vecArr[j - 1] && j > 0) {
      j = j - 1;
      noOfComp += 1;
    }
    shift(vecArr, iindex, j);
  }
  console.log("No of shift was", noShift, "and No Of Comparison was", noOfComp);
  return vecArr;
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

function swap(array, index1, index2) {
  var x = array[index2];
  array[index2] = array[index1];
  array[index1] = x;
  return array;
}
//  var arr = [1, 2, 2, 3];
//  const s1 = swap(arr,(1-1),(2-1));
//  const s2 = swap(arr,(2-1),(3-1));
//  console.log(s1, s2);

// //This is wrong X
// const arr = [9, 5, 1, 4, 5]
// const s1 = swap(arr,(1-1), (2-1))
// console.log(arr, s1, "arr", "s1")
// const s2 = swap(arr, (2-1), (5-1))
// console.log(arr, s2, "arr", "s2")
// const s3 = swap(arr, (4-1), (5-1))
// console.log(s3)

//This is right
// const arr = [9, 5, 1, 4,1, 5]
// const s1 = swap(arr,(1-1), (3-1))
// console.log(arr, s1, "arr", "s1")
// const s2 = swap(s1, (4-1), (5-1))
// console.log(arr, s1, "arr", "s2")
// const s3 = swap(s2, (2-1), (5-1))
// console.log(s3)

function shift(arr, ith, jth) {
  if (ith <= jth) {
    return arr;
  }
  let store = arr[ith];
  for (let kthIndex = 0; kthIndex <= ith - jth - 1; kthIndex++) {
    //tricky
    arr[ith - kthIndex] = arr[ith - kthIndex - 1];
  }
  arr[jth] = store;
  // noShift += 1
  // console.log("after shift", noShift, vecArr)

  return arr;
}

// This is corrects
// const arr = [2, 3, 4, 1, 5];
// const s1 = shift(arr,( 5 - 1), (4 - 1));
// const s2 = shift(s1,( 3 - 1),( 1 - 1));
// console.log(s2)

// BubbleSort([2, 1, 5, 5, 4]) //Good example to practice with

// BubbleSort([5, 1, 2, 2])

// BubbleSort([5, 1, 4, 1]);

// BubbleSort([1, 4, 3, 1, 4, 3])
// insertionSort([2, 1, 4, 2, 1])
// BubbleSort([1, 2, 3, 1, 4, 1, 5]);

// var arr = [1, 2, 2, 3];
// swap(arr, 1, 2);
// swap(arr, 2, 3);
// console.log(arr);
