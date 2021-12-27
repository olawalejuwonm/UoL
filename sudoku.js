// Queue class
class Queue {
  // Array is used to implement a Queue
  constructor() {
    this.items = [];
  }

  // Functions to be implemented
  // enqueue(item)
  ENQUEUE(element) {
    // adding element to the queue
    this.items.push(element);
  }
  // dequeue()
  DEQUEUE() {
    // removing element from the queue
    // returns underflow when called
    // on empty queue
    if (this.EMPTY()) return "Underflow";
    return this.items.shift();
  }
  // front()
  HEAD() {
    // returns the Front element of
    // the queue without removing it.
    if (this.EMPTY()) return "No elements in Queue";
    return this.items[0];
  }
  // isEmpty()
  EMPTY() {
    // return true if the queue is empty.
    return this.items.length == 0;
  }
  // printQueue()
  // printQueue() {
  //   var str = "";
  //   for (var i = 0; i < this.items.length; i++) str += this.items[i] + " ";
  //   return str;
  // }
}
// var arr = [1, 2, 3, 4]
// arr.shift()
class Stack {
  constructor() {
    this.data = [];
    this.top = 0;
  }

  PUSH(element) {
    // this.data[this.top] = element;
    this.top = this.data.unshift(element);
    // this.top = this.top + 1;
  }

  TOP() {
    return this.data[0];
  }

  EMPTY() {
    return this.top === 0;
  }

  POP() {
    if (this.EMPTY() === false) {
      this.top = this.top - 1;
      return this.data.shift(); // removes the last element
    }
  }

  // PRINT() {
  //   return this.data;
  // }
}

const genStack = (num, arr) => {
  let s = new Stack();
  if (Array.isArray(arr)) {
    // arr.forEach((v) => {
    //   s.PUSH(v);
    // });
    // console.log(arr.length - 1)
    //do reverse loop
    for (let index = arr.length - 1; index >= 0; index--) {
      const element = arr[index];
      s.PUSH(element);
    }
  } else {
    for (let index = 0; index < num; index++) {
      s.PUSH(Math.round(4 * Math.random()));
    }
  }

  // const v = Math.random()
  // console.log(Math.round(9*v), 9*v, v)

  console.log("Generated Stack:", s.data);

  return s;
};

//TASK 1
function MakeVector(row) {
  let vector = new Array();
  for (let index = 0; index < row.length; index++) {
    // const element = row[index];
    vector[index] = row;
  }
  console.log(
    "sudoku \n",
    vector[0],
    "\n",
    vector[1],
    "\n",
    vector[2],
    "\n",
    vector[3]
  );
  // console.log(vector[(3-1)][(2-1)]) //select row and column
  return vector;
}

// console.log(MakeVector([ 2, 4, 1, 3]))

function PermuteVectorA(row, p) {
  if (p === 0) {
    return row;
  }
  if (p > row.length - 1) {
    console.warn("p shouldn't be greater than", row.length - 1);
    return row;
  }
  let newRow = [];
  // for (let index = 0; index < p; index++) {
  //   let theIndx = index - 1;
  //   if (theIndx < 0) {
  //     theIndx = row.length + theIndx;
  //   }
  //   console.log("theIndx", theIndx, index)
  //   newRow[theIndx] = row[index];
  //}

  //using forEach
  // row.forEach((e, i) => {
  //   let theIndx = i - p;
  //   if (theIndx < 0) {
  //     theIndx = row.length + theIndx;
  //   }
  //   newRow[theIndx] = e;
  // });

  //using for loop
  for (let index = 0; index < row.length; index++) {
    const element = row[index];
    let theIndx = index - p;
    if (theIndx < 0) {
      theIndx = row.length + theIndx;
    }
    newRow[theIndx] = element;
  }
  return newRow;
}

function PermuteVector(row, p) {
  if (p === 0) {
    return row;
  }
  if (p > row.length - 1) {
    console.warn("p shouldn't be greater than", row.length - 1);
    return row;
  }
  let q = new Queue();
  for (let i = 0; i < row.length; i++) {
    q.ENQUEUE(row[i]);
  }
  for (let index = 1; index <= p; index++) {
    q.ENQUEUE(q.HEAD());
    q.DEQUEUE();
  }

  return q.items;
}

