
class EraserTool {
  constructor() {
    //set an icon and a name for the object
    this.icon = "assets/eraser.jpg";
    this.name = "eraser";

    var slider;
    this.populateOptions = function () {
      noFill();
      loadPixels();
      slider = createSlider(50, 200, 5);
      createP("Eraser Intensity: ").parent(Gopt);
      slider.parent(Gopt);
    };
    this.draw = function () {
      if (mouseIsPressed) {
        stroke(255);
        fill(255);
        ellipse(mouseX, mouseY, slider.value());
      }
    };

    this.unselectTool = function () {
      Gopt.html("");
      var color = select("#color");
      fill(color.value());
      stroke(color.value());
    };
  }
}
