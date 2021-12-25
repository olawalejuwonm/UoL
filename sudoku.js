//TASK 1
function MakeVector(row) {
  let vector = new Array();
  for (let index = 0; index < row.length; index++) {
    // const element = row[index];
    vector[index] = row;
  }
  return vector;
}

console.log(MakeVector([ 2, 4, 1, 3]))