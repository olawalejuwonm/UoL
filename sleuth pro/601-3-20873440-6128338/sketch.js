/*
Officer: 6128338
CaseNum: 601-3-20873440-6128338

Case 601 - Narrowing in - stage 4

Casey Fry is on a killing spree and we still haven’t caught her.
We need a more sophisticated approach.

In the setup function, use a for loop to traverse the sightings, marking all of the locations on the map
where she was last seen. Do this by drawing small, MediumSlateBlue stroke ellipses at each location.

In addition, we've assembled a list of recent thefts in the area. Using another for loop to traverse the
recent crime records, you should mark those locations on the map. Do this by drawing small, FireBrick stroke triangles centered over each location.

This time we will catch Fry by comparing both distance from the crimes and dates of sightings.
If she was within less than 33 pixels of any of the crimes within no more than 0 days of their occurrence then the details
should be pushed to the list of possible matches with the following format.

{ suspect_x: 0, suspect_y: 0 ,crime_x: 0, crime_y: 0, victimName: "John_Doe" }

Note that the possible matches are already being drawn.
Your job is to fill the array with the correct data.

Use X11 colours. You can find a reference table at https://en.wikipedia.org/wiki/Web_colors.

For this mission you will need ONLY the following:

- for loop
- if()
- dist()
- abs()
- stroke
- ellipse()

- stroke
- triangle() NB. Draw each triangle with the point roughly at its center.


*/

var countyMap;

var possibleMatches = [];

//Sightings of Casey Fry.

var fry_sightings = [ 
  { pointX : 518, pointY : 471, recordDate : 12},
  { pointX : 486, pointY : 508, recordDate : 12},
  { pointX : 475, pointY : 566, recordDate : 13},
  { pointX : 376, pointY : 554, recordDate : 13},
  { pointX : 316, pointY : 559, recordDate : 13},
  { pointX : 265, pointY : 614, recordDate : 14},
  { pointX : 253, pointY : 609, recordDate : 14},
  { pointX : 240, pointY : 604, recordDate : 14},
  { pointX : 220, pointY : 597, recordDate : 15},
  { pointX : 178, pointY : 600, recordDate : 15},
  { pointX : 199, pointY : 604, recordDate : 17},
  { pointX : 146, pointY : 582, recordDate : 18},
  { pointX : 115, pointY : 551, recordDate : 20},
  { pointX : 67, pointY : 495, recordDate : 21},
  { pointX : 39, pointY : 493, recordDate : 22},
  { pointX : 68, pointY : 461, recordDate : 24} 
];


//Recent crime records.

var crime_log_position_x = [438, 408, 408, 642, 623, 95, 75, 269, 389, 484, 496, 546, 538, 702, 817];
var crime_log_position_y = [420, 451, 377, 289, 279, 488, 522, 597, 554, 549, 484, 463, 359, 412, 474];
var crime_log_date = [11, 11, 13, 16, 16, 17, 18, 26, 28, 2, 9, 14, 12, 17, 18];
var crime_log_murdered_details = ['JESUS FORSLIN', 'TAMICA MAUBERT', 'GAYLA WILLMAR', 'SUMMER CASIMERE', 'LAKESHA SYMMES', 'BRAD SILVEIRA', 'JULIANA ADVERSANE', 'LARRAINE PEGORD', 'NICOLE ASHELY', 'JAUNITA JOYER', 'JACQUELINE DURANTS', 'TU DAVISWOOD', 'JENIFFER DEAUVILLE', 'DEEDEE PHINNEY', 'HANG NIEMELA'];


function preload()
{
	countyMap = loadImage("map.png")
}

function setup()
{
  createCanvas(countyMap.width, countyMap.height);

	image(countyMap, 0,0);

	//add your code below here
  noFill();
  stroke(123,104,238);
  for (var i = 0; i < fry_sightings.length; i++) {
    ellipse(fry_sightings[i].pointX, fry_sightings[i].pointY , 5);

  }
  

  stroke(178,34,34);
  for (var i = 0; i < crime_log_position_x.length; i++) {
    triangle(crime_log_position_x[i] -5 , crime_log_position_y[i] + 5 , crime_log_position_x[i], crime_log_position_y[i] - 5, crime_log_position_x[i] + 5, crime_log_position_y[i] + 5)
  }
  for (var i = 0; i < fry_sightings.length; i++) {
    
    for (var k = 0; k < crime_log_position_x.length; k++) {
      if (dist(fry_sightings[k].pointX, fry_sightings[i].pointY, crime_log_position_x[k], crime_log_position_y[k])
      < 33 && abs(fry_sightings[i].recordDate - crime_log_date[k]) <= 0) {
        possibleMatches.push({ suspect_x: fry_sightings[i].pointX, suspect_y: fry_sightings[i].pointY ,crime_x: crime_log_position_x[k], crime_y: crime_log_position_y[k], victimName: crime_log_murdered_details[k] }
        )
      }
    }
  }



	// code to draw the matches ( if any)
	for(let i = 0 ; i < possibleMatches.length ; i++)
	{
		stroke(127);
		strokeWeight(3);
		line(possibleMatches[i].crime_x, possibleMatches[i].crime_y, possibleMatches[i].suspect_x, possibleMatches[i].suspect_y);

		noStroke();
		fill(127);
		text(possibleMatches[i].victimName, possibleMatches[i].crime_x + 15, possibleMatches[i].crime_y + 15);
	}
}

//We are not using the draw function this time
