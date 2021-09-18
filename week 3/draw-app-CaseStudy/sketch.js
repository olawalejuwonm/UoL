//global variables that will store the toolbox colour palette
//amnd the helper functions
// ssw
var toolbox = null;
var colourP = null;
var helpers = null;
var Gopt = null;
var imageB = null;
var undoArr = [];
var redoArr = [];
var canvasContainer = null;
var savedPixels;
var savedImg = {};
var fonts = {
  Arial: "Arial",
  Courier: "Courier New",
  Georgia: "Georgia",
  TNR: "Times New Roman",
  TMS: "Trebuchet MS",
  Verdana: "Verdana",
};

function preload() {
  // fonts.klinzhai = loadFont("assets/fonts/Klinzhai.ttf")
  // fonts.korinth = loadFont("assets/fonts/Korinth.ttf");
  fonts.Aqum = loadFont("assets/fonts/Aqum2Classic.otf");
  fonts.OpenSans = loadFont("assets/fonts/OpenSans-Regular.ttf");

  // fonts.splonic = loadFont("assets/fonts/SPlonic.ttf")
  // savedImg = savedImg()
}
function setup() {
  //create a canvas to fill the content div from index.html
  savedPixels = getItem("pixels");
  // console.log(savedPixels)

  canvasContainer = select("#content");
  console.log(savedImg);
  var cnv = createCanvas(
    savedImg.width || canvasContainer.size().width,
    savedImg.height || canvasContainer.size().height
  );
  cnv.parent("content");

  //create helper functions and the colour palette
  helpers = new HelperFunctions();
  colourP = new ColourPalette();
  imageB = new CanvasImage();

  pixelDensity(1);
  Gopt = select("#options"); //Global Function
  //create a toolbox for storing the tools
  toolbox = new Toolbox();

  //add the tools to the toolbox.
  toolbox.addTool(new FreehandTool());
  toolbox.addTool(new LineToTool());
  toolbox.addTool(new SprayCanTool());
  toolbox.addTool(new mirrorDrawTool());
  toolbox.addTool(new EditableShapeTool());
  // toolbox.addTool(new PolygonTool())

  toolbox.addTool(new RectangleTool());
  toolbox.addTool(new BucketFillTool());
  toolbox.addTool(new TextTool());
  toolbox.addTool(new ZoomTool());
  toolbox.addTool(new EraserTool());

  background(255);

  if (savedPixels) {
    loadImage(savedPixels, (img) => {
      // console.log(img)
      savedImg = img;
      resizeCanvas(savedImg.width, savedImg.height);

      image(img, 0, 0, width, height);
    });
  }

  cnv.mousePressed(function () {
    console.log(toolbox.selectedTool.noHistory);
    if (!toolbox.selectedTool.noHistory) {
      // noHistory is no undo or redo
      if (undoArr.length === 0) {
        helpers.getPixels();
      }
    }

    MousePressed();
    // console.log(select('#defaultCanvas0').elt.toDataURL("image/png"))
  });

  cnv.mouseReleased(() => {

    MouseReleased();
  });

  cnv.touchEnded(() => {
    MouseReleased()
  })



}

function draw() {
  //call the draw function from the selected tool.
  //hasOwnProperty is a javascript function that tests
  //if an object contains a particular method or property
  //if there isn't a draw method the app will alert the user
  if (toolbox.selectedTool.hasOwnProperty("draw")) {
    toolbox.selectedTool.draw();
    select("#message").html(this.toolbox.selectedTool.message || "");

  } else {
    alert("it doesn't look like your tool has a draw method!");
  }
}

function mouseDragged() {
  if (toolbox.selectedTool.hasOwnProperty("mouseDragged")) {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
      toolbox.selectedTool.mouseDragged();
    }
  }
}

function keyPressed() {
  if (toolbox.selectedTool.hasOwnProperty("keyPressed")) {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    }
    toolbox.selectedTool.keyPressed();
  }
}

function MousePressed() {
  // not using mousePressed because it get called outside canvas
  if (toolbox.selectedTool.hasOwnProperty("mousePressed")) {
    toolbox.selectedTool.mousePressed();
  }
}

function MouseReleased() {
 
  if (!toolbox.selectedTool.noHistory) {
    // noHistory is no undo or redo

    helpers.awaitSave()
  
    helpers.getPixels();
  }
  if (toolbox.selectedTool.hasOwnProperty("mouseReleased")) {
    toolbox.selectedTool.mouseReleased();
  }

 
}

function mouseReleased() {
  

}



