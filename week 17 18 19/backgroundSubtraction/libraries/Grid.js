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
  run(img, sounds) {
    img.loadPixels();
    this.findActiveNotes(img);
    this.drawActiveNotes(img, sounds);
  }
  /////////////////////////////////
  drawActiveNotes(img, soundsArray) {
    // draw active notes
    fill(255);
    noStroke();
    //The variable below determine whether to play a sound or not
    var playSound = false;
    const randomIndex = floor(map(noise(frameCount / 100), 0, 1, 0, soundsArray.length));

    //The function below check if any of the sound is playing
    function aSoundPlaying() {
      for (var i = 0; i < soundsArray.length; i++) {
        if (soundsArray[i].isPlaying()) {
          return true;
        }
      }
      return false;
    }

    //This function check if n number of sounds are playing
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
          var alpha = this.noteState[i][j] * 200;
          var c1 = color(255, 0, 0, alpha);
          var c2 = color(0, 255, 0, alpha);
          var mappedMix = map(i, 0, this.notePos.length, 0, 1)
          var mix = lerpColor(c1, c2, mappedMix);
          fill(mix);
          var s = this.noteState[i][j];
          ellipse(x, y, this.noteSize * s, this.noteSize * s);
          //Play a sound
          playSound = true;
          // if (!aSoundPlaying()) {  
          //   soundsArray[randomIndex]?.play(0, 1, 1).stop(0.5);
          //   //  playSound = true;
          // }
          // soundsArray[randomIndex]?.play(0, 1, 1)?.stop(0.5);
          // if (!nSoundPlaying(1)) {
          //   soundsArray[randomIndex]?.play()?.ouputVolume(mappedMix)?.stop(0.5);
            
          // }

        }
        // else {
        //   playSound = false;
        // }
        this.noteState[i][j] -= 0.05;
        this.noteState[i][j] = constrain(this.noteState[i][j], 0, 1);
      }
    }
    if (playSound) {
      soundsArray[randomIndex]?.isPlaying() ? soundsArray[randomIndex]?.play() : soundsArray[randomIndex]?.play();
    }
    else {
      //This will stop all sound being played p5js
      // soundsArray.forEach(sound => sound?.stop(0.5));
      // soundsArray[randomIndex]?.stop();
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
