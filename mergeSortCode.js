function merge(w, v) {
  console.log("Input Vectors To Merge: Left: ", w, "Right: ", v, "\n");
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
  console.log("\n", "mid: ", m, " length: ", n, "l: ", l, " r: ", r, " \n");
  return merge(mergeSort(l), mergeSort(r));
}

// console.log(mergeSort([3, 1, 2, 5, 8, 1]));

console.group("\n\n\n", "Another Example: ");

// console.log(mergeSort([34,65,823,12,6]));
console.log(mergeSort([7,3,5]));

// console.log(mergeSort([8, 5, 3, 1, 1, 10]))

// console.log(mergeSort([0, 1, 16, 4, 9, 25]));

// function Mergesort(A,l,h)
//     if(l<h)
//         mid=l+(h-l)/2
//         Mergesort(A,l,mid)
//         Mergesort(A,mid+1,h)
//         Merge(A,l,mid,h)
// end function

// Below is incorrect
function Merge2(A, low, mid, high) {
  let L = [];
  let R = [];
  //fill L from low to mid
  for (let i = low; i <= mid; i++) {
    L.push(A[i]);
  }
  //fill R from mid+1 to high
  for (let i = mid + 1; i <= high; i++) {
    R.push(A[i]);
  }
  console.log("L: ", L, " R: ", R);
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
  while (i <= mid) {
    A[k] = L[i];
    k = k + 1;
    i = i + 1;
  }
  while (j < high - mid) {
    A[k] = R[j];
    k = k + 1;
    j = j + 1;
  }
  return A;
}

function mergeSort2(A, low, high) {
  // if (!low) low = 0;  //no need to do this it'll cause error
  // if (!high) high = A.length - 1;
  console.log(" low: ", low, " high: ", high, " A: ", A);
  if (low < high) {
    let mid = low + Math.floor((high - low) / 2);
    mergeSort2(A, low, mid);
    console.log(
      "first call",
      "mid: ",
      mid,
      " low: ",
      low,
      " high: ",
      high,
      " A: ",
      A
    );
    mergeSort2(A, mid + 1, high);
    console.log(
      "second call",
      "mid: ",
      mid,
      " low: ",
      low,
      " high: ",
      high,
      " A: ",
      A
    );
    Merge2(A, low, mid, high);
    console.log(
      "third call merge",
      "mid: ",
      mid,
      " low: ",
      low,
      " high: ",
      high,
      " A: ",
      A
    );
  }
  return A;
}

// console.log(mergeSort2([4, 6, 5, 1], 0, 3));
