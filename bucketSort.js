

function countingSort(A, k) {
  // k is the maximum value in A
  if (!k) {
    k = parseInt(Math.max(...A)) || 0;
  }
 
//   console.log(parseInt(k));
  // k must not be an intege
  let C = new Array(k + 1).fill(0);
  let R = new Array(A.length).fill(0);
  let pos = 0;
  for (let j = 0; j < A.length; j++) {
    C[A[j]]++;
  }
  for (let i = 0; i < C.length; i++) {
    // k + 1
    // for (let i = k; i >= 0; i--) {
    // for descending order
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
  return R;
}

function Sort3(A, N, max) {
  if (!N) {
    N = A.length;
  }
  if (!max) {
    max = Math.max(...A);
  }
  let B = new Array(N);
  for (let i = 0; i < N; i++) {
    B[i] = [];
  }
  for (let i = 0; i < N; i++) {
    B[Math.floor((A[i] * N) / (max + 1))].push(A[i]);
    // console.log(`B after number ${i} iteration`, B);
  }
  console.log(B, "B after second loop");
  for (let i = 0; i < N; i++) {
    B[i] = countingSort(B[i]);
    // Recursively using sort3
    // B[i] = Sort3(B[i], B[i].length, Math.max(...B[i]));
  }
  console.log(B, "B after third loop");
  for (let i = 0; i < N; i++) {
    A[i] = B[i];
  }
  return A;
}

console.log(Sort3([20,2,1,0,5]));
