class EraserTool {
  constructor() {
    //set an icon and a name for the object
    this.icon = "assets/eraser.jpg";
    this.name = "eraserTool";

    var slider;
    this.populateOptions = function () {
      noFill();
      slider = createSlider(5, width / 4, 5);
      createP("Eraser Intensity: ").parent(Gopt);
      slider.parent(Gopt);

      cursor("assets/eraserC.png");
    };
    this.draw = function () {
      let value = slider.value()
      if (mouseIsPressed) {
        stroke(255);
        fill(255);
        strokeWeight(value)
        line(mouseX, mouseY, mouseX + (value/4), mouseY+(value/4));
      }
    };

    this.unselectTool = function () {
      Gopt.html("");
      var color = select("#color");
      fill(color.value());
      stroke(color.value());
      strokeWeight(1);
      cursor();
    };
  }
}
