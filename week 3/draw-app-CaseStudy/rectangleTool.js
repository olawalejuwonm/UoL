function RectangleTool() {
    //set an icon and a name for the object
    this.icon = "assets/freehand.jpg";
    this.name = "rectangle";
  
    var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	this.draw = function(){

        // mousePressed(function () {
        //     return false
        // })

		if(mouseIsPressed){
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				loadPixels();
			}

			else{
				updatePixels();
				rect(startMouseX, startMouseY, mouseX*0.8, mouseY*0.8);
			}

		}

		else if(drawing){
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};
  
    this.unselectTool = function () {
    //   fill(0);
    //   stroke(0);
      
    };
  }
  