function PermuteRows(puzzle, x, y, z) {
  //remember to increase by 1
  puzzle[0] = PermuteVector(puzzle[0], x);
  puzzle[1] = PermuteVector(puzzle[1], y);
  puzzle[2] = PermuteVector(puzzle[2], z);
  return puzzle;
}

function SearchStack(stack, item) {
  let s = new Stack();
  let itemStored = 0; //this is used to track the number of times item was found in the stack

  // console.log(stack.POP(), stack.data)
  while (stack.EMPTY() === false) {
    if (stack.TOP() !== item) {
      s.PUSH(stack.POP());
    } else {
      stack.POP();
      itemStored += 1; //item is found increase itemStored
    }
  }

  let orderedStack = new Stack();
  while (s.EMPTY() === false) {
    orderedStack.PUSH(s.POP());
  }
  if (itemStored === 1) {
    return orderedStack;
  } else {
    //itemStored is either zero or greater than one. if it's zero the item is not found in the stack hence return false, it it's greater than one duplicate item was found in the stack hence return false
    return false;
  }
  // if (s.EMPTY()) {
  //   return s;
  // } else {
  //   return false;
  // }
}

// function SearchStack(stack, item) {
//   let s;
//   let itemStored = 0;

//   while (stack.EMPTY() === false) {
//     if (item === stack.TOP()) {
//       stack.POP();
//       s = stack;
//     }
//     // else {
//     //   return false;
//     // }
//   }
//   // if (s.EMPTY()) {
//   //   return s;
//   // } else {
//   //   return false;
//   // }
// }

const printPuzzle = (vector) => {
  console.log(
    "sudoku \n",
    vector[0],
    "\n",
    vector[1],
    "\n",
    vector[2],
    "\n",
    vector[3]
  );

  return vector;
};

function CheckColumn(puzzle, j) {
  let numbers = genStack(4, [1, 2, 3, 4]);
  //k should be 1 in pseudocode
  for (let k = 0; k < puzzle.length; k++) {
    // numbers = genStack(4, [1, 2, 3, 4]);
    const row = puzzle[k];
    let value = row[j - 1]; //don't do - 1

    numbers = SearchStack(numbers, value);
    if (numbers === false) {
      return false;
    }
  }

  return true;
}

function ColChecks(puzzle) {
  //j should be 1 in pseudocode
  for (let j = 0; j < puzzle.length; j++) {
    if (CheckColumn(puzzle, j) === false) {
      return false;
    }
  }

  return true;
}

function CheckGrids(puzzle) {
  let numbers = genStack(4, [1, 2, 3, 4]);
  let column = 0;
  for (let j = 0; j < puzzle.length; j++) {
    const row = puzzle[j];
    let d = j+1;
    if (d >= puzzle.length) {
      d = j
    }
    let inColumn = column
    const value = row[inColumn]

    numbers = SearchStack(numbers, value)

    if (numbers === false) {
      return false
    }
    else {
      inColumn += 1
      // console.log(column, inColumn)
    }
    
    // for (let k = 0; k < row.length; k++) {
    //   const value = row[k];
      
    // }
    
  }

  return true

}

// console.log(SearchStack(genStack(4, [1, 2, 3, 4]), 2));
console.log(
  CheckGrids(
    printPuzzle([
      [2, 4, 1, 3],
      [1, 2, 3, 4],
      [3, 1, 4, 1],
      [4, 3, 2, 2],
    ])
  )
);
// console.log(
//   CheckColumn(
//     printPuzzle([
//       [2, 4, 1, 3],
//       [1, 2, 3, 4],
//       [3, 1, 4, 1],
//       [4, 3, 2, 2],
//     ]),
//     1
//   )
// );
// console.log(MakeVector([2, 4, 1, 3]));
// console.log(PermuteRows(MakeVector([2, 4, 1, 3]), 1, 2, 3));
// console.log(PermuteVector([2, 4, 1, 3], 1)); //correct [ 4, 1, 3, 2 ]
// console.log(PermuteVector([2, 4, 1, 3], 2)); //correct [ 1, 3, 2, 4 ]
// console.log(PermuteVector([2, 4, 1, 3], 3)); //correct [ 3, 2, 4, 1 ]
// console.log(PermuteVector([2, 4, 1, 3], 4));
