/*
Officer: 6128338
CaseNum: 601-2-72428709-6128338

Case 601 - Murdering Again - stage 3

Now murders are beginning to occur - we're pretty sure that this is the work of Fry.
If we can place her near any of the recent crime scenes in the area we should be able narrow down her location.

In the setup function, use a for loop to traverse the sightings, marking all of the locations on the map
where she was last seen. Do this by drawing small, OrangeRed fill triangles centered over each location.

In addition, we've assembled a list of recent thefts in the area. Using another for loop to traverse the
recent crime records, you should mark those locations on the map. Do this by drawing small, YellowGreen stroke ellipses at each location.

Use X11 colours. You can find a reference table at https://en.wikipedia.org/wiki/Web_colors.

Let's try to catch Fry by looking patterns between sightings and crimes. If she was within less than 77 pixels of any of the crimes then the details
should be pushed to possible matches with the following format.

{ suspect_x: 0, suspect_y: 0 ,crime_x: 0, crime_y: 0, victimName: "John_Doe" }

Note that the possible matches are already being drawn.
Your job is simply to fill the array with the correct data.

For this mission you will need ONLY the following:

- for loop
- dist()
- if()
- fill
- triangle() NB. Draw each triangle with the point roughly at its center.

- stroke
- ellipse()


*/

var countyMap;

var possibleMatches = [];

//Sightings of Casey Fry.

var AbsconderLogbook = [
  { LocationX: 639, LocationY: 288 },
  { LocationX: 681, LocationY: 286 },
  { LocationX: 712, LocationY: 293 },
  { LocationX: 756, LocationY: 310 },
  { LocationX: 715, LocationY: 368 },
  { LocationX: 701, LocationY: 425 },
  { LocationX: 753, LocationY: 436 },
  { LocationX: 815, LocationY: 468 },
  { LocationX: 795, LocationY: 506 },
  { LocationX: 788, LocationY: 497 },
  { LocationX: 781, LocationY: 486 },
  { LocationX: 768, LocationY: 489 },
  { LocationX: 750, LocationY: 500 },
  { LocationX: 732, LocationY: 506 },
  { LocationX: 714, LocationY: 514 },
  { LocationX: 695, LocationY: 531 },
  { LocationX: 693, LocationY: 552 },
  { LocationX: 654, LocationY: 523 },
  { LocationX: 624, LocationY: 500 },
  { LocationX: 594, LocationY: 484 },
  { LocationX: 555, LocationY: 474 }
];


//Recent crime records.

var KillingData = [
  { coord_x: 409, coord_y: 446, victim_details: 'LIANNE COURTWOOD' },
  { coord_x: 443, coord_y: 419, victim_details: 'DARBY MYRLE' },
  { coord_x: 465, coord_y: 548, victim_details: 'SUMMER CASIMERE' },
  { coord_x: 709, coord_y: 552, victim_details: 'PIERRE DORCEY' },
  { coord_x: 695, coord_y: 421, victim_details: 'ERMELINDA OORIN' },
  { coord_x: 652, coord_y: 268, victim_details: 'NELSON TINTLE' },
  { coord_x: 641, coord_y: 306, victim_details: 'KITTY THAXTER' },
  { coord_x: 119, coord_y: 344, victim_details: 'JACQUELINE DURANTS' },
  { coord_x: 114, coord_y: 359, victim_details: 'GAYLA WILLMAR' },
  { coord_x: 90, coord_y: 490, victim_details: 'DEEDEE PHINNEY' },
  { coord_x: 76, coord_y: 516, victim_details: 'JAUNITA JOYER' },
  { coord_x: 615, coord_y: 741, victim_details: 'NICOLE ASHELY' },
  { coord_x: 349, coord_y: 796, victim_details: 'JESUS FORSLIN' },
  { coord_x: 456, coord_y: 770, victim_details: 'TU DAVISWOOD' }
];


function preload() {
  countyMap = loadImage("map.png")
}

function setup() {
  createCanvas(countyMap.width, countyMap.height);

  image(countyMap, 0, 0);

  //add your code below here
  noStroke();
  fill(255, 69, 0);
  for (var i = 0; i < AbsconderLogbook.length; i++) {
    triangle(AbsconderLogbook[i].LocationX - 5, AbsconderLogbook[i].LocationY + 5, AbsconderLogbook[i].LocationX, AbsconderLogbook[i].LocationY - 5, AbsconderLogbook[i].LocationX + 5, AbsconderLogbook[i].LocationY + 5);

  }

  noFill();
  stroke(154, 205, 50);
  for (var i = 0; i < KillingData.length; i++) {
    ellipse(KillingData[i].coord_x, KillingData[i].coord_y, 5);
    if (dist(AbsconderLogbook[i].LocationX, AbsconderLogbook[i].LocationY, KillingData[i].coord_x,KillingData[i].coord_y ) < 77) {
      possibleMatches.push({ suspect_x: AbsconderLogbook[i].LocationX, suspect_y: AbsconderLogbook[i].LocationY ,crime_x: KillingData[i].coord_x, crime_y: KillingData[i].coord_y, victimName: KillingData[i].victim_details })
    }
  
  }

  




  // code to draw the matches ( if any)
  for (let i = 0; i < possibleMatches.length; i++) {
    stroke(127);
    strokeWeight(3);
    line(possibleMatches[i].crime_x, possibleMatches[i].crime_y, possibleMatches[i].suspect_x, possibleMatches[i].suspect_y);

    noStroke();
    fill(127);
    text(possibleMatches[i].victimName, possibleMatches[i].crime_x + 15, possibleMatches[i].crime_y + 15);
  }
}

//We are not using the draw function this time
