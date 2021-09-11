class ZoomTool {
  constructor() {
    //set an icon and a name for the object
    this.icon = "assets/rectangle.png";
    this.name = "zoomTool";
    this.selectScale = { x: 0, y: 0, w: 50, h: 50 };
    let img = [];
    let zoomButton;
    this.prevPixel = [{ pixel: null, width: null, height: null }];
    // let UnzoomButton;

    this.draw = () => {
      if (mouseIsPressed) {
        // updatePixels();
        noFill();
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

      zoomButton = createButton("Zoom");
      zoomButton.parent(Gopt);

      zoomButton.mousePressed(() => {
        console.log(this.selectScale);
        // zoomButton.attribute("disabled", "");
        this.prevPixel[0].width = width;
        this.prevPixel[0].height = height;
        // resizeCanvas(this.selectScale.w, this.selectScale.y)
        let gotten = get(
          this.selectScale.x,
          this.selectScale.y,
          this.selectScale.w,
          this.selectScale.h
        )
        img.push(
          gotten
        );
        fill(255);
        noStroke()
        rect(
          this.selectScale.x -5,
          this.selectScale.y -5,
          this.selectScale.w + 15,
          this.selectScale.h + 15
        );
        this.prevPixel[0].pixel = get();

        let cont = select("#content")

        // cont.size(cont.size().width*2, cont.size().height*2)

        // cont.elt.clientHeight = cont.size().height*2
        // cont.elt.clientWidth = cont.size().width*2


        resizeCanvas(cont.size().width*2,cont.size().height*2, true)
        image(this.prevPixel[0].pixel, 0, 0)
        scale(2);
        image(
          gotten,
          this.selectScale.x,
          this.selectScale.y
        );

  



      });
    };

    this.mousePressed = () => {
      this.selectScale.x = mouseX;
      this.selectScale.y = mouseY;
    };

    this.mouseDragged = () => {
      var w = mouseX - this.selectScale.x;
      var h = mouseY - this.selectScale.y;

      this.selectScale.w = w;
      this.selectScale.h = h;
    };

    this.mouseReleased = () => {};
  }
}
