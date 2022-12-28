const countingSort = (arr, size, place) => {
  let output = new Array(size + 1).fill(0);
  let max = Math.max(...arr);

  let freq = new Array(max + 1).fill(0);

  // Calculate count of elements
  for (let i = 0; i < size; i++) {
    const num = Math.floor(arr[i] / place) % 10;
    freq[num]++;
  }

  // Calculate cummulative count
  for (let i = 1; i < 10; i++) {
    freq[i] += freq[i - 1];
  }

  // Place the elements in sorted order
  for (let i = size - 1; i >= 0; i--) {
    const num = Math.floor(arr[i] / place) % 10;
    output[freq[num] - 1] = arr[i];
    freq[num]--;
  }

  //Copy the output array
  for (let i = 0; i < size; i++) {
    arr[i] = output[i];
  }
};
const radixSort = (arr, size = arr.length) => {
  //Get the max element
  let max = Math.max(...arr);

  //Sort the array using counting sort
  for (let i = 1; parseInt(max / i) > 0; i *= 10) {
    countingSort(arr, size, i);
  }
  return arr;
};

function Sort1(A, d) {
  //number of digits of the largest number
  if (d == undefined) {
    d = Math.max(...A).toString().length;
  }
  for (let i = 0; i < d; i++) {
    A = Sort2(A, A.length, i);
    console.log(`A after number ${i} iteration`, A);
  }
  return A;
}

//Sort 1 is radix sort

function Sort2(A, N, d) {
  let R = new Array(N).fill(0);
  let r = 0;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < N; j++) {
      let digit = Math.floor(A[j] / Math.pow(10, d)) % 10; // explain this line
      if (digit == i) {
        R[r] = A[j];
        r = r + 1;
      }
    }
  }
  return R;
}

//Sort 2 is counting sort

console.log(Sort1([13, 18, 4, 21]));
