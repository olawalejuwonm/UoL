class BucketFillTool {
  constructor() {
    //set an icon and a name for the object
    this.icon = "assets/freehand.jpg";
    this.name = "bucketFill";

    this.draw = function () { };

    this.mousePressed = function () {
      let color = select("#color");
      color = this.hexToRgb(color.value())
      loadPixels();

      let r = pixels[(mouseY * width + mouseX) * 4];
      let g = pixels[(mouseY * width + mouseX) * 4 + 1];
      let b = pixels[(mouseY * width + mouseX) * 4 + 2];
      console.log(r, g, b, color);
      if (r === color.r || g === color.g || b === color.b ) {

      }
      else if ( r === 255){
        bucket(mouseX, mouseY, 0, color.r, color.g, color.b, r, g, b);
      }
      updatePixels();
    };
  }

  hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : {};
  }

  
  
}


function bucket(x, y, ii, R, G, B, ro, go, bo) {
  if (max > 7000) {
    console.log(max)
    max = 0
    return;
    // mult += 1
    // max = 0
  }
  else {
    max += 1
  }

  if (!ro|| !go || !bo || !x || !y) {
    return;
  }
  if(ii > 1000){ 
    // max = 0
    return;};
  let r = pixels[(y * width + x) * 4];
  let g = pixels[(y * width + x) * 4 + 1];
  let b = pixels[(y * width + x) * 4 + 2];
  // console.log(r,g,b,ro,go,bo)
  if (r == ro && g == go && b == bo) {
    pixels[(y * width + x) * 4] = R;
    pixels[(y * width + x) * 4+1] = G;
    pixels[(y * width + x) * 4+2] = B;
    // pixels[(y * width + x) * 4+3] = 1;

    for (let i = -1; i <= 1; i++) {
      if (i == 0) continue;
      if (x + i >= width) break;
      if (x + i < 0) break;
      bucket(x + i, y, ii+1, R, G, B, ro, go, bo);
    }
    for (let i = -1; i <= 1; i++) {
      if (i == 0) continue;
      if (y + i >= width) break;
      if (y + i < 0) break;
      bucket(x, y + i, ii+1, R, G, B, ro, go, bo);
    }
  }
}


let max = 1
 
