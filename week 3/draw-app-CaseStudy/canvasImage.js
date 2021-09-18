class CanvasImage {
  constructor() {
    this.img = null;
    let input;
    this.editBtn = null;
    this.editMode = false;

    input = createFileInput((file) => {
      if (file.type === "image") {
        loadImage(
          file.data,
          (img) => {
            resizeCanvas(img.width, img.height);
            image(img, 20, 20, width - 30, height - 30);
            this.img = img;
            this.handleEdit();

            // img.resize(0, 30);
          },
          (e) => {
            console.log(e);
            alert("Unable To Load Image");
          }
        );

        // createImg(file.data, file.name, "", (limg) => {
        //   limg.hide();

        // });

        // if (!imgLoad) {
        //   alert("Error Loading Image, Try Again!")
        //   imgLoad = false
        // }
      } else {
        alert("Please Select An Image");
        this.img = null;
      }
    });
    input.attribute("accept", "image/*");
    input.attribute("id", "img");
    input.parent("#initOpt");

    // input.elt.onchange = () => {
    //   if (!img) {
    //     // imageWidth = createInput(width, "number");
    //     // imageHeight = createInput(height, "number");
    //     // imageWidth.changed(() => {
    //     //   fill(random(255))
    //     // })
    //     // imageWidth.parent("#initOpt");
    //     // imageHeight.parent("#initOpt");
    //   }
    // };

    
  }

  handleEdit() {
    if (this.img) {
      this.editBtn = createButton("Blur Image");
      this.editBtn.parent("#initOpt");
    }
    this.editBtn.mousePressed(() => {
      if (!this.editMode) {

        helpers.getPixels()

        loadPixels();
        noFill();


        this.img.filter(BLUR, 3);

        image(this.img, 20, 20, width - 30, height - 30);

        // rect(20, 20, width - 30, height - 30);

        this.editBtn.attribute("disabled", "")
        this.editMode = true;
      } else {
        // this.img.filter(BLUR, -3);
        image(this.img, 20, 20, width - 30, height - 30);

        // noFill()
        // noS
        this.editBtn.html("Blur Image");
        this.editMode = false;
      }
    });
  }
}
