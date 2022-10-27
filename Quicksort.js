//Hoare partition, named after the inventor of Quicksort,
//Tony Hoare.
//The Hoare partition scheme is a partitioning scheme that
//partitions the array into two parts, the lower and upper
//partitions. The lower partition contains all the elements
//that are less than the pivot, and the upper partition
//contains all the elements that are greater than the pivot.
//The pivot is chosen as the middle element of the array.
//The Hoare partition scheme is a stable partitioning scheme.
//The pivot element is chosen so that the lower partition
//is always at least as large as the upper partition.
//The Hoare partition scheme is a divide and conquer algorithm.
//The Hoare partition scheme is an in-place algorithm.
//The Hoare partition scheme is a comparison sort.
//The Hoare partition scheme is an online algorithm.
//The Hoare partition scheme is a stable sort.
//write the Hoare partition function here
// function Partition(vector, i, j) { //This is wrong
//     var pivot = vector[i];
//     var left = i;
//     var right = j;
//     while (left < right) {
//         while (vector[left] <= pivot && left < right) {
//             left++;
//         }
//         while (vector[right] > pivot) {
//             right--;
//         }
//         if (left < right) {
//             swap(vector, left, right);
//         }
//     }
//     swap(vector, i, right);
//     console.log("Partition: ", vector);
//     return right;
// }

function swap(vector, i, j) {
  const temp = vector[i];
  vector[i] = vector[j];
  vector[j] = temp;
}
let TotalPartition = 0;

//This is correct
function Partition(vector, i, j) {
  TotalPartition++;
  console.log("Input Vector: ", vector,  "i: ", i,  "j: ", j, "\n");
  const m = Math.floor(i + j / 2); //middle index, This is perfect for the course or floor((vector.length - 1) / 2)
  //   const m = i + Math.floor((j - i) / 2); //middle index
  const pivot = vector[m]; //pivot is the middle element
  console.log("Pivot: ", pivot, " at index: ", m, " \n");
  let totalSwaps = 0;
  let final = m; //this will be the final location in the vector of the pivot value
  while (i < j) {
    while (vector[i] < pivot) {
      i++; //increment i until we find an element that is greater than the pivot
    }
    while (vector[j] > pivot) {
      j--; //decrement j until we find an element that is less than the pivot
    }
    if (i < j) {
      swap(vector, i, j);
      totalSwaps++;
      // const temp = vector[i];
      // vector[i] = vector[j];
      // vector[j] = temp;
      if (i === final) {
        final = j; //
        i++;
      } else if (j === final) {
        final = i;
        j--;
      } else {
        i++;
        j--;
      }
    }
  }
  console.log(
    "Partition: ",
    vector,
    "Final Mid :",
    final,
    "Total Swaps:",
    totalSwaps,
    " \n",
    "\n"
  );
  return final; //This is the final location of the pivot value (index + 1)
}

function Quicksort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const pivot = Partition(arr, 0, arr.length - 1); //This is the pivot which is the final location of the pivot value (index + 1)
  const left = Quicksort(arr.slice(0, pivot));
  const right = Quicksort(arr.slice(pivot + 1, arr.length));
  // console.log("Total Partition: ", TotalPartition, "\n");
  return left.concat(arr[pivot], right);
}
// console.log(Partition([7, 4, 1, 2, 3, 6, 7], 0, 6));
// console.log(Partition([9, 5, 4, 1, 1, 5], 0, 5));

// console.log(Quicksort([9, 5, 4, 1, 1, 5]));

// console.group("\n Another,   \n");
// console.log(Quicksort([4, 5, 9, 1, 1, 5]));
// console.group("\n Another,   \n");


// console.log(Quicksort([9, 8, 3, 1, 2, 5]));

// console.log(Quicksort([0, 1, 16, 4, 9, 25]))
console.log(Quicksort([6, 2, 3, 5, 4]))