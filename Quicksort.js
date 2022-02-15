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
// function Partition(vector, i, j) {
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

// function swap(vector, i, j) {
//   const temp = vector[i];
//   vector[i] = vector[j];
//   vector[j] = temp;
// }




function Partition(vector, i, j) {
    const m = Math.floor(vector.length / 2); //middle index
//   const m = i + Math.floor((j - i) / 2); //middle index
  const pivot = vector[m]; //pivot is the middle element
  let final = m; //this will be the final location in the vector of the pivot value
  while (i < j) {
    while (vector[i] < pivot) {
      i++; //increment i until we find an element that is greater than the pivot
    }
    while (vector[j] > pivot) {
      j--; //decrement j until we find an element that is less than the pivot
    }
    if (i < j) {
      //swap(vector, i, j)
      const temp = vector[i];
      vector[i] = vector[j];
      vector[j] = temp;
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
  console.log("Partition: ", vector);
  return final;
}



// console.log(Partition([7, 4, 1, 2, 3, 6, 7], 0, 6));