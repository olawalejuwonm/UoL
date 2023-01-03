function R0(key, A1, A2, N) {
  //an array A of length N storing non-negative integers
  //A1 array stores the values A[i] where i is an even number
  //A2 array stores the values A[j] where j is an odd number
  //key is the value to be searched for in the array A
  //N is the length of the array A
  let runningTime = "";
  const ceil = Math.ceil(N / 2);
  console.log("ceil", ceil);
  for (let i = 0; i < ceil; i++) {
    if (A1[i] == key) {
      return 2 * i;
    }
    console.log("A2[i]", A2[i], i);
  }
  const floor = Math.floor(N / 2);
  console.log("floor", floor);
  for (let i = 0; i < Math.floor(N / 2); i++) {
    if (A2[i] == key) {
      return 2 * i + 1;
    }
    console.log("A1[i]", A1[i], i);
  }
  return -1;
}

//The best case is the array with total length (N) is even, and the key is in the first half of the array.
//An example is A = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], A1 = [1, 3, 5, 7, 9], A2 = [2, 4, 6, 8, 10], key = 1, N = 10
// console.log(R0(1, [1, 3, 5, 7, 9], [2, 4, 6, 8, 10], 10));
//The worst case is the array with total length (N) is odd, and the key is in the second half of the array.
//An example is A = [1, 2, 3, 4, 5, 6, 7, 8, 9], A1 = [1, 3, 5, 7], A2 = [2, 4, 6, 8], key = 8, N = 9
// console.log(R0(8, [1, 3, 5, 7], [2, 4, 6, 8], 9));

// function Sum(A,left,right)
// if left > right:
// return 0
// else if left = right:
// return A[left]
// mid = floor(N/2)
// lsum = Sum(A,left,mid)
// rsum = Sum(A,mid+1,right)
// return lsum + rsum
// function CreateB(A,N)
// B = new Array of length 1
// B[0] = Sum(A,0,N-1)
// return B

function Sum(A, left, right) {
  if (left > right) {
    return 0;
  } else if (left == right) {
    return A[left]; //1
  }
  //   const N = A.length;
  //   const mid = Math.floor(N / 2);
  const mid = Math.floor((left + right) / 2);
  console.log("mid", mid, "left", left, "right", right);
  const lsum = Sum(A, left, mid); // 0, 0 => 1
  const rsum = Sum(A, mid + 1, right); // 1, 1 => 2
  return lsum + rsum;
}

function CreateB(A, N) {
  if (!N) {
    N = A.length;
  }
  const B = new Array(1);
  B[0] = Sum(A, 0, N - 1);
  return B;
}

//in a new scenario, given an array A of non-negative integers of length N,
// additionally a second array B is created; each element B[j] stores the value
// A[2*j]+A[2*j+1]. This works straightforwardly if N is even. If N is odd then the final element
// of B just stores A[N-1]
// console.log(CreateB([7, 5, 6, 3, 2, 1, 4, 8, 9], 9));
// console.log(CreateB([1, 2], 2));
// console.log(CreateB([1, 2, 3, 4, 5, 6, 7, 8, 9], 9));

// console.log(CreateB([1, 2, 3, 4, 5]));
// console.log(CreateB([2, 1]));
function createB2(A, N) {
  if (!N) {
    N = A.length;
  }
  const B = new Array(Math.ceil(N / 2));
  for (let j = 0; j < Math.floor(N / 2); j++) {
    B[j] = A[2 * j] + A[2 * j + 1];
    // console.log("B[j]", B[j], j, A[2 * j], A[2 * j + 1]);
  }
  const isOdd = N % 2 == 1;
  console.log("isOdd", isOdd);
  if (isOdd) {
    B[B.length - 1] = A[N - 1];
  }
  return B;
}

// console.log(createB2([7, 5, 6, 3, 2, 1, 4, 8, 9], 9));

