function countingSort(A, k) { // k is the maximum value in A
  let C = new Array(k + 1).fill(0);
  let R = new Array(A.length).fill(0);
  let pos = 0;
  for (let j = 0; j < A.length; j++) {
    C[A[j]]++;
  }
  for (let i = 0; i < C.length; i++) { // k + 1
    for (let r = pos; r < pos + C[i]; r++) {
      R[r] = i;
    }
    pos += C[i]; 
    console.log(pos);
    
    // while (C[i] > 0) {
    //   R[pos++] = i;
    //   C[i]--;
    // }
  }
  return R;
}

console.log(countingSort([2, 0, 7, 0, 3], 7));