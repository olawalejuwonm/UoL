//pseudocode for the modulo function
// 1. take the modulo of the number and the divisor
// 2. add the divisor to the modulo
// 3. take the modulo of the sum and the divisor
// 4. return the modulo
// function mod(n, m) {
//n is the number
//m is the divisor
//the modulo is the remainder of the number divided by the divisor
//the modulo = (n % m)
//the sum is the modulo plus the divisor
//the sum = (modulo + m)
//the modulo of the sum is the remainder of the sum divided by the divisor
//the modulo of the sum = (sum % m)
//    return modulo of the sum
// } end of mod function

//modulo function

function mod(n, m) {
  const ans = ((n % m) + m) % m;
  console.log(ans);
  return ans;
}
//modulo function
mod(0, 2);

function remainder(n, m) {
  //implement the modulo function without using %
  const floor = Math.floor(n / m);
  console.log("floor", floor);
  const remainder = n - floor * m;
  console.log("remainder", remainder);
  return remainder;
}

function modulo(n, m) {
  //implement the modulo function without using %
  const theRemainder = remainder(n, m);
  console.log("theRemainder", theRemainder);
  const theSum = theRemainder + m;
  console.log("theSum", theSum);
  const theModulo = remainder(theSum, m);
  console.log("theModulo", theModulo);
  return theModulo;

  // const sum = remainder + m;
  // console.log("sum", sum);
  // const modulo = sum % m;
  // console.log("modulo", modulo);
  // return modulo;

  //   const modulo = number % divisor;
  //   const sum = modulo + divisor;
  //   const moduloOfSum = sum % divisor;
  //   return moduloOfSum;
}

modulo(-5, 3);
