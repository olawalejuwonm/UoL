//global variables that will store the toolbox colour palette
//amnd the helper functions
// ssw
var toolbox = null;
var colourP = null;
var helpers = null;
var Gopt = null;
var undoArr = [];
var redoArr = [];
function setup() {
  //create a canvas to fill the content div from index.html
  canvasContainer = select("#content");
  var c = createCanvas(
    canvasContainer.size().width,
    canvasContainer.size().height
  );
  Gopt = select(".options"); //Global Function
  var undobtn = select("#undoButton");
  var redobtn = select("#redoButton")
  c.parent("content");
  c.mousePressed(function () {
    undoArr.push(get());
    undobtn.removeAttribute('disabled')

  });

  undobtn.mouseClicked(function () {
    var undoL = undoArr.length;
    if (undoL  > 0) {
      redoArr.push(get());
      redobtn.removeAttribute('disabled')
      image(undoArr[undoL - 1], 0, 0);
      // undoArr[undoArr.length - 1].loadPixels();
      // updatePixels()


      undoArr.splice(undoL - 1, 1);

    }
    if (undoArr.length === 0) {
      undobtn.attribute("disabled", '')

    }

    // console.log(undoArr);
  });

  redobtn.mouseClicked(function () {
    // console.log(redoArr)
    var redoL = redoArr.length

    if (redoL > 0) {
      undoArr.push(get())
      undobtn.removeAttribute('disabled')

      image(redoArr[redoL - 1], 0, 0);
      // undoArr[undoArr.length - 1].loadPixels();
      // updatePixels()

      
      // undoArr.push(redoArr[redoL - 1])
      redoArr.splice(redoL - 1, 1);


    }
    if (redoArr.length === 0) {
      redobtn.attribute("disabled", true)
    }

    // console.log(redoArr);
  });

  //create helper functions and the colour palette
  helpers = new HelperFunctions();
  colourP = new ColourPalette();

  //create a toolbox for storing the tools
  toolbox = new Toolbox();

  //add the tools to the toolbox.
  toolbox.addTool(new FreehandTool());
  toolbox.addTool(new LineToTool());
  toolbox.addTool(new SprayCanTool());
  toolbox.addTool(new mirrorDrawTool());
  toolbox.addTool(new EraserTool());
  toolbox.addTool(new RectangleTool());
  toolbox.addTool(new StampTool());
  toolbox.addTool(new EditableShapeTool());
  toolbox.addTool(new PolygonTool())
  background(255);
}

function draw() {
  //call the draw function from the selected tool.
  //hasOwnProperty is a javascript function that tests
  //if an object contains a particular method or property
  //if there isn't a draw method the app will alert the user
  if (toolbox.selectedTool.hasOwnProperty("draw")) {
    toolbox.selectedTool.draw();
  } else {
    alert("it doesn't look like your tool has a draw method!");
  }
}

function mouseReleased() {
  if (toolbox.selectedTool.hasOwnProperty("mouseReleased")) {
    toolbox.selectedTool.mouseReleased();
  } 
}
