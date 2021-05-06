function EraserTool() {
  //set an icon and a name for the object
  this.icon = "assets/freehand.jpg";
  this.name = "eraser";

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
