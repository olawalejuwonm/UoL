/*

Officer: 6128338
CaseNum: 702-1-21671795-6128338

Case 702 - The case of Vanishing Vannevar
Stage 2 - Downtown traffic

“All units: Vannevar is heading into the downtown area. Heavy traffic ahead. Drive safely.”
Complete the helper functions below to drive the car and avoid other vehicles. Keep on it kid.

There are many possible ways of completing this task,
but you should ONLY use the following commands and techniques:

	- Incrementing and assiging variables
	- Maths function such as random and constrain
	- Conditional statements
	- Traversing arrays with for loops
	- calling functions and returning values

HINT: make sure you take a look at the initialisation of DetectiveVehicle and the cars in
vehicleData to understand their properties.

*/

///////////////////////// HELPER FUNCTIONS /////////////////////

function Move_Car() {
	/*
	This function should do the following: 
	 - increment DetectiveVehicle's MilesAmount property by its AccelValue property 
	 - add a random amount between -0.1 and 0.1 to DetectiveVehicle's RumbleAmount property
	 - use the constrain function to constrain DetectiveVehicle's RumbleAmount property to values between 0.02 and 0.83
	 - call the Turnover_Motor function passing DetectiveVehicle as an argument
	*/

	DetectiveVehicle.MilesAmount += DetectiveVehicle.AccelValue;
	DetectiveVehicle.RumbleAmount += random(-0.1, 0.1);
	DetectiveVehicle.RumbleAmount = constrain(DetectiveVehicle.RumbleAmount, 0.02, 0.83);
	Turnover_Motor(DetectiveVehicle);
}


function Swap_Lanes(targetCar) {
	/*
	This function should do the following: 
	 - move targetCar from one lane to the other.
	 - do the move in a single step without any extra animation.
	 - use LaneCoordA and LaneCoordB to effect the change.
	 - finally you should return targetCar at the end of the function.
	 hint: You will need to modify the XCoordinate property of targetCar.
	*/
	// console.log("called")
	if (targetCar.XCoordinate == LaneCoordA) {
		targetCar.XCoordinate = LaneCoordB;

	}

	else  {
		targetCar.XCoordinate = LaneCoordA;
	}

	return targetCar;

}


function SearchVehicle_IsInfront(targetVehicle) {
	/*
	This function should do the following: 
	 - determine if targetVehicle is in the same lane and less than 200px behind any of the cars in vehicleData.
	 - do this by traversing vehicleData and comparing each car's MilesAmount property to that of targetVehicle.
	 - if you find a car that matches these requirements then return the car object. Otherwise return false.
	*/


	for (var i = 0; i < vehicleData.length; i++) {
		if (vehicleData[i].XCoordinate == targetVehicle.XCoordinate) {
			if ((vehicleData[i].MilesAmount - targetVehicle.MilesAmount) <= 200 && vehicleData[i].MilesAmount > targetVehicle.MilesAmount) {
				return vehicleData[i];
			}
			// for (var k = 0;k < vehicleData.length; k++) {
			// 	if ((vehicleData[k].MilesAmount - targetVehicle.MilesAmount) <= 200 && vehicleData[k].XCoordinate == targetVehicle.XCoordinate) {
			// 		return vehicleData[i];
			// 	}
			// }
			// console.log(vehicleData[i], targetVehicle)
		}
	}

	return false;

}


//////////////DO NOT CHANGE CODE BELOW THIS LINE//////////////////

var DetectiveVehicle;

var roadWidth;
var roadLeftEdge;
var LaneCoordA;
var LaneCoordB;
var carImages = {};

var vehicleData = [
	{ XCoordinate: 500, YCoordinate: 0, MilesAmount: -200, VehicleType: 'greenCar', NumberPlate: 'QEV0T4', AccelValue: 2, exhaust: [] }, { XCoordinate: 500, YCoordinate: 0, MilesAmount: 200, VehicleType: 'greenCar', NumberPlate: 'AOZESD', AccelValue: 2, exhaust: [] }, { XCoordinate: 300, YCoordinate: 0, MilesAmount: 600, VehicleType: 'whiteCar', NumberPlate: 'DSMWUU', AccelValue: 2, exhaust: [] }, { XCoordinate: 300, YCoordinate: 0, MilesAmount: 1000, VehicleType: 'blueCar', NumberPlate: 'GAY9MQ', AccelValue: 2, exhaust: [] }, { XCoordinate: 500, YCoordinate: 0, MilesAmount: 1400, VehicleType: 'greenCar', NumberPlate: '2PO8K7', AccelValue: 2, exhaust: [] }, { XCoordinate: 500, YCoordinate: 0, MilesAmount: 1800, VehicleType: 'redCar', NumberPlate: '4BJX4T', AccelValue: 2, exhaust: [] }, { XCoordinate: 300, YCoordinate: 0, MilesAmount: 2200, VehicleType: 'greenCar', NumberPlate: '1063QZ', AccelValue: 2, exhaust: [] }, { XCoordinate: 500, YCoordinate: 0, MilesAmount: 2600, VehicleType: 'redCar', NumberPlate: '4SLNM6', AccelValue: 2, exhaust: [] }, { XCoordinate: 500, YCoordinate: 0, MilesAmount: 3000, VehicleType: 'redCar', NumberPlate: 'Z10XD4', AccelValue: 2, exhaust: [] }, { XCoordinate: 300, YCoordinate: 0, MilesAmount: 3400, VehicleType: 'blueCar', NumberPlate: 'CBXQZ9', AccelValue: 2, exhaust: [] }, { XCoordinate: 500, YCoordinate: 0, MilesAmount: 3800, VehicleType: 'whiteCar', NumberPlate: '9P116J', AccelValue: 2, exhaust: [] }, { XCoordinate: 300, YCoordinate: 0, MilesAmount: 4200, VehicleType: 'redCar', NumberPlate: 'C61K2V', AccelValue: 2, exhaust: [] }, { XCoordinate: 300, YCoordinate: 0, MilesAmount: 4600, VehicleType: 'greenCar', NumberPlate: 'LAAO1R', AccelValue: 2, exhaust: [] }, { XCoordinate: 300, YCoordinate: 0, MilesAmount: 5000, VehicleType: 'redCar', NumberPlate: 'G4WM40', AccelValue: 2, exhaust: [] }, { XCoordinate: 300, YCoordinate: 0, MilesAmount: 5400, VehicleType: 'blueCar', NumberPlate: '8G4AHB', AccelValue: 2, exhaust: [] }, { XCoordinate: 300, YCoordinate: 0, MilesAmount: 5800, VehicleType: 'redCar', NumberPlate: 'P291GL', AccelValue: 2, exhaust: [] }, { XCoordinate: 500, YCoordinate: 0, MilesAmount: 6200, VehicleType: 'blueCar', NumberPlate: 'CHIRNI', AccelValue: 2, exhaust: [] }, { XCoordinate: 300, YCoordinate: 0, MilesAmount: 6600, VehicleType: 'whiteCar', NumberPlate: 'GO3KFZ', AccelValue: 2, exhaust: [] }, { XCoordinate: 500, YCoordinate: 0, MilesAmount: 7000, VehicleType: 'whiteCar', NumberPlate: '3VPHFY', AccelValue: 2, exhaust: [] }, { XCoordinate: 500, YCoordinate: 0, MilesAmount: 7400, VehicleType: 'greenCar', NumberPlate: '6XS550', AccelValue: 2, exhaust: [] }
];



