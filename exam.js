function Stack() {
  this.arr = [];
  this.push = function (item) {
    for (var i = this.arr.length - 1; i >= 0; i--) {
      this.arr[i + 1] = this.arr[i];
    }
    this.arr[0] = item;
  };
  this.pop = function (item) {
    if (this.arr.length == 0) {
      return "Stack underflow";
    }
    // MISSING1;
    item = this.arr[0];
    var arr2 = [];
    for (var i = 1; i < this.arr.length; i++) {
      arr2[i - 1] = this.arr[i];
    }
    this.arr = arr2;
    return item;
  };
  this.top = function () {
    // return MISSING2;
    return this.arr[0];
  };
  this.isEmpty = function () {
    // MISSING3;
    if (this.arr.length < 1) {
      return true;
    } else {
      return false;
    }
  };

  return this;
}

const myStack = new Stack();
myStack.push(2);
myStack.push(4);
myStack.push(5);
myStack.push(3);
myStack.push(5);

// console.log(myStack.pop());
// console.log(myStack.pop());
// console.log(myStack.pop());
// console.log(myStack.pop());

// console.log(myStack.arr, "Top 1: ", myStack.top());
// console.log(myStack.isEmpty());

const myStack2 = new Stack();
myStack2.push(2);
myStack2.push(4);
myStack2.push(5);
myStack2.push(3);
myStack2.push(5);
// myStack2.push(0);
// myStack2.push(1);

// console.log(myStack2.arr, "Top 2: ", myStack.top());

//The function stacksEqual takes two objects stack1 and stack2, which are
//implementations of stacks. The function should return true if the two objects
//have exactly the same elements with the same values, and false otherwise.
//However, this function does not work correctly.
function stacksEqual(stack1, stack2) {
  // console.log(stack1.arr, stack2.arr)
  //   console.log(stack1 === stack2, "here")

  while (!stack1.isEmpty() && !stack2.isEmpty()) {
    if (stack1.top() !== stack2.top()) {
      //should be top
      return false;
    }
    stack1.pop();
    stack2.pop();
  }
  return stack1.isEmpty() && stack2.isEmpty();
}
// console.log(stacksEqual(myStack, myStack2));
// console.log(myStack.arr, myStack2.arr);

function f1(a, b) {
  while (a !== b) {
    if (a > b) {
      a = a - b;
    } else {
      b = b - a;
    }
  }
  return a;
}

// console.log(f1(13, 12));

// function fibonacci(n) {
//   if (n < 2) {
//     return 0;
//   }

//   return fibonacci(n) + fibonacci(n - 2);
// }

// console.log(fibonacci(2));

let x = 4
x  = x -1
function Check(n) {
    if (n >2) {
        return 2
    }
    return n + 1;
}
x = Check(x)
x = x + Check(x)
x = Check(Check(x))
console.log(x)
