var GlobalInp;
class TextTool {
  constructor() {
    this.name = "TextTool";
    this.icon = "assets/text.png";
    this.draw = this.Draw;
    this.fontSelected = fonts[Object.keys(fonts)[0]] || "Arial";
    this.sel;
    this.populateOptions = this.Populate;
    this.unselectTool = this.Unpopulate;
    this.selectScale = {};
    this.textMode = false;
    this.mousePressed = this.MousePressed;
    this.mouseDragged = this.MouseDragged;
    this.mouseReleased = this.MouseReleased;
    this.keyPressed = this.KeyPressed;
    this.textBtn;
    this.text;
    this.noHistory = true;
    this.sizeBtn;
    this.size;
    this.doneBtn;
  }

  Draw() {
    if (this.textMode === true) {
      noFill();
      stroke(100);
      rect(
        this.selectScale.x,
        this.selectScale.y,
        this.selectScale.w,
        this.selectScale.h
      );

      this.WriteText();
    }
    if (this.textMode === false) {
      updatePixels();

      if (mouseIsPressed && mouseX > 5 && mouseY < height - 10) {
        noFill();
        stroke(0);
        rect(
          this.selectScale.x,
          this.selectScale.y,
          this.selectScale.w,
          this.selectScale.h
        );
      }
    }

    // else {
    //   updatePixels()
    // }
  }

  Populate() {
    loadPixels();
    cursor("text");
  }

  Unpopulate() {
    Gopt.html("");
    this.DoneWriting();
    cursor();
  }

  MousePressed() {
    if (mouseX > 5 && mouseY < height - 15 && this.textMode === false) {
      this.selectScale.x = mouseX;
      this.selectScale.y = mouseY;
    }
  }

  KeyPressed() {
    if (keyCode === 8) {
      //when text got deleted
      this.ReWrite(0, 0, 0, 0);
    }

    if (keyCode === 13 && this.textMode === true) {
      //when enter key is pressed
      this.DoneWriting();
    }
  }

  MouseDragged() {
    if (
      mouseX > 0 &&
      mouseY > 0 &&
      mouseX < width &&
      mouseY < height &&
      this.textMode === false
    ) {
      let w = mouseX - this.selectScale.x;
      let h = mouseY - this.selectScale.y;

      this.selectScale.w = w;
      this.selectScale.h = h;
    }
  }

  ReWrite(x, y, w, h) {
    fill(255);
    noStroke();
    rect(
      this.selectScale.x + x,
      this.selectScale.y + y,
      this.selectScale.w + w,
      this.selectScale.h + h
    );
    fill(c);
  }

  WriteText() {
    fill(c);
    stroke(c);

    textFont(this.fontSelected);
    textWrap(CHAR);

    text(
      this.text,
      this.selectScale.x,
      this.selectScale.y,
      this.selectScale.w,
      this.selectScale.h
    );
  }

  DoneWriting() {
    this.ReWrite(-3, -3, 5, 5);
    this.WriteText();
    if (this.textBtn) {
      this.textBtn.remove();
    }

    if (this.sel) {
      this.sel.remove();
    }

    if (this.sizeBtn) {
      this.sizeBtn.remove();
    }

    if (this.doneBtn) {
      this.doneBtn.remove();
    }
    this.textMode = false;
    this.textBtn = null;
    this.sel = null;
    this.sizeBtn = null;
    this.doneBtn = null;
    loadPixels();
    helpers.awaitSave();
    helpers.getPixels();
  }

  MouseReleased() {
    // console.log("hello", this.selectScale);
    if (!this.selectScale.w || !this.selectScale.h) {
      return;
    }
    if (!this.textBtn) {
      updatePixels();

      this.textBtn = createInput("", "text");
      this.textBtn.id("textToolInput");
      this.textBtn.elt.placeholder = "Enter Text Here";
      this.textBtn.position(
        this.selectScale.x,
        this.selectScale.y + this.selectScale.h / 2
      );
      this.textBtn.size(this.selectScale.w / 4, this.selectScale.h / 4);
      this.textMode = true;
      // this.textBtn.parent(select("#content"));
      const inpF = () => {
        // console.log(this.textBtn.value(), this.selectScale);

        this.text = this.textBtn.value();
        this.ReWrite(0, 0, 0, 0);
      };
      this.textBtn.input(inpF);
      this.text = "";

      this.mouseReleased(); //recursion to show element below
      loadPixels();
    } else {
      if (!this.sel) {
        this.sel = createSelect();
        for (const font in fonts) {
          this.sel.option(String(font), String(font));
        }
        this.sel.changed(() => {
          this.fontSelected = fonts[this.sel.value()];
          this.ReWrite(0, 0, 0, 0);
        });

        this.sel.parent(Gopt);
      }

      if (!this.sizeBtn) {
        // console.log("size btn", this.selectScale)
        const initValue = abs(round(random(this.selectScale.h / 3)));
        this.sizeBtn = createInput(initValue, "number");
        textSize(initValue);

        this.sizeBtn.input(() => {
          this.size = Number(this.sizeBtn.value());
          textSize(this.size);

          this.ReWrite(0, 0, 0, 0);
        });

        this.sizeBtn.parent(Gopt);
      }

      if (!this.doneBtn) {
        this.doneBtn = createButton("Done");
        this.doneBtn.mousePressed(() => {
          if (this.textMode) {
            this.DoneWriting();
          }
        });

        this.doneBtn.parent(Gopt);
        this.noHistory = false;
      }
    }

    if (this.textMode) {
      this.noHistory = true;
    } else {
      this.noHistory = false;
    }
  }

  DashedRect(x, y, w, h, l, g) {
    l = 1;
    g = 2;
    this.DashedLine(x, y, x + w, y, l, g); //Top
    this.DashedLine(x, y + h, x + w, y + h, l, g); //Bottom
    this.DashedLine(x, y, x, y + h, l, g); //Left
    this.DashedLine(x + w, y, x + w, y + h, l, g); //Right
  }

  DashedLine(x1, y1, x2, y2, l, g) {
    var pc = dist(x1, y1, x2, y2) / 100;
    var pcCount = 1;
    var lPercent = 0;
    var gPercent = lPercent;
    var currentPos = 0;
    var xx1 = 0;
    var yy1 = xx1;
    var xx2 = yy1;
    var yy2 = xx2;

    while (int(pcCount * pc) < l) {
      pcCount++;
    }
    lPercent = pcCount;
    pcCount = 1;
    while (int(pcCount * pc) < g) {
      pcCount++;
    }
    gPercent = pcCount;

    lPercent = lPercent / 100;
    gPercent = gPercent / 100;
    while (currentPos < 1) {
      xx1 = lerp(x1, x2, currentPos);
      yy1 = lerp(y1, y2, currentPos);
      xx2 = lerp(x1, x2, currentPos + lPercent);
      yy2 = lerp(y1, y2, currentPos + lPercent);
      if (x1 > x2) {
        if (xx2 < x2) {
          xx2 = x2;
        }
      }
      if (x1 < x2) {
        if (xx2 > x2) {
          xx2 = x2;
        }
      }
      if (y1 > y2) {
        if (yy2 < y2) {
          yy2 = y2;
        }
      }
      if (y1 < y2) {
        if (yy2 > y2) {
          yy2 = y2;
        }
      }

      line(xx1, yy1, xx2, yy2);
      currentPos = currentPos + lPercent + gPercent;
    }
  }
}
