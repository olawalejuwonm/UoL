function merge(w, v) {
  let m = w.length;
  let n = v.length;
  let s = [];
  let i = 0;
  let j = 0;
  let k = 0;
  while (i <= m && j <= n) {
    if (w[i] < v[j]) {
      s[k] = w[i];
      i++;
    } else {
      s[k] = v[j];
      j++;
    }
    k++;
  }
  while (i <= m) {
    s[k] = w[i];
    i++;
    k++;
  }
  while (j <= n) {
    s[k] = v[j];
    j++;
    k++;
  }
  return s;
}
