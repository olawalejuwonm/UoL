//TASK 1
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
    if (this.isEmpty()) return "Underflow";
    return this.items.shift();
  }
  // front()
  HEAD() {
    // returns the Front element of
    // the queue without removing it.
    if (this.isEmpty()) return "No elements in Queue";
    return this.items[0];
  }
  // isEmpty()
  EMPTY() {
    // return true if the queue is empty.
    return this.items.length == 0;
  }
  // printQueue()
  printQueue() {
    var str = "";
    for (var i = 0; i < this.items.length; i++) str += this.items[i] + " ";
    return str;
  }
}
function MakeVector(row) {
  let vector = new Array();
  for (let index = 0; index < row.length; index++) {
    // const element = row[index];
    vector[index] = row;
  }
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
  let q = new Queue();
  for (let index = 1; index <= p; index++) {

  }
}

console.log(PermuteVector([2, 4, 1, 3], 1)); //correct [ 4, 1, 3, 2 ]
console.log(PermuteVector([2, 4, 1, 3], 2)); //correct [ 1, 3, 2, 4 ]
console.log(PermuteVector([2, 4, 1, 3], 3)); //correct [ 3, 2, 4, 1 ]
// console.log(PermuteVector([2, 4, 1, 3], 4));
