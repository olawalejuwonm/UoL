function RectangleTool() {
  //set an icon and a name for the object
  this.icon = "assets/rectangle.png";
  this.name = "rectangle";

  var startMouseX = -1;
  var startMouseY = -1;
  var drawing = false;
  var pos = 1;

  var color = select("#color");
  this.draw = function () {
    // mousePressed(function () {
    //     return false
    // })
    cursor("crosshair");

    if (mouseIsPressed) {
      if (startMouseX == -1) {
        startMouseX = mouseX;
        startMouseY = mouseY;
        // drawing = true;
        loadPixels();
      } else {
        updatePixels();
        if (pos === 1) {
          noFill();


        }
        if (pos === 2) {
          fill(255);

        }
        stroke(color.value());
        rect(
          startMouseX,
          startMouseY,
          abs(startMouseX - mouseX),
          abs(startMouseY - mouseY)
        );
      }
    } else {
      // loadPixels()
      startMouseX = -1;
      startMouseY = -1;
    }

    // if (mouseIsPressed) {
    //   if (startMouseX == -1) {
    //     startMouseX = mouseX;
    //     startMouseY = mouseY;
    //     drawing = true;
    //     loadPixels();
    //   } else {
    //     updatePixels();
    // fill(255);
    // stroke(color.value());
    // rect(startMouseX, startMouseY, mouseX * 0.1, mouseY * 0.1);
    //   }
    // } else if (drawing) {
    //   drawing = false;
    //   startMouseX = -1;
    //   startMouseY = -1;
    // }
  };

  this.populateOptions = function () {
    var pg = createGraphics(width / 3, 100);
    pg.background(100);
    // pg.noStroke();
    pg.fill(255);
    pg.textSize(20);
    pg.text("Double Click To Select Mode", 10, 30);
    pg.stroke(255);
    pg.noFill();
    pg.rect(45, 50, 40, 20);
    pg.rect(15, 35, 50, 50).mousePressed(() => {

      if (pos === 1) {
        // console.log(pg.mouseX);
        pg.fill(60, 120, 216);
        pg.rect(15, 35, 50, 50)
        pg.noFill()

        pg.rect(45, 50, 40, 20);


      } else  {
        pg.fill(100);
        pg.rect(15, 35, 50, 50)
        pg.noFill()
        pg.rect(45, 50, 40, 20);

      }
    });
    pg.fill(100);
    pg.rect(160, 50, 50, 25);
    pg.rect(140, 35, 50, 50).mousePressed(() => {

      if (pos === 2) {
        pg.fill(60, 120, 216);
        pg.rect(140, 35, 50, 50);
        pg.noFill();
      }
      else  {
        pg.fill(100);
        pg.rect(160, 50, 50, 25);
        pg.rect(140, 35, 50, 50)
      }
    });
    // pg.ellipse(pg.width / 2 + 50, pg.height / 2, 50, 50).mousePressed(() => {
    //   console.log("hi ")
    // });
    pg.canvas.style.display = "block";
      pg.mousePressed(() => {
        // console.log(
        //   "pmouseX",
        //   pmouseX,
        //   "pmouseY",
        //   pmouseY,
        //   "dist",
        //   dist(256, 669, pmouseX, pmouseY),
        //   "pos", pos
        // );

        if (dist(256, 669, pmouseX, pmouseY) <= 120) {
          pos = 1;
        } else if (dist(384, 670, pmouseX, pmouseY) <= 120) {
          pos = 2;
        } 
        // else if (pmouseX >= 256) {
        //   pos = null;
        // }
      });

    Gopt.child(pg);
    // image(pg, 50, 50);
    // image(pg, 0, 0, 50, 50);
    // rect(20, 20, 30, 40).canvas.parent(Gopt)
    // Gopt.child(rect(20, 20, 30, 40).canvas)
  };

  this.unselectTool = function () {
    cursor();
    Gopt.html("");
    //   fill(0);
    //   stroke(0);
  };
}
