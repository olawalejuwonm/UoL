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
console.log(R0(1, [1, 3, 5, 7, 9], [2, 4, 6, 8, 10], 10));
//The worst case is the array with total length (N) is odd, and the key is in the second half of the array.
//An example is A = [1, 2, 3, 4, 5, 6, 7, 8, 9], A1 = [1, 3, 5, 7], A2 = [2, 4, 6, 8], key = 8, N = 9
console.log(R0(8, [1, 3, 5, 7], [2, 4, 6, 8], 9));

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
    return A[left];
  }
  //   const N = A.length;
  //   const mid = Math.floor(N / 2);
  //   console.log("mid", mid, N);
  const mid = Math.floor((left + right) / 2);
  const lsum = Sum(A, left, mid);
  const rsum = Sum(A, mid + 1, right);
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

console.log(CreateB([7, 5, 6, 3, 2, 1, 4, 8, 9], 9));
