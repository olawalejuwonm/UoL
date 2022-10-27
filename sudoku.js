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
    // do reverse loop
    for (let index = arr.length - 1; index >= 0; index--) {
      const element = arr[index];
      s.PUSH(element);
    }
    //do reverse loop using while loop
    // let i = 4;
    // while (i > 0) {
    //   console.log(i)
    //   s.PUSH(i);
    //   i = i-1;
    // }
  } else {
    for (let index = 0; index < num; index++) {
      let theNum = Math.round(4 * Math.random());
      if (theNum === 0) {
        theNum = 1;
      }
      s.PUSH(theNum);
    }
    console.log("Generated Stack:", s.data);
  }

  // const v = Math.random()
  // console.log(Math.round(9*v), 9*v, v)

  return s;
};

console.log(genStack(3, []));

const genVec = (num) => {
  let theVec = [];
  for (let index = 0; index < num; index++) {
    let theNum = Math.round(4 * Math.random());
    if (theNum === 0) {
      theNum = 1;
    }
    theVec.push(theNum);
  }
  return theVec;
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

// function PermuteVectorA(row, p) {
//   if (p === 0) {
//     return row;
//   }
//   if (p > row.length - 1) {
//     console.warn("p shouldn't be greater than", row.length - 1);
//     return row;
//   }
//   let newRow = [];
//   // for (let index = 0; index < p; index++) {
//   //   let theIndx = index - 1;
//   //   if (theIndx < 0) {
//   //     theIndx = row.length + theIndx;
//   //   }
//   //   console.log("theIndx", theIndx, index)
//   //   newRow[theIndx] = row[index];
//   //}

//   //using forEach
//   // row.forEach((e, i) => {
//   //   let theIndx = i - p;
//   //   if (theIndx < 0) {
//   //     theIndx = row.length + theIndx;
//   //   }
//   //   newRow[theIndx] = e;
//   // });

//   //using for loop
//   for (let index = 0; index < row.length; index++) {
//     const element = row[index];
//     let theIndx = index - p;
//     if (theIndx < 0) {
//       theIndx = row.length + theIndx;
//     }
//     newRow[theIndx] = element;
//   }
//   return newRow;
// }

//TASK 2
function PermuteVector(row, p) {
  if (p === 0) {
    return row;
  }
  if (p > row.length - 1) {
    console.warn("p shouldn't be greater than", row.length - 1);
    return row;
  }
  let q = new Queue();
  //firstly add all element to the queue
  for (let i = 0; i < row.length; i++) {
    //start from 1
    q.ENQUEUE(row[i]);
  }
  for (let index = 1; index <= p; index++) {
    q.ENQUEUE(q.HEAD());
    q.DEQUEUE();
  }

  console.log(q.items);

  let newRow = [];
  for (let i = 0; i < 4; i++) {
    //start from 1
    newRow[i] = q.DEQUEUE();
  }

  console.log("vector", newRow);
  return newRow;
}
// console.log(PermuteVector([2, 4, 1, 3], 2))

//TASK 3
function PermuteRows(puzzle, x, y, z) {
  //remember to increase by 1
  puzzle[0] = PermuteVector(puzzle[0], x);
  puzzle[1] = PermuteVector(puzzle[1], y);
  puzzle[2] = PermuteVector(puzzle[2], z);
  const vector = puzzle;
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

  return puzzle;
}

//TASK 4
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

const printPuzzle = (vec) => {
  let vector;

  if (Array.isArray(vec)) {
    vector = vec;
  } else {
    vector = [genVec(4), genVec(4), genVec(4), genVec(4)];
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

  return vector;
};

//TASK 5
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
  for (let j = 1; j <= puzzle.length; j++) {
    if (CheckColumn(puzzle, j) === false) {
      return false;
    }
  }

  return true;
}

//TASK 6
function CheckGrids(puzzle) {
  // let column = 0;
  // let numbers = genStack(4, [1, 2, 3, 4]);

  function SearchAGrid(puzzle, startRow, firstColumn, secondColumn) {
    //you can later include an argument to specify number of times to loop
    let currentRow = startRow;
    let endRow = currentRow + 1;

    let numbers = genStack(4, [1, 2, 3, 4]);

    // console.log("start", "row: ", currentRow, currentColumn, endColumn);
    while (currentRow <= endRow) {
      let currentColumn = firstColumn;
      let endColumn = secondColumn + 1;
      // console.log(
      //   "current row: ",
      //   currentRow,
      //   "end row:",
      //   endRow,
      //   "number:",
      //   numbers.data
      // );
      for (; currentColumn < endColumn; currentColumn++) {
        let value = puzzle[currentRow][currentColumn];
        // console.log(
        //   "curent row:",
        //   currentRow,
        //   "current column:",
        //   currentColumn,
        //   "value:",
        //   value
        // );

        numbers = SearchStack(numbers, value);
        if (numbers === false) {
          return false;
        }
      }
      currentRow++;
      // console.log(
      //   "current row: ",
      //   currentRow,
      //   "end row:",
      //   endRow,
      //   "number:",
      //   numbers.data
      // );
    }

    // console.log("end", currentRow, currentColumn, endColumn);
    return true;
  }

  let rowIndex = 0;

  while (rowIndex < puzzle.length) {
    // let firstC = 0;
    // let secondC = 1;
    // console.log(rowIndex)
    let j = 0;
    for (; j < puzzle.length; j += 2) {
      // console.log("jsh", rowIndex, j, j + 1);
      // should be < 2 in pseudocode
      let checkAGrid = SearchAGrid(puzzle, rowIndex, j, j + 1);
      if (checkAGrid === false) {
        // console.log("false", rowIndex, j, j + 1);
        return false;
      }
    }
    rowIndex = rowIndex + 2;
  }

  return true;
}

function SearchAGrid(puzzle, startRow, firstColumn, secondColumn) {
  //you can later include an argument to specify number of times to loop
  let currentRow = startRow;
  let endRow = currentRow + 1;

  let numbers = genStack(4, [1, 2, 3, 4]);

  // console.log("start", "row: ", currentRow, currentColumn, endColumn);
  while (currentRow <= endRow) {
    let currentColumn = firstColumn;
    let endColumn = secondColumn + 1;
    // console.log(
    //   "current row: ",
    //   currentRow,
    //   "end row:",
    //   endRow,
    //   "number:",
    //   numbers.data
    // );
    for (; currentColumn < endColumn; currentColumn++) {
      let value = puzzle[currentRow][currentColumn];
      // console.log(
      //   "curent row:",
      //   currentRow,
      //   "current column:",
      //   currentColumn,
      //   "value:",
      //   value
      // );

      numbers = SearchStack(numbers, value);
      if (numbers === false) {
        return false;
      }
    }
    currentRow++;
    // console.log(
    //   "current row: ",
    //   currentRow,
    //   "end row:",
    //   endRow,
    //   "number:",
    //   numbers.data
    // );
  }

  // console.log("end", currentRow, currentColumn, endColumn);
  return true;
}

//TASK 8 WRONG
// function MakeSolution(row) {
//   let puzzle = MakeVector(row);
//   let solution;
//   let gridCheck;
//   let checkCol;
//   for (let i = 0; i < row.length - 1; i++) {
//     for (let j = 0; j < row.length - 1; j++) {
//       for (let k = 0; k < row.length - 1; k++) {
//         console.log(i, j, k)
//         solution = PermuteRows(puzzle, i, j, k);
//         gridCheck = CheckGrids(solution);
//         checkCol = ColChecks(solution);
//         if (gridCheck === true && checkCol === true) {
//           return solution;
//         }
//       }
//     }
//   }

// }

//TASK 8 RIGHT
function MakeSolution(row) {
  let puzzle = MakeVector(row);
  let solution;
  let gridCheck;
  let checkCol;
  for (let i = 1; i < row.length; i++) {
    for (let j = 1; j < row.length; j++) {
      for (let k = 1; k < row.length; k++) {
        console.log(i, j, k);
        solution = PermuteRows(puzzle, i, j, k);
        gridCheck = CheckGrids(solution);
        checkCol = ColChecks(solution);
        if (gridCheck === true && checkCol === true) {
          return solution;
        }
      }
    }
  }

  return solution;

  // solution = PermuteRows(puzzle, 1, 3, 2);
  // checkCol = ColChecks(solution)
  // console.log(checkCol)

  // while (checkCol !== true) {
  //   solution = PermuteRows(puzzle, 1, 3, 2);
  //   // gridCheck = CheckGrids(solution);
  //   checkCol = ColChecks(solution);
  //   console.log("gridCheck: ", gridCheck, "checkCol", checkCol);

  //   if (checkCol === true) {
  //     break;
  //   }
  // }
}

//TASK 9
function SetBlanks(puzzle, n) {
  let maximumBlank = puzzle.length * puzzle.length;
  if (n > maximumBlank) {
    n = maximumBlank;
  }

  let blanks = 0;
  function SetBlank() {
    // console.log(Math.round(maximumBlank * Math.random()), maximumBlank);
    const randomRow = Math.round((puzzle.length - 1) * Math.random());
    const randomColumn = Math.round((puzzle.length - 1) * Math.random());
    let value = puzzle[randomRow][randomColumn];
    if (value === "X") {
      SetBlank();
    } else {
      puzzle[randomRow][randomColumn] = "X";
      blanks = blanks + 1;
    }
  }

  while (blanks < n) {
    SetBlank();
  }

  

  console.log("final", puzzle)
  return puzzle
}
SetBlanks(MakeSolution([1, 3, 2, 4]), 4);
// console.log(MakeSolution([1, 3, 2, 4]));
// console.log(Math.round(2 * Math.random()));
// console.log(SearchAGrid(printPuzzle(), 0, 2, 3));
// console.log(CheckGrids(printPuzzle()));

// console.log(
//   CheckGrids(
//     printPuzzle([
//       // [2, 4, 1, 3],
//       // [1, 3, 2, 4],
//       // [3, 2, 4, 1],
//       // [4, 1, 3, 2],
//       [2, 4, 3, 4],
//       [1, 3, 2, 1],
//       [1, 3, 1, 2],
//       [2, 4, 3, 4],
//     ])
//   )
// );

// console.log(SearchStack(genStack(4, [1, 2, 3, 4]), 2));
// console.log(
//   CheckGrids(
//     printPuzzle([
//       [2, 4, 1, 3],
//       [1, 2, 3, 4],
//       [3, 1, 4, 1],
//       [4, 3, 2, 2],
//     ])
//   )
// );

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
