let zoomMode = false;
let lastScale = { x: 0, y: 0, w: 0, h: 0 };
class ZoomTool {
  zoomButton;
  unzoomButton;
  constructor() {
    //set an icon and a name for the object
    this.icon = "assets/rectangle.png";
    this.name = "zoomTool";
    this.selectScale = { x: 0, y: 0, w: 50, h: 50 };
    this.img = [];
    this.prevPixel = [{ pixel: null, width: null, height: null }];
    this.zoom = false;
    // let UnzoomButton;

    this.draw = () => {
      updatePixels();

      // if (!this.zoom) {
      //   updatePixels();
      // }
      // else {
      //   return;
      // }
      if (mouseIsPressed && zoomMode === false) {
        noFill();
        stroke(0);
        rect(
          this.selectScale.x,
          this.selectScale.y,
          this.selectScale.w,
          this.selectScale.h
        );
      }
    };

    // this.unselectTool = function () {
    //   cursor();
    //   Gopt.html("");
    //   //   fill(0);
    //   //   stroke(0);
    // };

    this.populateOptions = () => {
      loadPixels();

      this.zoomButton = createButton("Zoom");
      this.unzoomButton = createButton("Unzoom");
      this.zoomButton.parent(Gopt);
      this.unzoomButton.parent(Gopt);
      // if (zoomMode) {
      //   this.zoomButton.attribute("disabled", "");
      // } else {
      //   this.unzoomButton.attribute("disabled", "");
      // }

      this.zoomButton.mousePressed(() => {
        this.zoomAction();
      });

      this.unzoomButton.mousePressed(() => {
        this.prevPixel[0].width = width;
        this.prevPixel[0].height = height;
        this.prevPixel[0].pixel = get();
        let justGot = get();
        resizeCanvas(width / 2, height / 2);
        scale(1)

        fill(255);
        rect(0, 0, width, height);
        loadPixels();
        image(justGot, 0, 0);
        loadPixels();
        this.zoomButton.removeAttribute("disabled");
        this.unzoomButton.attribute("disabled", "");

        zoomMode = false;
      });
    };

    this.mousePressed = () => {
      this.selectScale.x = mouseX;
      this.selectScale.y = mouseY;
    };

    this.mouseDragged = () => {
      let w = mouseX - this.selectScale.x;
      let h = mouseY - this.selectScale.y;

      this.selectScale.w = w;
      this.selectScale.h = h;
    };

    this.mouseReleased = () => {
      updatePixels();
      if (
        this.selectScale.w - lastScale.w > 20 &&
        this.selectScale.h - lastScale.h > 20 &&
        JSON.stringify(this.selectScale) !== JSON.stringify(lastScale)
      ) {
        this.zoomAction();

        lastScale = this.selectScale;
      }
    };

    this.unselectTool = () => {
      let color = select("#color").value();
      fill(color);
      stroke(color);
    };
  }

  zoomAction() {
    // if (zoomMode === true) {
    //   return;
    // }

    console.log(this.selectScale);
    this.zoomButton.attribute("disabled", "");

    // resizeCanvas(this.selectScale.w, this.selectScale.y)
    // let gotten = get(
    //   this.selectScale.x,
    //   this.selectScale.y,
    //   this.selectScale.w,
    //   this.selectScale.h
    // );
    let gotten = get();
    this.img.push(gotten);
    // fill(255);
    // noStroke();
    // rect( //set white on previous zoom object
    //   this.selectScale.x - 15,
    //   this.selectScale.y - 15,
    //   this.selectScale.w + 15,
    //   this.selectScale.h + 15
    // );
    loadPixels();

    // cont.size(cont.size().width*2, cont.size().height*2)

    // cont.elt.clientHeight = cont.size().height*2
    // cont.elt.clientWidth = cont.size().width*2

    resizeCanvas(width * 2, height * 2);
    fill(255);
    rect(0, 0, width, height);
    loadPixels();
    // image(this.prevPixel[0].pixel, 0, 0);
    scale(2);
    image(gotten, 0, 0);
    loadPixels();
    // fill("red");
    // noStroke();
    // rect( //set white on previous zoom object
    //   this.selectScale.x,
    //   this.selectScale.y,
    //   this.selectScale.w,
    //   this.selectScale.h
    // );

    this.unzoomButton.removeAttribute("disabled");
    zoomMode = true;
  }
}
