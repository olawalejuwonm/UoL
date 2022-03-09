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
  let m = Math.floor((n + 1)/ 2); //no need to do n+1
  let l = vector.slice(0, m);
  let r = vector.slice(m, n);
  console.log("\n" ,"m: ", m, " n: ", n, "l: ", l, " r: ", r, " \n");
  return merge(mergeSort(l), mergeSort(r));
}

console.log(mergeSort([3, 1, 2, 5, 8, 1]));


console.group("\n\n\n", "Another Example: ");

console.log(mergeSort([8, 5, 3, 1, 1, 10]))