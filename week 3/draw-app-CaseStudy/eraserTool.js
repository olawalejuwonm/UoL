function EraserTool() {
  //set an icon and a name for the object
  this.icon = "assets/eraser.jpg";
  this.name = "eraser";

  console.log(Gopt)
  this.populateOptions = function () {
    noFill();
    loadPixels();
    // var slider = createSlider(50, max, [value], [step])
  }
  this.draw = function () {
    if (mouseIsPressed) {
      stroke(255);
      fill(255);
      ellipse(mouseX, mouseY, 25);
    }
  };

  this.unselectTool = function () {
    var color = select("#color");
    fill(color.value());
    stroke(color.value());
  };
}
