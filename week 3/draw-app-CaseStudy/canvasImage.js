class CanvasImage {
  constructor() {
    let img;
    let input;
    let imgLoad = false;
    let imageWidth;
    let imageHeight;
    // var slider;

    function handleFile(file) {
      // print(file);
      if (file.type === "image") {
        img = createImg(file.data, "", (lImg) => {
          console.log(lImg)
          imgLoad = true
          img.hide();
          image(img, 0, 0, imageWidth.value(), imageHeight.value());
        });

        // if (!imgLoad) {
        //   alert("Error Loading Image, Try Again!")
        //   imgLoad = false
        // }



      } else {
        alert("Please Select An Image");
        img = null;
      }
    }

    //   input = createFileInput(handleFile);
    //   input.position(0, 0);
    input = createFileInput(handleFile);
    input.attribute("accept", "image/*")
    input.parent("#initOpt")
    input.elt.onchange = () => {
      if (!img) {
        imageWidth = createInput(width, "number");
        imageHeight = createInput(height, "number");
        imageWidth.changed(() => {
          fill(random(255))
        })
        imageWidth.parent("#initOpt");
        imageHeight.parent("#initOpt");
      }
    }
    this.populateOptions = function () {

      // input.position(0, 0);
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
