class EditableShapeTool {
  constructor() {
    this.icon = "assets/editable.png";
    this.name = "editable";
    var ss = select(".options");
    var editButton;
    var finishButton;
    var currentShape = [];

    //   input = createFileInput(handleFile);
    //   input.position(0, 0);
    this.populateOptions = function () {
      noFill();
      loadPixels();
      editButton = createButton("edit shape");

      finishButton = createButton("finish shape");
      // print(ss)
      finishButton.mousePressed(function () {
        loadPixels();
        currentShape = [];
      });
      finishButton.parent(ss);
      editButton.parent(ss);
    };
    this.unselectTool = function () {
      // updatePixels();
      //clear options
      select(".options").html("");
    };
    this.draw = function () {
      if (mouseIsPressed) {
        currentShape.push({
          x: mouseX,
          y: mouseY,
        });

        beginShape();
        for (var i = 0; i < currentShape.length; i++) {
          vertex(currentShape[i].x, currentShape[i].y);
        }

        endShape();
        // image(star, mouseX, mouseY, starSize);
      }
    };
  }
}
