function HelperFunctions() {
  //p5.dom click click events. Notice that there is no this. at the
  //start we don't need to do that here because the event will
  //be added to the button and doesn't 'belong' to the object

  //event handler for the clear button event. Clears the screen
  select("#clearButton").mouseClicked(function () {
    background(255, 255, 255);
    select("#img").elt.value = null;
    imageB.img = null;
    //call loadPixels to update the drawing state
    //this is needed for the mirror tool
    loadPixels();
  });

  //event handler for the save image button. saves the canvsa to the
  //local file system.
  select("#saveImageButton").mouseClicked(function () {
    saveCanvas("myDrawing", "jpg");
  });

  let undobtn = select("#undoButton");
  let redobtn = select("#redoButton");

  undobtn.mouseClicked(function () {
    var undoL = undoArr.length;
    if (undoL > 0) {
      redoArr.push(get());
      redobtn.removeAttribute("disabled");
      image(undoArr[undoL - 1], 0, 0);
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
      undoArr.push(get());
      undobtn.removeAttribute("disabled");

      image(redoArr[redoL - 1], 0, 0);
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