//Write a pseudocode function R2(key, A, B, N) that takes a non-negative integer key,
// and arrays A and B, as well as the length of A, N: the function should return -2 if the values
// in B do not correspond to the sums of values in A; if no error has been found the function
// should return the index if key is found in A, or -1 if key has not been found.

function R2(key, A, B, N) {
  B = CreateB(B, B.length); //This creates a new array B with first element as the sum of all of values in B
  if (B[0] != Sum(A, 0, N - 1)) {
    return -2;
  }
  //   create A1 and A2
  const A1 = new Array(Math.ceil(N / 2)); //Math.ceil(N/2) is used because if N is odd, the last element of A1 will be
  //the last element of A
  const A2 = new Array(Math.floor(N / 2)); //Math.floor(N/2) is used because if N is odd, the last element of A2 will
  //be the second last element of A
  for (let i = 0; i < N; i++) {
    if (i % 2 == 0) {
      //if i is even
      A1[i / 2] = A[i]; //i/2 will always be an integer that's an index of A1
    } else {
      A2[(i - 1) / 2] = A[i]; //i-1 will always be an even number, and (i-1)/2 will always be an integer that's an index
      // of A2
    }
  }
  console.log("A1", A1, "A2", A2);
  return R0(key, A1, A2, N); //R0 is the function that finds the index of a key in an array
}

//The pseudocode for R2 is as follows:
// function R2(key, A, B, N)
// B = CreateB(B, length(B)) //This creates a new array B with first element as the sum of all of values in B
// if B[0] != Sum(A, 0, N-1): //Sum(A, 0, N-1) is the sum of all values in A
//   return -2
// A1 = new Array of length ceil(N/2) //ceil(N/2) is used because if N is odd, the last element of A1 will be the last
//element of A
// A2 = new Array of length floor(N/2) //floor(N/2) is used because if N is odd, the last element of A2 will be the
//second last element of A
// for 0 <= i < N:
//  if i mod 2 = 0:
//      A1[i/2] = A[i]
//  else:
//      A2[(i-1)/2] = A[i]
// end for
// return R0(key, A1, A2, N)
// end function

//The worst-case running time of R2 is O(log N) because the worst-case running time of R0 is O(N) and the worst-case
//running time of CreateB is O(N) and the worst-case running time of Sum is O(N) and the worst-case running time of R2
//is O(log N) + O(N) + O(N) + O(N) = O(N)
//The worst case running time of R2 in theta notation is theta(N) because the worst-case running time of R0 is theta(N)
// and the worst-case running time of CreateB is theta(N) and the worst-case running time of Sum is theta(N) and the
//worst-case running time of R2 is theta(N) + theta(N) + theta(N) + theta(N) = theta(N)

// In this case,
// R2 will call R0 N times, and each call to R0 will take O(log N) time, so the total time will be O(N log N).\
const arr = [7, 5, 6, 3, 2, 1, 4, 8, 9];
// const arr = [7, 5, 3, 6, 2];
// console.log(R2(1, arr, createB2(arr, arr.length), arr.length));

//Given an array A of non-negative integers of length N, a second array B of length N is created: for
// each element i of A, the value A[i] is hashed to give an index j of B, and the value A[i] is
// stored in B[j]. For the hashing function, given constants a>0 and b, for each i, the value A[i]
// is hashed by the function (a*A[i] + b) mod N, which is equal to the index of B into which
// we store i.

function createHashB(a, b, A, N) {
  const B = new Array(N);
  for (let i = 0; i < N; i++) {
    const j = (a * A[i] + b) % N;
    B[j] = A[i];
  }
  return B;
}

// console.log(createHashB(3, 1, [7, 5, 6, 4], 4));

// Write a pseudocode function R1(key, a, b, A, B, N) that takes non-negative
// integers key, a and b where a and b come from to the hashing function used to store
// indices in B; the arrays A and B of length N are also inputs: the function should return an
// index i where the value key is stored in array A if found; it should return -1 if the value
// cannot be found; otherwise it should return -2 if there was an error in the data storage,
// i.e. one of the values was altered unintentionally in at most one of the arrays.

