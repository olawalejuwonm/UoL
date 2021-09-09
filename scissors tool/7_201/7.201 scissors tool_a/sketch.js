
var canvas;

var selectButton;

function setup()
{
	canvas = createCanvas(800, 800);

	background(255);

    // stroke(0);
    
    for (let i = 0; i < 20; i++) {
        ellipse(random(width), random(height), random(20, 100));
      }
	selectButton = createButton('Select area');
    
    selectButton.mousePressed(function()
    {
        //event code will go here    
    });

}


// function setup() {
//     createCanvas(400, 400);
//     pixelDensity(1);
//     background(255);
//     // fill(0)
//     for (let i = 0; i < 1000; i++) {
//       circle(random(width), random(height), random(20, 50));
//     }
//   }
  
  function draw() {}
  
  function mousePressed() {
    loadPixels();
  
    let r = pixels[(mouseY * width + mouseX) * 4];
    let g = pixels[(mouseY * width + mouseX) * 4 + 1];
    let b = pixels[(mouseY * width + mouseX) * 4 + 2];
    console.log(r, g, b);
    bucket(mouseX, mouseY, 0, random(255), random(255), random(255), r, g, b);
    updatePixels();
  }
  
  function bucket(x, y, ii, R, G, B, ro, go, bo) {
    if (ii > 1000) return;
    let r = pixels[(y * width + x) * 4];
    let g = pixels[(y * width + x) * 4 + 1];
    let b = pixels[(y * width + x) * 4 + 2];
    console.log(r, g, b, ro, go, bo);
    if (r == ro && g == go && b == bo) {
      pixels[(y * width + x) * 4] = R;
      pixels[(y * width + x) * 4 + 1] = G;
      pixels[(y * width + x) * 4 + 2] = B;
      for (let i = -1; i <= 1; i++) {
        if (i == 0) continue;
        if (x + i >= width) break;
        if (x + i < 0) break;
        bucket(x + i, y, ii + 1, R, G, B, ro, go, bo);
      }
      for (let i = -1; i <= 1; i++) {
        if (i == 0) continue;
        if (y + i >= width) break;
        if (y + i < 0) break;
        bucket(x, y + i, ii + 1, R, G, B, ro, go, bo);
      }
    }
  }
  