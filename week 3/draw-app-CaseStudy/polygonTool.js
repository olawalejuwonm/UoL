class PolygonTool {
  constructor() {
    this.icon = "assets/lineTo.jpg";
    this.name = "Polygon";

    var startMouseX = -1;
    var startMouseY = -1;
    var drawing = false;

    this.draw = function () {
      if (mouseIsPressed) {
        //   console.log(mouseX, mouseY, pwinMouseY, winMouseY);
        if (mouseX > 0 && mouseY > 0) {
          drawing = true;
          // loadPixels();
        }
        if (startMouseX == -1) {
          startMouseX = mouseX;
          startMouseY = mouseY;
          drawing = true;
          
          // console.log(pixels)
          loadPixels();
        }
        //   else {
        if (drawing) {
          updatePixels();

          line(startMouseX, startMouseY, mouseX, mouseY);
        }
        //   }
      } else if (drawing) {
        drawing = false;

      }


    };

    this.mouseReleased = function mouseReleased() {
      if (mouseX > 0 && mouseY > 0) {
        startMouseX = mouseX;
        startMouseY = mouseY;
      } else {
        drawing = false;
        startMouseX = -1;
        startMouseY = -1;
      }
    };
  }
}
