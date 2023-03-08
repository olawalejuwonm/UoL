function countingSort(A, k) {
  // k is the maximum value in A
  if (!k) {
    k = Math.max(...A);
  }
  let C = new Array(k + 1).fill(0);
  let R = new Array(A.length).fill(0);
  let pos = 0;
  for (let j = 0; j < A.length; j++) {
    C[A[j]]++;
  }
  console.log("Array C", C);
  for (let i = 0; i < C.length; i++) { // k + 1
  // for descending order
  // for (let i = k; i >= 0; i--) {
    for (let r = pos; r < pos + C[i]; r++) {
      R[r] = i;
    }
    pos += C[i];
    // console.log(pos);

    // while (C[i] > 0) {
    //   R[pos++] = i;
    //   C[i]--;
    // }
  }
  // log ascending order value in R
  return R;
}

console.log(countingSort([1, 2, 0, 2], 3));
// console.log(countingSort([8,3,1,5,1,4]));

// Below is for sorting numbers from smallest to largest, considering positive and negative numbers
// A: array of integer numbers

// k: maximum value stored in A

// k1: minimum value stored in A //CHANGED
function countingSortNeg(A, k, k1) {
  // k is the maximum value in A
  //   let C = new Array(k + 1).fill(0);
  if (!k) {
    k = Math.max(...A);
  }
  if (!k1) {
    k1 = Math.min(...A);
  }
  C = new Array(k - k1 + 1).fill(0);
  let R = new Array(A.length).fill(0);
  let pos = 0;
  for (let j = 0; j < A.length; j++) {
    // C[A[j]]++;
    // C[A[j]] = C[A[j]] + 1;
    //C[A[i]-k1]=C[A[i]-k1]+1
    C[A[j] - k1] = C[A[j] - k1] + 1;
  }
  // for (let i = 0; i < C.length; i++) { // k + 1
  //   for (let i = k; i >= 0; i--) { // for descending order
  //   for 0 <= i < (k-k1+1)  do
  for (let i = 0; i < k - k1 + 1; i++) {
    for (let r = pos; r < pos + C[i]; r++) {
      //   R[r] = i;
      R[r] = i + k1;
    }
    pos += C[i];
    // console.log(pos);

    // while (C[i] > 0) {
    //   R[pos++] = i;
    //   C[i]--;
    // }
  }
  return R;
}
// console.log(countingSortNeg([0,-3,-3,1,2]));
