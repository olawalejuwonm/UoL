class BucketFillTool {
  constructor() {
    //set an icon and a name for the object
    this.icon = "assets/freehand.jpg";
    this.name = "bucketFill";

    this.draw = function () { };

    this.mousePressed = function () {
      loadPixels();

      let r = pixels[(mouseY * width + mouseX) * 4];
      let g = pixels[(mouseY * width + mouseX) * 4 + 1];
      let b = pixels[(mouseY * width + mouseX) * 4 + 2];
      console.log(r, g, b);
      bucket(mouseX, mouseY, 0, random(255), random(255), random(255), r, g, b);
      updatePixels();
    };
  }
}



function bucket(x, y, ii, R, G, B, ro, go, bo) {
  let i = 1;
  setInterval(() => {i += 1}, 3000)

  if (i > 10) {
    return;
  }
  // console.log(x, y, ii, R, G, B, ro, go, bo)
  if (!ro|| !go || !bo || !x || !y) {
    return;
  }
  if (ii > 1000) return;
  let r = pixels[(y * width + x) * 4];
  let g = pixels[(y * width + x) * 4 + 1];
  let b = pixels[(y * width + x) * 4 + 2];
  // console.log(r,g,b,ro,go,bo)
  if (r == ro && g == go && b == bo) {
    pixels[(y * width + x) * 4] = R;
    pixels[(y * width + x) * 4+1] = G;
    pixels[(y * width + x) * 4+2] = B;
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
