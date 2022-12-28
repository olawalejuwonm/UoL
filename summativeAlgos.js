//write in js codes
function hybridSort(A, N) {
  let swapped = 1;
  let pos_min = 0;
  while (swapped) {
    swapped = 0;
    let min = pos_min;
    for (let i = pos_min; i < N - 1; i++) {
      if (A[i + 1] < A[min]) {
        min = i;
      }
      if (A[i] > A[i + 1]) {
        let aux = A[i];
        A[i] = A[i + 1];
        A[i + 1] = aux;
        swapped = 1;
      }
    }
    N = N - 1;
    let aux = A[min];
    A[min] = A[pos_min];
    A[pos_min] = aux;
    pos_min = pos_min + 1;
    // console.log("in while", A);
  }
  return A;
}

// console.log(hybridSort([5, 2, 7, 3, 4], 5));
function Swap(thevecArr, indexi, indexj) {
  console.log("swapping ", thevecArr[indexi], thevecArr[indexj]);
  let x = thevecArr[indexj];
  thevecArr[indexj] = thevecArr[indexi];
  thevecArr[indexi] = x;
  //   comp += 1;

  console.log("swapped", thevecArr);
  return thevecArr;
}

//The function pos_min(A,a,b) returns the position of the minimum value stored between positions a and b in the array, both inclusive.
function pos_min(A, a, b) {
  let min = a;
  for (let i = a + 1; i <= b; i++) {
    if (A[i] < A[min]) {
      min = i;
    }
  }
  return min;
}

function SelectionSort(A, N) {
  //asc
  //   for (let i = 0; i < N-1; i++) {
  //psedo code says N-1
  //desc
  for (let i = 1; i <= N - 1; i++) {
    //asc
    // let min = pos_min(A, i, N - 1);

    //desc
    let min = pos_min(A, 0, i);

    //asc
    // Swap(A, i, min);

    //desc
    Swap(A, min, i);
  }
  return A;
}
// console.log(SelectionSort([5, 2, 7, 3, 4], 5));

//selection sort for descending order
// function Sort(A,N)
//     for 1 <= j <= N-1
//         ins=A[j]
//         i=j-1
//         while (i>=0 and ins<A[i])
//             A[i+1]=A[i]
//             i=i-1
//         end while
//         A[i+1]=ins
//     end for
// end function

function Sort(A, N) {
  //asc
  for (let j = 1; j <= N - 1; j++) {
    //desc
    // for (let j = N - 1; j >= 1; j--) {
    let ins = A[j];
    let i = j - 1;
    //asc
    while (i >= 0 && ins < A[i]) {
      //desc
      // while (i >= 0 && ins > A[i]) {
      A[i + 1] = A[i];
      i = i - 1;
    }
    A[i + 1] = ins;
  }
  return A;
}
// console.log(Sort([5, 5, 7, 3, 4, 2], 5));
// function X(A,low,high)
//     elem=A[high]
//     i = low
//     for i ≤ j < high
//         if A[j] ≤ elem  then
//             swap(A[i],A[j])
//             i = i + 1
//         end if
//     end for
//     swap(A[high],A[i])
//     return i
// end function

function X(A, low, high) {
  //A: array of numbers
  // low: lowest index of array A
  // high: highest index of array A
  let elem = A[high];
  let i = low;
  for (let j = i; j < high; j++) {
    if (A[j] <= elem) {
      Swap(A, i, j);
      i = i + 1;
    }
  }
  Swap(A, high, i);
  return i;
}

//X is partition in quicksort
// console.log(X([5, 2, 7, 3, 8], 0, 4));

function F(A, low, mid, high) {
  let B = [];
  let C = [];
  for (let i = 0; i <= mid; i++) {
    B[i] = A[i];
  }
  for (let i = 0; i < high - mid; i++) {
    C[i] = A[i + mid + 1];
  }
  let i = 0;
  let j = 0;
  let k = 0;
  while (i <= mid && j < high - mid) {
    if (B[i] < C[j]) {
      A[k] = B[i];
      i = i + 1;
    } else {
      A[k] = C[j];
      j = j + 1;
    }
    k = k + 1;
  }
  if (i > mid) {
    for (let m = j; m < high - mid; m++) {
      A[k] = C[m];
      k = k + 1;
    }
  }
  if (j >= high - mid) {
    for (let m = i; m < mid + 1; m++) {
      A[k] = B[m];
      k = k + 1;
    }
  }
  return A;
}

//The time complexity of F is O(n) where n is the number of elements in the array A.
//F is merge in merge sort
// console.log(F([4, 21, 35, 1, 49, 54, 63, 77], 0, 2, 7));
// console.log(F([4, 21, 35, 1, 9, 84], 0, 2, 5));

///////////////////////////////////////////////////////////////////////////////////

// function Sort1(A,d):
//     for 0 <= i <d
//         A=Sort2(A,N,i)
//     return A
// end function

function Sort1(A, d) {
  for (let i = 0; i < d; i++) {
    A = Sort2(A, A.length, i);
    console.log(`A after number ${i} iteration`, A);
  }
  return A;
}

//Sort 1 is radix sort

// function Sort2(A,N,d):
//     R=new array(length(A)) of zeros
//     r=0
//     for 0 <= i < 10
//         for 0 <= j < N
//             digit=floor(A[j]/(10^d))%10
//             if (digit==i):
//                 R[r]=A[j]
//                 r=r+1
//        end for
//     end for
//     return R
// end function

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

// A: array of numbers

// N: number of elements in A

// d: number of digits of the largest number

// Sort1([13,187,4,121],3);
//The task performed by Sort2 is to sort the array A according to the digit d.

// ///////////////////////////////////////////////////////////////////////////////////
// function Sort3(A,N,max)
//     B = new array(N)
//     for 0 ≤ i < N
//         B[i] = empty linked list
//     for 0 ≤ i < N
//         B[floor(A[i]*N/(max+1))] = A[i]
//     for 0 ≤ i < N
//         sort(B[i])
//     for 0 ≤ i < N
//         copy list B[i] back to A
// end function

function Sort3(A, N, max) {
  let B = new Array(N);
  for (let i = 0; i < N; i++) {
    B[i] = [];
  }
  for (let i = 0; i < N; i++) {
    B[Math.floor((A[i] * N) / (max + 1))].push(A[i]);
    // console.log(`B after number ${i} iteration`, B);
  }
  console.log(B, "after second loop");
  for (let i = 0; i < N; i++) {
    B[i] = hybridSort(B[i], B[i].length);
    // Recursively using sort3
    // B[i] = Sort3(B[i], B[i].length, Math.max(...B[i]));
  }
  console.log(B, "after third loop");
  for (let i = 0; i < N; i++) {
    A[i] = B[i];
  }
  return A;
}

// A: array of numbers

// N: number of elements in A

// max: maximum value stored in A

console.log(Sort3([2,45,13,76,58], 5, 76));
