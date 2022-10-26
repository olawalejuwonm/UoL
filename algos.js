

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
