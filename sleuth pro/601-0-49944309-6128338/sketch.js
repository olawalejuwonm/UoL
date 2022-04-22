/*
Officer: 6128338
CaseNum: 601-0-49944309-6128338

Case 601 - Escaped - stage 1

We've got an emergency here. The notorious killer Casey Fry has escaped from the Federal Correctional Institution.
She is on the loose and we have been asked to track her movements.

In the setup function, use a for loop to traverse the sightings, marking all of the locations on the map
where she was last seen. Do this by drawing Cyan stroke vertexes at each location.

Use X11 colours. You can find a reference table at https://en.wikipedia.org/wiki/Web_colors.

For this mission you will need ONLY the following:

- for loop
- stroke()
- beginShape(), endShape(), vertex()


*/

var countyMap;

//Sightings of Casey Fry.

var killer_record = [ 
  { positionX : 127, positionY : 175},
  { positionX : 156, positionY : 158},
  { positionX : 179, positionY : 192},
  { positionX : 200, positionY : 154},
  { positionX : 220, positionY : 133},
  { positionX : 228, positionY : 168},
  { positionX : 249, positionY : 149},
  { positionX : 269, positionY : 139},
  { positionX : 292, positionY : 168},
  { positionX : 321, positionY : 133},
  { positionX : 354, positionY : 159},
  { positionX : 390, positionY : 144},
  { positionX : 396, positionY : 225},
  { positionX : 429, positionY : 228},
  { positionX : 456, positionY : 230},
  { positionX : 467, positionY : 277},
  { positionX : 483, positionY : 267},
  { positionX : 531, positionY : 291},
  { positionX : 547, positionY : 278},
  { positionX : 571, positionY : 274},
  { positionX : 589, positionY : 318},
  { positionX : 637, positionY : 280} 
];


function preload()
{
	countyMap = loadImage("map.png")
}

function setup()
{
  createCanvas(countyMap.width, countyMap.height);

	image(countyMap, 0,0);

  //add your code below here
  stroke(0, 255, 255);
  noFill(); 
  beginShape();
  for (var i = 0; i < killer_record.length; i++) {
    vertex(killer_record[i].positionX, killer_record[i].positionY);

  }
  endShape();


}

//We are not using the draw function this time
