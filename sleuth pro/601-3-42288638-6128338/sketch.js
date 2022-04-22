/*
Officer: 6128338
CaseNum: 601-3-42288638-6128338

Case 601 - Narrowing in - stage 4

Casey Fry is on a killing spree and we still haven’t caught her.
We need a more sophisticated approach.

In the setup function, use a for loop to traverse the sightings, marking all of the locations on the map
where she was last seen. Do this by drawing small, Tomato fill rectangles centered over each location.

In addition, we've assembled a list of recent thefts in the area. Using another for loop to traverse the
recent crime records, you should mark those locations on the map. Do this by drawing small, DarkRed stroke triangles centered over each location.

This time we will catch Fry by comparing both distance from the crimes and dates of sightings.
If she was within less than 93 pixels of any of the crimes within no more than 3 days of their occurrence then the details
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
- fill
- rect() NB. Draw each rectangle with the point at its center.

- stroke
- triangle() NB. Draw each triangle with the point roughly at its center.


*/

var countyMap;

var possibleMatches = [];

//Sightings of Casey Fry.

var caseyFryData = {
	ptX: [518, 486, 475, 376, 316, 265, 253, 240, 220, 178, 199, 146, 115, 67, 39, 68],
	ptY: [471, 508, 566, 554, 559, 614, 609, 604, 597, 600, 604, 582, 551, 495, 493, 461],
	date: [12, 12, 13, 13, 13, 14, 14, 14, 15, 15, 17, 18, 20, 21, 22, 24],
};

//Recent crime records.

var killingLog = {
	pointX: [438, 408, 408, 642, 623, 95, 75, 269, 389, 484, 496, 546, 538, 702, 817],
	pointY: [420, 451, 377, 289, 279, 488, 522, 597, 554, 549, 484, 463, 359, 412, 474],
	recordDate: [11, 11, 13, 16, 16, 17, 18, 26, 28, 2, 9, 14, 12, 17, 18],
	fatalityName: ['JACQUELINE DURANTS', 'DRUSILLA WARMAN', 'MAJORIE JENI', 'RANDEE CROME', 'KITTY THAXTER', 'JAUNITA JOYER', 'DEEDEE PHINNEY', 'TAMICA MAUBERT', 'MALINDA GOODBURY', 'JESSIA PORTOS', 'LAVERNE JACQUELIN', 'BRAD SILVEIRA', 'LAKESHA SYMMES', 'BRIDGET BROADVIEW', 'LARRAINE PEGORD'],
};

function preload()
{
	countyMap = loadImage("map.png")
}

function setup()
{
  createCanvas(countyMap.width, countyMap.height);

	image(countyMap, 0,0);

	//add your code below here
	fill(128,128,0);
	noStroke();
	for(var i = 0; i < caseyFryData.length; i++)
	{
		ellipse(caseyFryData.ptX[i], caseyFryData.ptY[i],10,10);
	}
	fill(255,0,0);
	noStroke();
	for(var j = 0; j <  killingLog.pointX.length; j++)
		{
			triangle(killingLog.pointX[j]-8, killingLog.pointY[j], killingLog.pointX[j]+8,killingLog.pointY[j], killingLog.pointX[j]-8, killingLog.pointY[j]-8)
		}
	for(var i =0; i < caseyFryData.length; i++)
	{
	for(j = 0; j < killingLog.length; j++)
			{
			
				if(abs(caseyFryData[i].day - killingLog[j].date) < 1 && dist(caseyFryData.ptX[i], caseyFryData.ptY[i], killingLog.pointX[j], killingLog.pointY[j]) < 65)
					{
						possibleMatches.push({ suspect_x: caseyFryData.ptX[i], suspect_y:  caseyFryData.ptY[i],crime_x: killingLog.pointX[j], crime_y: killingLog.pointY[j], victimName: killingLog.fatalityName[j]});
					}
			}
	}



	// code to draw the matches ( if any)
	for(let i = 0 ; i < possibleMatches.length ; i++)
	{
		stroke(127);
		strokeWeight(3);
		line(possibleMatches[i].crime.x, possibleMatches[i].crime.y, possibleMatches[i].suspect.x, possibleMatches[i].suspect.y);

		noStroke();
		fill(127);
		text(possibleMatches[i].crime.victimName, possibleMatches[i].crime.x + 15, possibleMatches[i].crime.y + 15);
	}
}

//We are not using the draw function this time
