class CanvasImage {
  constructor() {
    this.img = null;
    let input;
    this.editBtn = null;
    this.editMode = false;

    const getLastItem = (thePath) =>
      thePath.substring(thePath.lastIndexOf("/") + 1);
    let path = getLastItem(window.location.pathname);
    console.log(window.location, path);

    if (path == "birthday.html") {
      AppMode = path;
      SaveWithoutAsync = true;
      
      loadImage("assets/birthday.jpg", (img) => {
        resizeCanvas(img.width, img.height);
        image(img, 0, 0, img.width, img.height);
      });
      let button = createButton("Enter Text");
      button.mousePressed(() => {
        toolbox.selectTool("TextTool")
      })
      button.parent(Gopt);
    }

    //Canvas Image Set An Image As Background of the canvas.
    //It also set the width and height of the canvas approximately to the image size

    //handleFile
    input = createFileInput((file) => {
      if (file.type === "image") {
        loadImage(
          file.data,
          (img) => {
            resizeCanvas(img.width * 2, img.height * 2);
            image(img, 20, 20, width - 30, height - 30);
            this.img = img;
            this.handleEdit();
          },
          (e) => {
            alert("Unable To Load Image");
          }
        );
      } else {
        alert("Please Select An Image");
        this.img = null;
      }
    });
    input.attribute("accept", "image/*");
    input.attribute("id", "img");
    input.parent("#initOpt");
  }

  //Apply filter to the image when edit button is pressed
  handleEdit() {
    if (this.img) {
      this.editBtn = createButton("Blur Image");
      this.editBtn.parent("#initOpt");
    }
    this.editBtn.mousePressed(() => {
      if (!this.editMode) {
        helpers.getPixels();

        loadPixels();
        noFill();

        this.img.filter(BLUR, 3);

        image(this.img, 20, 20, width - 30, height - 30);

        this.editBtn.attribute("disabled", "");
        this.editMode = true;
      } else {
        image(this.img, 20, 20, width - 30, height - 30);
        this.editBtn.html("Blur Image");
        this.editMode = false;
      }
    });
  }
}
