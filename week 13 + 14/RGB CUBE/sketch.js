// function setup() {
//     createCanvas(900, 600);
//     background(0);
// }

// function draw() {

// }

//ColorMode
function setup() {
  createCanvas(500, 500, WEBGL);
  angleMode(DEGREES);
  colorMode(RGB);
}

function draw() {
  background(125);
  noStroke();

  //A rotating 3D cube
  //The cube should be made up of 10 smaller boxes in each dimension.
  //Rotate the cube in all dimensions so that you can see all sides of it.
  rotateX(frameCount);
  rotateY(frameCount);
  rotateZ(frameCount);
  for (let i = 0; i < 10; i++) {
    //Each box should be of size 30.
    for (let j = 0; j < 10; j++) {
      for (let k = 0; k < 10; k++) {
        push();
        translate(i * 15, j * 15, k * 15);
        //Use the map function to map each little box's x coordinate to a red value between 0 and 255.
        fill(map(i, 0, 10, 0, 255), map(j, 0, 10, 0, 255), map(k, 0, 10, 0, 255));
        
        box(30);
        pop();
      }
    }
  }
}
