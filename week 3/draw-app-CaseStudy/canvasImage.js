class CanvasImage {
  constructor() {
    this.img = null;
    let input;
    let imgLoad = false;
    let imageWidth;
    let imageHeight;
    input = createFileInput((file) => {
      if (file.type === "image") {
        createImg(file.data, file.name, "", (limg) => {
          limg.hide();
          image(limg, 20, 20, width - 30, height - 30);
          this.img = limg;
        });
  
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

  
}
