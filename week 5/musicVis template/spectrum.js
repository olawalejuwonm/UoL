function Spectrum() {
  this.name = "spectrum";

  this.draw = function () {
    push();
    var spectrum = fourier.analyze();
    noStroke();

    fill(0, 255, 0);
    for (var i = 0; i < spectrum.length; i++) {
      var cs = spectrum[i];
      var lowCol = map(cs, 0, 255, 255, 0);
      if (cs < 127) {
        fill(cs, lowCol, 0);
      } else if (cs === 127) {
        fill(cs, 127, 0);
      } else if (cs > 127) {
        fill(cs, 0, 0);
      }
      var x = map(i, 0, spectrum.length, 0, width);
      // var h = -height + map(spectrum[i], 0, 255, height, 0);
      var h = -height + map(spectrum[i], 0, 255, height, 0);
      // rect(x, height, width / spectrum.length, h );
      // console.log(width/spectrum.length, h)
      var w = map(spectrum[i], 0, 255, 0, width);
      rect(0, i, w, 1);
    }

    pop();
  };
}