function preload() {
	var carTypes = [
		"detective",
		"redCar",
		"greenCar",
		"blueCar",
		"whiteCar",
	];

	for (var i = 0; i < carTypes.length; i++) {
		carImages[carTypes[i]] = loadImage("cars/" + carTypes[i] + ".png");
	}
}

function setup() {
	createCanvas(800, 800);

	roadWidth = 400;
	roadLeftEdge = 200;
	LaneCoordA = 300;
	LaneCoordB = 500;

	DetectiveVehicle =
	{
		XCoordinate: roadLeftEdge + roadWidth / 4,
		YCoordinate: 550,
		MilesAmount: 0,
		AccelValue: 3,
		RumbleAmount: 0,
		VehicleType: 'detective',
		NumberPlate: '5L3UTH',
		exhaust: []
	}


}



function draw() {
	background(0);



	drawRoad();
	drawCars();

	////////////////////// HANDLE DETECTIVE /////////////////////////


	Move_Car();
	var b2b = SearchVehicle_IsInfront(DetectiveVehicle);
	if (b2b) Swap_Lanes(DetectiveVehicle);


	//////////////////////HANDLE THE OTHER CARS//////////////////////

	for (var i = 0; i < vehicleData.length; i++) {
		vehicleData[i].MilesAmount += vehicleData[i].AccelValue;
		vehicleData[i].YCoordinate = DetectiveVehicle.YCoordinate - vehicleData[i].MilesAmount + DetectiveVehicle.MilesAmount;
	}

}

/////////////////////////DRAWING FUNCTIONS////////////////////////

function drawRoad() {
	stroke(100);
	fill(50);
	rect(roadLeftEdge, 0, roadWidth, 800);
	stroke(255);

	for (var i = -1; i < 20; i++) {
		line(
			roadLeftEdge + roadWidth / 2, i * 100 + (DetectiveVehicle.MilesAmount % 100),
			roadLeftEdge + roadWidth / 2, i * 100 + 70 + (DetectiveVehicle.MilesAmount % 100)
		);
	}
}

function drawCars() {
	//draw the detective car

	image
	drawExhaust(DetectiveVehicle);
	image
		(
			carImages["detective"],
			DetectiveVehicle.XCoordinate - carImages["detective"].width / 2 + random(-DetectiveVehicle.RumbleAmount, DetectiveVehicle.RumbleAmount),
			DetectiveVehicle.YCoordinate + random(-DetectiveVehicle.RumbleAmount, DetectiveVehicle.RumbleAmount)
		);

	//draw all other cars

	for (var i = 0; i < vehicleData.length; i++) {
		if (vehicleData[i].YCoordinate < height && vehicleData[i].YCoordinate > -height / 2) {
			image(
				carImages[vehicleData[i].VehicleType],
				vehicleData[i].XCoordinate - carImages[vehicleData[i].VehicleType].width / 2,
				vehicleData[i].YCoordinate
			);
			Turnover_Motor(vehicleData[i]);

			drawExhaust(vehicleData[i]);
		}
	}

}

function Turnover_Motor(car) {

	car.exhaust.push({ size: 2, x: car.XCoordinate, y: car.YCoordinate + carImages[car.VehicleType].height });

	for (var i = car.exhaust.length - 1; i >= 0; i--) {

		car.exhaust[i].y += max(0.75, car.AccelValue / 3);
		if (car.VehicleType != "detective") car.exhaust[i].y += (DetectiveVehicle.AccelValue - car.AccelValue);
		car.exhaust[i].x += random(-1, 1);
		car.exhaust[i].size += 0.5;

		if (car.exhaust[i].y > height || car.exhaust[i].y < 0) {
			car.exhaust.splice(i, 1);
		}
	}
}


function drawExhaust(car) {
	noStroke();
	for (var i = 0; i < car.exhaust.length; i++) {
		var alpha = map(car.exhaust[i].size, 0, 40, 50, 0);
		fill(125, alpha);
		ellipse(car.exhaust[i].x + 20, car.exhaust[i].y, car.exhaust[i].size);

	}
}
