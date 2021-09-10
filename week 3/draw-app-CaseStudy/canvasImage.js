class CanvasImage {
  constructor() {
    let img;
    let input;
    let imgSize;
    let imageWidth;
    let imageHeight;
    // var slider;

    function handleFile(file) {
      print(file);
      if (file.type === "image") {
        img = createImg(file.data, "");
        img.hide();
        image(img, 0, 0, imageWidth.value(), imageHeight.value());
      } else {
        alert("Please Select An Image");
        img = null;
      }
    }
    //   input = createFileInput(handleFile);
    //   input.position(0, 0);
    this.populateOptions = function () {
      input = createFileInput(handleFile);
      imageWidth = createInput(width, "number");
      imageHeight = createInput(height, "number");
      // input.position(0, 0);
      input.parent(Gopt);
      imageWidth.parent(Gopt);
      imageHeight.parent(Gopt);
      // slider = createSlider(5, 200, 20);

      input.elt.click();
      console.log(imageWidth);
      // print(ss)
      // slider.parent(Gopt);
    };
    this.unselectTool = function () {
      confirm("Do you want to exit the unsaved changes?")
      // updatePixels();
      //clear options
      Gopt.html("");
    };
    this.draw = function () {
      if (mouseIsPressed) {
        var x = mouseX + size / 2;
        var y = mouseY + size / 2;
        if (img) {
          image(img, 0, 0, imageWidth.value(), imageHeight.value());
        }

        // image(star, mouseX, mouseY, starSize);
      }
    };
  }
}
