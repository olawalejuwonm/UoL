/*
801
Stage 3: La Traviata

Officer: 6128338
CaseNum: 801-2-88515056-6128338

La Traviata is rolling into town and we’ll be there to nab a shot for our files of the Order of Ritchie. The informant is starting to feel the heat but was able to scribble down which seat they are sitting in ordered by row. You’ll have to untangle the array.

Each element is a seat on one row of the stalls going from row 1 to 10. Ritchie’s all have retro glasses so that might be helpful in your task. If we can identify this lot maybe they'll lead us to the Cooley gang.

You’ll have to use a single for loop to pick them out and set discovered property of the house to true.
Solve the case using only:
For (not nested)
house[ ][ ]

*/

var crowdImg;
var spotlight;

var house = [[{"x":50,"y":50,"discovered":false},{"x":150,"y":50,"discovered":false},{"x":250,"y":50,"discovered":false},{"x":350,"y":50,"discovered":false},{"x":450,"y":50,"discovered":false},{"x":550,"y":50,"discovered":false},{"x":650,"y":50,"discovered":false},{"x":750,"y":50,"discovered":false},{"x":850,"y":50,"discovered":false},{"x":950,"y":50,"discovered":false}],[{"x":50,"y":130,"discovered":false},{"x":150,"y":130,"discovered":false},{"x":250,"y":130,"discovered":false},{"x":350,"y":130,"discovered":false},{"x":450,"y":130,"discovered":false},{"x":550,"y":130,"discovered":false},{"x":650,"y":130,"discovered":false},{"x":750,"y":130,"discovered":false},{"x":850,"y":130,"discovered":false},{"x":950,"y":130,"discovered":false}],[{"x":50,"y":210,"discovered":false},{"x":150,"y":210,"discovered":false},{"x":250,"y":210,"discovered":false},{"x":350,"y":210,"discovered":false},{"x":450,"y":210,"discovered":false},{"x":550,"y":210,"discovered":false},{"x":650,"y":210,"discovered":false},{"x":750,"y":210,"discovered":false},{"x":850,"y":210,"discovered":false},{"x":950,"y":210,"discovered":false}],[{"x":50,"y":290,"discovered":false},{"x":150,"y":290,"discovered":false},{"x":250,"y":290,"discovered":false},{"x":350,"y":290,"discovered":false},{"x":450,"y":290,"discovered":false},{"x":550,"y":290,"discovered":false},{"x":650,"y":290,"discovered":false},{"x":750,"y":290,"discovered":false},{"x":850,"y":290,"discovered":false},{"x":950,"y":290,"discovered":false}],[{"x":50,"y":370,"discovered":false},{"x":150,"y":370,"discovered":false},{"x":250,"y":370,"discovered":false},{"x":350,"y":370,"discovered":false},{"x":450,"y":370,"discovered":false},{"x":550,"y":370,"discovered":false},{"x":650,"y":370,"discovered":false},{"x":750,"y":370,"discovered":false},{"x":850,"y":370,"discovered":false},{"x":950,"y":370,"discovered":false}],[{"x":50,"y":450,"discovered":false},{"x":150,"y":450,"discovered":false},{"x":250,"y":450,"discovered":false},{"x":350,"y":450,"discovered":false},{"x":450,"y":450,"discovered":false},{"x":550,"y":450,"discovered":false},{"x":650,"y":450,"discovered":false},{"x":750,"y":450,"discovered":false},{"x":850,"y":450,"discovered":false},{"x":950,"y":450,"discovered":false}],[{"x":50,"y":530,"discovered":false},{"x":150,"y":530,"discovered":false},{"x":250,"y":530,"discovered":false},{"x":350,"y":530,"discovered":false},{"x":450,"y":530,"discovered":false},{"x":550,"y":530,"discovered":false},{"x":650,"y":530,"discovered":false},{"x":750,"y":530,"discovered":false},{"x":850,"y":530,"discovered":false},{"x":950,"y":530,"discovered":false}],[{"x":50,"y":610,"discovered":false},{"x":150,"y":610,"discovered":false},{"x":250,"y":610,"discovered":false},{"x":350,"y":610,"discovered":false},{"x":450,"y":610,"discovered":false},{"x":550,"y":610,"discovered":false},{"x":650,"y":610,"discovered":false},{"x":750,"y":610,"discovered":false},{"x":850,"y":610,"discovered":false},{"x":950,"y":610,"discovered":false}],[{"x":50,"y":690,"discovered":false},{"x":150,"y":690,"discovered":false},{"x":250,"y":690,"discovered":false},{"x":350,"y":690,"discovered":false},{"x":450,"y":690,"discovered":false},{"x":550,"y":690,"discovered":false},{"x":650,"y":690,"discovered":false},{"x":750,"y":690,"discovered":false},{"x":850,"y":690,"discovered":false},{"x":950,"y":690,"discovered":false}],[{"x":50,"y":770,"discovered":false},{"x":150,"y":770,"discovered":false},{"x":250,"y":770,"discovered":false},{"x":350,"y":770,"discovered":false},{"x":450,"y":770,"discovered":false},{"x":550,"y":770,"discovered":false},{"x":650,"y":770,"discovered":false},{"x":750,"y":770,"discovered":false},{"x":850,"y":770,"discovered":false},{"x":950,"y":770,"discovered":false}]];
var perps = [6,3,7,6,9,9,3,1,0,3];


function setup()
{
	createCanvas(1100, 1100);

	crowdImg = loadImage("crowd.png");
	spotlight = loadImage("spotlight.png");
}

function draw()
{
	image(crowdImg, 0, 0);
	////////////YOUR CODE GOES HERE////////////////////////
	for (var i = 0; i < house.length; i++) {
		house[i][perps[i]].discovered = true;
	}



	///////////DON'T CHANGE ANY CODE BELOW HERE////////////
	blendMode(BLEND);
	background(80);
	highlight();
	blendMode(DARKEST);
	image(crowdImg, 0, 0);
}

function highlight()
{
	fill(255, 0, 0, 100);

	for (var i = 0; i < house.length; i++)
	{
		for (var j = 0; j < house[i].length; j++)
		{
			if (house[i][j].discovered)
			{
				image(spotlight, house[i][j].x, house[i][j].y, 100 , 100 );
			}
		}
	}
}
