class HelperFunctions {
  constructor() {
    //p5.dom click click events. Notice that there is no this. at the
    //start we don't need to do that here because the event will
    //be added to the button and doesn't 'belong' to the object

    this.getPixels = () => {
      let date = new Date();

      undoArr.push({
        date:
          date.getDate() +
          "/" +
          date.getMonth() +
          "/" +
          date.getFullYear() +
          " " +
          date.getHours() +
          ":" +
          date.getMinutes() +
          ":" +
          date.getSeconds(),
        pixel: get(),
      });
      select("#undoButton").removeAttribute("disabled");
    };

    this.awaitSave = async () => {
      let mes = select("#stateMes");
      mes.html("Saving....");
      setTimeout(() => {
        let dataURL = select("#defaultCanvas0").elt.toDataURL("image/png");
        // let fImg = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
        // console.log(fImg)
        storeItem("pixels", dataURL);
        mes.html("All changes saved locally");
      }, 1000);
    };

    let historyMode = false;
    let historyBtn = select("#History");
    let HistoryDiv = createDiv("Canvas History")
    
    // .style(
    //   "background-color: #444;"
    // );

    historyBtn.mouseClicked(() => {
      HistoryDiv.html("Canvas History")
      undoArr.forEach((a, i) => {
        let button = createButton(a.date, i);
        button.style("display:block;background-color: #444;color:white");
        button.mousePressed(() => {
          console.log(button.value(), i, "values", undoArr[i].pixel)
          resizeCanvas(width, height)
          image(undoArr[i].pixel, 0, 0, width, height)
        });
        button.parent(HistoryDiv);
        console.log(i, a.date);
      });

      HistoryDiv.position(width - 30, 0);
      // HistoryDiv.center()
      HistoryDiv.show();

      if (historyMode === false) {
        historyBtn.html("Close History");
        historyMode = true;
        HistoryDiv.show();

      } else {
        historyBtn.html("Layer History");
        historyMode = false;
        HistoryDiv.hide();

      }
    });

    //event handler for the clear button event. Clears the screen
    select("#clearButton").mouseClicked(() => {
      this.clearCanvas();
    });

    select("#Reload").mouseClicked(() => {
      this.clearCanvas(true);
    });

    this.clearCanvas = (reload) => {
      const clearAll = () => {
        background(255, 255, 255);
        resizeCanvas(
          select("#content").size().width,
          select("#content").size().height
        );
        clear();
        clearStorage();
        select("#img").elt.value = null;
        imageB.img = null;
        storeItem("zoomMode", false);
        removeItem("pixels");
        zoomMode = false;
        // undoArr = []
        // redoArr = []
        //call loadPixels to update the drawing state
        //this is needed for the mirror tool
        loadPixels();
      };
      if (reload) {
        let ans = confirm("This will clear the drawing state. Continue?");
        if (ans) {
          clearAll();
        }

        window.location.reload();
      } else {
        clearAll();
      }
    };

    //event handler for the save image button. saves the canvsa to the
    //local file system.
    select("#saveImageButton").mouseClicked(function () {
      save("myCanvas.jpg");
    });

    let undobtn = select("#undoButton");
    let redobtn = select("#redoButton");

    undobtn.mouseClicked(function () {
      // console.log(undoArr);
      let date = new Date();
      var undoL = undoArr.length;
      if (undoL > 0) {
        redoArr.push({
          date:
            date.getDate() +
            "/" +
            date.getMonth() +
            "/" +
            date.getFullYear() +
            " " +
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":" +
            date.getSeconds(),
          pixel: get(),
        });
        redobtn.removeAttribute("disabled");
        // resizeCanvas(width, height)
        clear();
        image(undoArr[undoL - 1].pixel, 0, 0, width, height);
        // undoArr[undoArr.length - 1].loadPixels();
        // updatePixels()
        undoArr.splice(undoL - 1, 1);
      }
      if (undoArr.length === 0) {
        undobtn.attribute("disabled", "");
      }

      // console.log(undoArr);
    });

    redobtn.mouseClicked(function () {
      // console.log(redoArr)
      var redoL = redoArr.length;

      if (redoL > 0) {
        let date = new Date();

        undoArr.push({
          date:
            date.getDate() +
            "/" +
            date.getMonth() +
            "/" +
            date.getFullYear() +
            " " +
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":" +
            date.getSeconds(),
          pixel: get(),
        });
        undobtn.removeAttribute("disabled");

        image(redoArr[redoL - 1].pixel, 0, 0);
        // undoArr[undoArr.length - 1].loadPixels();
        // updatePixels()
        // undoArr.push(redoArr[redoL - 1])
        redoArr.splice(redoL - 1, 1);
      }
      if (redoArr.length === 0) {
        redobtn.attribute("disabled", true);
      }

      // console.log(redoArr);
    });
  }
}
