function merge(w, v) {
  console.log("Input Vectors: W: ", w, "V: ", v, "\n");
  let m = w.length;
  let n = v.length;
  let s = [];
  let i = 0;
  let j = 0;
  let k = 0;
  while (i < m && j < n) {
    if (w[i] < v[j]) {
      s[k] = w[i];
      i++;
    } else {
      s[k] = v[j];
      j++;
    }
    k++;
  }
  while (i < m) {
    s[k] = w[i];
    i++;
    k++;
  }
  while (j < n) {
    s[k] = v[j];
    j++;
    k++;
  }
  console.log("Merged Vector: ", s, "\n");
  return s;
}



function mergeSort(vector) {
  let n = vector.length;
  if (n <= 1) {
    return vector;
  }
  let m = Math.floor((n + 1) / 2); //no need to do n+1
  let l = vector.slice(0, m);
  let r = vector.slice(m, n);
  console.log("\n", "m: ", m, " n: ", n, "l: ", l, " r: ", r, " \n");
  return merge(mergeSort(l), mergeSort(r));
}

// console.log(mergeSort([3, 1, 2, 5, 8, 1]));

console.group("\n\n\n", "Another Example: ");

// console.log(mergeSort([8, 5, 3, 1, 1, 10]))

// console.log(mergeSort([0, 1, 16, 4, 9, 25]));


// function Mergesort(A,l,h)
//     if(l<h)
//         mid=l+(h-l)/2
//         Mergesort(A,l,mid)
//         Mergesort(A,mid+1,h)
//         Merge(A,l,mid,h)
// end function

function Merge2(A, low, mid, high) {
  let L = [];
  let R = [];
  for (let i = 0; i <= mid; i++) {
    L[i] = A[i];
  }
  for (let i = 0; i < high - mid; i++) {
    R[i] = A[i + mid + 1];
  }
  let i = 0;
  let j = 0;
  let k = 0;
  while (i <= mid && j < high - mid) {
    if (L[i] < R[j]) {
      A[k] = L[i];
      i = i + 1;
    } else {
      A[k] = R[j];
      j = j + 1;
    }
    k = k + 1;
  }
  if (i > mid) {
    for (let m = j; m < high - mid; m++) {
      A[k] = R[m];
      k = k + 1;
    }
  }
  if (j >= high - mid) {
    for (let m = i; m < mid + 1; m++) {
      A[k] = L[m];
      k = k + 1;
    }
  }
  return A;
}

function mergeSort2(A, low, high) {
  // if (!low) low = 0;  //no need to do this it'll cause error
  // if (!high) high = A.length - 1;
  console.log(" low: ", low, " high: ", high, " A: ", A);
  if (low < high) {
    let mid = Math.floor((low + high) / 2);
    mergeSort2(A, low, mid);
    console.log("first call", "mid: ", mid, " low: ", low, " high: ", high, " A: ", A);
    mergeSort2(A, mid + 1, high);
    console.log("second call", "mid: ", mid, " low: ", low, " high: ", high, " A: ", A);
    Merge2(A, low, mid, high);
    console.log("third call merge", "mid: ", mid, " low: ", low, " high: ", high, " A: ", A);
  }
  return A;
}

console.log(mergeSort2([4,6,5,1], 0, 3));