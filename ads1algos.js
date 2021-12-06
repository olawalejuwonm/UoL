// let x = 1;
// for (let index = 0; index < 5; index++) {
//   if (x < 5) {
//     x = 0;
//   }
//   x = x + index;
// }

// console.log(x);
 
function Even(n) {
  if (n % 2 == 0) {
    return true;
  }
}

function SEC(n) {
  let lastVal;
  let y = 2;
  for (let index = 1; index <= n; index++) {
    if (Even(index)) {
      y = y + index;
    }
    lastVal = index;
  }

//   console.log(lastVal, "last")
  return y;
}
console.log(SEC(4));

// let x = 1;
// let y = 0;
// while (x < 10) {
//   y = x + y;
//   x = x - 1;
//   console.log(x)
// }
// console.log(y)