function R1(key, a, b, A, B, N) {
  const j = (a * key + b) % N;
  console.log("j", j);

  if (B[j] == key) {
    for (let i = 0; i < N; i++) { // This finds the index i where the value key is stored in array A
      if (A[i] == key) {
        return i;
      }
    }
  } else if (B[j] == undefined) { //if the value does not exist in B
    return -1;
  } else { //if B[j] has another value apart from key it means that there was an error in the data storage
    return -2;
  }
}

//The pseudocode for R1 is as follows:
// function R1(key, a, b, A, B, N)
// j = (a*key + b) mod N
// if B[j] = key:
//   for 0 <= i < N: // This finds the index i where the value key is stored in array A
//     if A[i] = key:
//       return i
//   end for
// else if B[j] = undefined: //if the value does not exist in B
//   return -1
// else: //if B[j] has another value apart from key it means that there was an error in the data storage
//   return -2
// end function


//Briefly explain how the method above could be adapted to allow for repeated integers in 
// array A
//The method above could be adapted to allow for repeated integers in array A by using a
//hash table to store the indices of the values in array A using linear probing.
// The hash function would be the same as the one used to store the values in array B. The function   
//R1 would be modified to return an array of indices of the values in array A that are equal
//to the key.
// Implementation of R1 with linear probing
function R1LinearProbing(key, a, b, A, B, N) {
    const j = (a * key + b) % N;
    if (B[j] == key) {
        const indices = [];
        for (let i = 0; i < N; i++) { // This finds the index i where the value key is stored in array A
            if (A[i] == key) {
                indices.push(i);
            }
        }
        return indices;
    } else if (B[j] == undefined) { //if the value does not exist in B
        return -1;
    } else { //if B[j] has another value apart from key it means that there was an error in the data storage
        return -2;
    }
}


//The method above could be adapted to allow for repeated integers in array A by adding an additional step to the algorithm that checks for repeated integers in A.

// One way to do this would be to create a separate array C of length N that stores a count of the number of times each element appears in A. The algorithm could then check the value in C[i] for each element A[i] to determine whether it is a repeated integer or not.

// If C[i] is greater than 1, this indicates that A[i] is a repeated integer, and the algorithm could continue its search for the key by checking the next element in A. If C[i] is equal to 1, this indicates that A[i] is not a repeated integer, and the algorithm could return the index i if A[i] is equal to the key, or continue its search for the key in the remaining elements of A.

// By adding this additional step to the algorithm, it would be able to handle repeated integers in array A and still return the correct index i if the key is found in A, or -1 if the key is not found in A. It would also still be able to detect errors in the data storage and return -2 if necessary.

//Implementation of R1 with repeated integers in A
function R1RepeatedIntegers(key, a, b, A, B, N) {
    const j = (a * key + b) % N;
    //Array C stores a count of the number of times each element appears in A
    //new array filled with 0s
    const C = new Array(N).fill(0);
    for (let i = 0; i < N; i++) {
        C[A[i]]++;
    }
    if (B[j] == key) {
        for (let i = 0; i < N; i++) { // This finds the index i where the value key is stored in array A
            if (A[i] == key) {
                if (C[i] > 1) {
                    continue;
                } else {
                    return i;
                }
            }
        }
    } else if (B[j] == undefined) { //if the value does not exist in B
        return -1;
    } else { //if B[j] has another value apart from key it means that there was an error in the data storage
        return -2;
    }
}

const arr2 = [7, 5, 5, 6, 4];
const a = 3;
const b = 1;
// console.log(R1(4, 3, 1, [7, 5, 6, 4], createHashB(3, 1, [7, 5, 6, 4], 4), 4));
console.log(R1RepeatedIntegers(5, a, b, arr2, createHashB(a, b, arr2, arr2.length), arr2.length));
// console.log(R1LinearProbing(4, a, b, arr2, createHashB(a, b, arr2, arr2.length), arr2.length));
