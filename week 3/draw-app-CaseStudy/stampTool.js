class StampTool {
  constructor() {
    this.icon = "assets/stamp.jpg";
    this.name = "stamp";
    this.description = "Stamp Tool"
    let img;
    let input;
    let slider;

    const handleFile = (file) => {
      if (file.type === "image") {
        createImg(file.data, "", "", (image) => {
            img = image
          if (!slider) {
            slider = createSlider(
              5,
              img.size().width*1.5,
              img.size().width / 2,
              5
            );
            slider.parent(Gopt);
              img.hide();
          }
          else {
            img.hide();

          }
        });
      } else {
        img = null;
      }
    };
    this.populateOptions = () => {
      input = createFileInput(handleFile);
      input.parent(Gopt);

    };
    this.unselectTool = function () {
      // updatePixels();
      //clear options
      Gopt.html("");
    };
    this.draw = () => {
      if (img) {
        cursor("grab");
         
      }
    };
    this.mousePressed = () => {
      if (img) {
        if (mouseX > 0 && mouseX < width && mouseY > 5 && mouseY < height) {
          let size = slider.value();
          let x = mouseX + size / 2;
          let y = mouseY + size / 2;
          if (img) {
            image(img, mouseX, mouseY, size);
          }
        }

        // image(star, mouseX, mouseY, starSize);
      }
      else {
          console.log(input)
          input.elt.click()
      }
    };
  }
}
