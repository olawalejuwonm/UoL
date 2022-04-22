/*

Officer: 6128338
CaseNum: 702-0-16344034-6128338

Case 702 - The case of Vanishing Vannevar
Stage 1 - Mobilise

“Calling all units: the notorious criminal and speedster known as Vanishing Vannevar is on the run.
All cars to mobilise.” Word has it that you’re pretty nifty behind the wheel. I want you in on
this action kid. Get your car on the road by completing the </DRIVE_NAME/> function below.

There are many possible ways of completing this task,
but you should ONLY use the following commands and techniques:

	- increment variables
	- random
	- constrain
	- calling functions

HINT: make sure you take a look at the initialisation of sleuthCarObject to understand it's properties.

*/

///////////////////////// HELPER FUNCTIONS /////////////////////

function move_car()
{
	/*
	This function should do the following: 
	 - increment sleuthCarObject's kmsAmount property by its gasAmt property 
	 - add a random amount between -0.06 and 0.06 to sleuthCarObject's engineRumbleAmount property
	 - use the constrain function to constrain sleuthCarObject's engineRumbleAmount property to values between 0.05 and 0.75
	 - call the cycle_carEngine function passing sleuthCarObject as an argument
	*/
	sleuthCarObject.kmsAmount += sleuthCarObject.gasAmt;

	sleuthCarObject.engineRumbleAmount += random(-0.06, 0.06);
	sleuthCarObject.engineRumbleAmount = constrain(sleuthCarObject.engineRumbleAmount, 0.05, 0.75);
	cycle_carEngine(sleuthCarObject);
}


//////////////DO NOT CHANGE CODE BELOW THIS LINE//////////////////

var sleuthCarObject;

var roadWidth = 400;
var roadLeftEdge = 200;
var carImages = {};


function preload()
{
	carImages.detective = loadImage("cars/detective.png");
}

function setup()
{
	createCanvas(800,800);

	sleuthCarObject = 
	{
		coordinateX: roadLeftEdge + roadWidth/4,
		coordinateY: 300,
		kmsAmount: 0,
		gasAmt: 3,
		engineRumbleAmount: 0,
		carClassification: 'detective',
		licencePlate: '5L3UTH',
		exhaust: []
	}


}



function draw()
{
	background(0);


	move_car();


	drawRoad();
	drawCars();
}

/////////////////////////DRAWING FUNCTIONS////////////////////////

function drawRoad()
{
	stroke(100);
	fill(50);
	rect(roadLeftEdge,0,roadWidth,800);
	stroke(255);

	for(var i = -1; i < 20; i++)
	{
		line(
		roadLeftEdge + roadWidth/2 , i * 100 + (sleuthCarObject.kmsAmount%100),
		roadLeftEdge + roadWidth/2 , i * 100 + 70 + (sleuthCarObject.kmsAmount%100)
		);
	}
}

function drawCars()
{
	//draw the detective car

	image
	drawExhaust(sleuthCarObject);
	image
	(
		carImages["detective"],
		sleuthCarObject.coordinateX - carImages["detective"].width/2 + random(-sleuthCarObject.engineRumbleAmount, sleuthCarObject.engineRumbleAmount),
		sleuthCarObject.coordinateY + random(-sleuthCarObject.engineRumbleAmount, sleuthCarObject.engineRumbleAmount)
	);

}

function cycle_carEngine(car)
{

	car.exhaust.push({size: 2, x: car.coordinateX, y: car.coordinateY + carImages[car.carClassification].height});

	for(var i = car.exhaust.length -1; i >= 0 ; i--)
	{

		car.exhaust[i].y  += max(0.75, car.gasAmt/3);
		car.exhaust[i].x += random(-1,1);
		car.exhaust[i].size += 0.5;

		if(car.exhaust[i].y  > height)
		{
			car.exhaust.splice(i,1);
		}
	}
}


function drawExhaust(car)
{
		noStroke();
		for(var i = 0; i < car.exhaust.length; i++)
		{
				var alpha = map(car.exhaust[i].size, 0, 40, 50,0);
				fill(125,alpha);
				ellipse(car.exhaust[i].x + 20, car.exhaust[i].y , car.exhaust[i].size);

		}
}
