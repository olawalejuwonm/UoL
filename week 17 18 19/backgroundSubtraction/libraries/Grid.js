class Grid {
  /////////////////////////////////
  constructor(_w, _h) {
    this.gridWidth = _w;
    this.gridHeight = _h;
    this.noteSize = 40;
    this.notePos = [];
    this.noteState = [];

    // initalise grid structure and state
    for (var x = 0; x < _w; x += this.noteSize) {
      var posColumn = [];
      var stateColumn = [];
      for (var y = 0; y < _h; y += this.noteSize) {
        posColumn.push(createVector(x + this.noteSize / 2, y + this.noteSize / 2));
        stateColumn.push(0);
      }
      this.notePos.push(posColumn);
      this.noteState.push(stateColumn);
    }
  }
  /////////////////////////////////
  run(img, sounds) { //sounds is an array of sounds passed from the draw function in sketch.js
    img.loadPixels();
    this.findActiveNotes(img);
    this.drawActiveNotes(img, sounds); //The sounds array is passed to the drawActiveNotes function
  }
  /////////////////////////////////
  drawActiveNotes(img, soundsArray) {
    //soundArray is an array of sounds passed from the draw function in sketch.js implementing modular code
    // draw active notes
    fill(255);
    noStroke();
    //The variable below determine whether to play a sound or not
    var playSound = false;
    const randomIndex = floor(random(0, soundsArray.length)); //This is used to pick a random sound from the array of sounds

    //The function below check if any of the sound is playing
    function aSoundPlaying() {
      for (var i = 0; i < soundsArray.length; i++) {
        if (soundsArray[i].isPlaying()) {
          return true;
        }
      }
      return false;
    }

    //This function check if n number of sounds are(is) playing
    function nSoundPlaying(n) {
      var count = 0;
      for (var i = 0; i < soundsArray.length; i++) {
        if (soundsArray[i].isPlaying()) {
          count++;
        }
      }
      if (count >= n) {
        return true;
      } else {
        return false;
      }
    }


    for (var i = 0; i < this.notePos.length; i++) {
      for (var j = 0; j < this.notePos[i].length; j++) {
        var x = this.notePos[i][j].x;
        var y = this.notePos[i][j].y;
        if (this.noteState[i][j] > 0) {
          var s = this.noteState[i][j]; // get state of note
          var alpha = constrain(s * 255, 0, 255);
          var c1 = color(0, 0, 255, alpha);
          var c2 = color(0, 255, 255, alpha);
          var mappedMix = map(i, 0, this.notePos.length, 0, 1)
          var mix = lerpColor(c1, c2, mappedMix);
          fill(mix);
          if (s > 0.75) { // if note is very active, this draw a triangle
            triangle(x - this.noteSize / 2, y - this.noteSize / 2, x + this.noteSize / 2, y - this.noteSize / 2, x, y + this.noteSize / 2);
          }
          else if (s > 0.5) { // if note is active, this draw a rectangle
            rect(x - this.noteSize / 2, y - this.noteSize / 2, this.noteSize, this.noteSize);
          }
          else {
            //If note is getting inactive, this draw an ellipse
            ellipse(x, y, this.noteSize * s, this.noteSize * s);

          }



          //This flag is used to set the sound to play or not
          playSound = true;
          outputVolume(s, 1); //This function sets the volume of the sound and a second ramp is used to make it fade in and out

        }
        this.noteState[i][j] -= 0.05;
        this.noteState[i][j] = constrain(this.noteState[i][j], 0, 1);
      }
    }
    if (playSound) { //if the playSound flag is set to true, then this will play a sound

      soundsArray[randomIndex]?.play()

    }
    else {

      outputVolume(0, 0.2); //This function sets the volume of the sound to 0 once the sound is not to be played
    }


  }
  /////////////////////////////////
  findActiveNotes(img) {
    for (var x = 0; x < img.width; x += 1) {
      for (var y = 0; y < img.height; y += 1) {
        var index = (x + (y * img.width)) * 4;
        var state = img.pixels[index + 0];
        if (state == 0) { // if pixel is black (ie there is movement)
          // find which note to activate
          var screenX = map(x, 0, img.width, 0, this.gridWidth);
          var screenY = map(y, 0, img.height, 0, this.gridHeight);
          var i = int(screenX / this.noteSize);
          var j = int(screenY / this.noteSize);
          this.noteState[i][j] = 1;
        }
      }
    }
  }
}
