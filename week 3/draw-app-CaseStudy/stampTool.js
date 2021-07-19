function StampTool() {
  this.icon = "assets/stamp.jpg";
  this.name = "stamp";
  var img;
  var input;
  var ss = select(".options")
  var slider;

  function handleFile(file) {
    print(file);
    if (file.type === 'image') {
      img = createImg(file.data, '');
      img.hide();
    } else {
      img = null;
    }
  }
//   input = createFileInput(handleFile);
//   input.position(0, 0);
  this.populateOptions = function() {
    input = createFileInput(handleFile);
    // input.position(0, 0);
    input.parent(ss)
    slider = createSlider(5, 200, 20);
    
    // print(ss)
    slider.parent(ss)
  }
  this.unselectTool = function() {
    // updatePixels();
    //clear options
    select(".options").html("");
};
  this.draw = function () {

    
    if (mouseIsPressed) {

        var x = mouseX + size/2;
        var y = mouseY + size/2;
        var size = slider.value()
        if (img) {
            image(img, mouseX, mouseY, size, size);
          }

        // image(star, mouseX, mouseY, starSize);

    }
  };
}
