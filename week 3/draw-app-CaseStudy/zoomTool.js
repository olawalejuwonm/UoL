let zoomMode;
let lastScale = { x: 0, y: 0, w: 0, h: 0 };
class ZoomTool {
  zoomButton;
  unzoomButton;
  cvSize = select("#content").size();

  constructor() {
    zoomMode = getItem("zoomMode") || false;
    //set an icon and a name for the object
    this.icon = "assets/zoom.jpg";
    this.name = "zoomTool";
    this.selectScale = { x: 0, y: 0, w: 0, h: 0 };
    this.img = [];
    this.prevPixel = [{ pixel: null, width: null, height: null }];
    this.zoomed = false;
    this.pressed = false;
    this.unZoomPressed = false;
    this.mouseIsDrag = false;
    this.UnpopulatePressed = false;
    this.noHistory = true;
    this.description = `The zoom tool can be used by dragging the mouse on the canvas and then clicking the zoom button`;

    // let UnzoomButton;

    this.draw = () => {
      updatePixels();

      // if (!this.zoom) {
      //   updatePixels();
      // }
      // else {
      //   return;
      // }
      // if (mouseIsPressed) {
      //   console.log(
      //     this.selectScale,
      //     lastScale,
      //     "press",
      //     JSON.stringify(this.selectScale) === JSON.stringify(lastScale)
      //   );
      // }
      if (
        mouseIsPressed &&
        zoomMode === false &&
        mouseX > 5 &&
        mouseY < height - 10 &&
        this.pressed === true
        //  && JSON.stringify(this.selectScale) !== JSON.stringify(lastScale)
      ) {
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

      cursor("assets/zoomC.png", 30, 30);

      this.zoomButton = createButton("Zoom");
      this.unzoomButton = createButton("Unzoom");
      this.zoomButton.parent(Gopt);
      this.unzoomButton.parent(Gopt);
      this.UnpopulatePressed = false;
      if (zoomMode) {
        this.zoomButton.attribute("disabled", "");
      } else {
        this.unzoomButton.attribute("disabled", "");
      }

      this.zoomButton.mousePressed(() => {
        this.zoomAction();
      });

      this.unzoomButton.mousePressed(() => {
        this.unZoomAction();
      });
    };

    this.mousePressed = () => {
      if (this.unZoomPressed && this.mouseIsDrag) {
        this.mouseIsDrag = false;
        this.unZoomPressed = false;
        this.mousePressed();
        return;
      }

      if (mouseX > 5 && mouseY < height - 15) {
        this.selectScale.x = mouseX;
        this.selectScale.y = mouseY;
        this.pressed = true;
      }
    };

    this.mouseDragged = () => {
      if (this.unZoomPressed === true) {
        this.mouseIsDrag = true;
        return;
      }

      if (mouseX > 0 && mouseY > 0 && mouseX < width && mouseY < height) {
        let w = mouseX - this.selectScale.x;
        let h = mouseY - this.selectScale.y;

        this.selectScale.w = w;
        this.selectScale.h = h;
      }
    };

    this.mouseReleased = () => {
      updatePixels();

      // if (!(mouseY < 20) || !(mouseX < 20)) {

      // }
      if (
        // this.selectScale.w - lastScale.w > 20 &&
        // this.selectScale.h - lastScale.h > 20 &&
        JSON.stringify(this.selectScale) !== JSON.stringify(lastScale)
      ) {
        this.zoomAction();

        lastScale = this.selectScale;
      }
    };

    this.unselectTool = () => {
      this.UnpopulatePressed = true;
      let color = select("#color").value();
      fill(color);
      stroke(color);
      cursor();
    };
  }

  zoomAction() {
    // if (zoomMode === true) {
    //   return;
    // }
    this.cvSize = select("#content").size();

    if (width === this.cvSize.width * 2 || height === this.cvSize.height * 2) {
      this.zoomButton.attribute("disabled", "");
      this.unzoomButton.removeAttribute("disabled");
      return;
    }
    if (
      this.UnpopulatePressed ||
      this.selectScale.x < 0 ||
      this.selectScale.y < 0 ||
      this.selectScale.w < 0 ||
      this.selectScale.h < 0
    ) {
      return;
    }

    if (zoomMode) {
      return;
    }

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
    storeItem("zoomMode", zoomMode);
  }

  unZoomAction() {
    // this.cvSize = select("#content").size()
    if (width === this.cvSize.width || height === this.cvSize.height) {
      this.zoomButton.removeAttribute("disabled");
      this.unzoomButton.attribute("disabled", "");
      return;
    }
    this.prevPixel[0].width = width;
    this.prevPixel[0].height = height;
    this.prevPixel[0].pixel = get();
    loadPixels();

    resizeCanvas(width / 2, height / 2, true);
    fill(255);
    rect(0, 0, width, height);
    loadPixels();

    scale(1);
    image(this.prevPixel[0].pixel, 0, 0, width, height);

    loadPixels();
    this.zoomButton.removeAttribute("disabled");
    this.unzoomButton.attribute("disabled", "");

    zoomMode = false;
    storeItem("zoomMode", zoomMode);

    mouseIsPressed = false;
    this.unZoomPressed = true;

    this.selectScale = { x: -width, y: -height, w: -width, h: -height };
  }
}
