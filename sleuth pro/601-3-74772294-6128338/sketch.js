/*
Officer: 6128338
CaseNum: 601-3-74772294-6128338

Case 601 - Narrowing in - stage 4

Casey Fry is on a killing spree and we still haven’t caught her.
We need a more sophisticated approach.

In the setup function, use a for loop to traverse the sightings, marking all of the locations on the map
where she was last seen. Do this by drawing small, Fuchsia stroke rectangles centered over each location.

In addition, we've assembled a list of recent thefts in the area. Using another for loop to traverse the
recent crime records, you should mark those locations on the map. Do this by drawing small, SaddleBrown fill ellipses at each location.

This time we will catch Fry by comparing both distance from the crimes and dates of sightings.
If she was within less than 44 pixels of any of the crimes within no more than 0 days of their occurrence then the details
should be pushed to the list of possible matches with the following format.

{ crime:{x: 0, y:0, victimName: "John Doe"}, suspect:{x: 0, y:0} }

Note that the possible matches are already being drawn.
Your job is to fill the array with the correct data.

Use X11 colours. You can find a reference table at https://en.wikipedia.org/wiki/Web_colors.

For this mission you will need ONLY the following:

- for loop
- if()
- dist()
- abs()
- stroke
- rect() NB. Draw each rectangle with the point at its center.

- fill
- ellipse()


*/

var countyMap;

var possibleMatches = [];

//Sightings of Casey Fry.

var Killer_Sightings = [
  { LocX: 518, LocY: 471, recordedDay: 12 },
  { LocX: 486, LocY: 508, recordedDay: 12 },
  { LocX: 475, LocY: 566, recordedDay: 13 },
  { LocX: 376, LocY: 554, recordedDay: 13 },
  { LocX: 316, LocY: 559, recordedDay: 13 },
  { LocX: 265, LocY: 614, recordedDay: 14 },
  { LocX: 253, LocY: 609, recordedDay: 14 },
  { LocX: 240, LocY: 604, recordedDay: 14 },
  { LocX: 220, LocY: 597, recordedDay: 15 },
  { LocX: 178, LocY: 600, recordedDay: 15 },
  { LocX: 199, LocY: 604, recordedDay: 17 },
  { LocX: 146, LocY: 582, recordedDay: 18 },
  { LocX: 115, LocY: 551, recordedDay: 20 },
  { LocX: 67, LocY: 495, recordedDay: 21 },
  { LocX: 39, LocY: 493, recordedDay: 22 },
  { LocX: 68, LocY: 461, recordedDay: 24 }
];


//Recent crime records.

var Crimescene_Logbook = {
  Pt_X: [438, 408, 408, 642, 623, 95, 75, 269, 389, 484, 496, 546, 538, 702, 817],
  Pt_Y: [420, 451, 377, 289, 279, 488, 522, 597, 554, 549, 484, 463, 359, 412, 474],
  day: [11, 11, 13, 16, 16, 17, 18, 26, 28, 2, 9, 14, 12, 17, 18],
  Victim_: ['PIERRE DORCEY', 'BRAD SILVEIRA', 'LARRAINE PEGORD', 'RANDEE CROME', 'JESSIA PORTOS', 'NELSON TINTLE', 'MALINDA GOODBURY', 'BRIDGET BROADVIEW', 'LINETTE MOHWAWK', 'LIANNE COURTWOOD', 'DEEDEE PHINNEY', 'LESLEY MONKSFORD', 'TU DAVISWOOD', 'JACQUELINE DURANTS', 'KITTY THAXTER'],
};

function preload() {
  countyMap = loadImage("map.png")
}

function setup() {
  createCanvas(countyMap.width, countyMap.height);

  image(countyMap, 0, 0);

  //add your code below here
  noFill();
  stroke(255, 0, 255);
  for (var i = 0; i < Killer_Sightings.length; i++) {
    rect(Killer_Sightings[i].LocX, Killer_Sightings[i].LocY , 5, 5);

  }

  noStroke();
  fill(139, 69, 19);
  for (var i = 0; i < Crimescene_Logbook.Pt_X.length; i++) {
    ellipse(Crimescene_Logbook.Pt_X[i], Crimescene_Logbook.Pt_Y[i], 5);
    for (var k = i + 1; k < Crimescene_Logbook.Pt_X.length; k++) {
      if (dist(Crimescene_Logbook.Pt_X[i], Crimescene_Logbook.Pt_Y[i], Crimescene_Logbook.Pt_X[k], Crimescene_Logbook.Pt_Y[k]) < 44 && (Crimescene_Logbook.day[i] - Killer_Sightings[k].recordedDay   ) <= 0)  {
        possibleMatches.push({ crime: { x: Crimescene_Logbook.Pt_X[i], y: Crimescene_Logbook.Pt_Y[i], victimName: Crimescene_Logbook.Victim_[i] }, suspect: { x: Killer_Sightings[i].LocX, y: Killer_Sightings[i].LocY } }
        )
      }

    }

  }



  // code to draw the matches ( if any)
  for (let i = 0; i < possibleMatches.length; i++) {
    stroke(127);
    strokeWeight(3);
    line(possibleMatches[i].crime.x, possibleMatches[i].crime.y, possibleMatches[i].suspect.x, possibleMatches[i].suspect.y);

    noStroke();
    fill(127);
    text(possibleMatches[i].crime.victimName, possibleMatches[i].crime.x + 15, possibleMatches[i].crime.y + 15);
  }
}

//We are not using the draw function this time
