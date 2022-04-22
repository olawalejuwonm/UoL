/*

Officer: 6128338
CaseNum: 702-2-70042765-6128338

Case 702 - The case of Vanishing Vannevar
Stage 3 - Where's Vannevar

“All units: Vannevar’s car has been sighted. It is a white car with a numberPlate of 1TKBMC. Approach with
caution.” This is your big chance kid. Don’t blow it. Complete the helper functions below to
drive through the traffic and locate Vannevar.

There are many possible ways of completing this task,
but you should ONLY use the following commands and techniques:

	- Incrementing and assiging variables
	- Maths function such as random, min, abs, and constrain
	- Conditional statements
	- Traversing arrays with for loops
	- calling functions and returning values

HINT: make sure you take a look at the initialisation of sleuthCar and the cars in
traffic_list to understand their properties.

*/

///////////////////////// HELPER FUNCTIONS /////////////////////

function driveVehicle() {
	/*
	This function should do the following: 
	 - increment sleuthCar's distanceDriven property by its gasVal property 
	 - add a random amount between -0.04 and 0.04 to sleuthCar's rumbleAmt property
	 - use the constrain function to constrain sleuthCar's rumbleAmt property to values between 0.04 and 1.11
	 - call the driveCarMotor function passing sleuthCar as an argument
	*/

	sleuthCar.distanceDriven += sleuthCar.gasVal;
	sleuthCar.rumbleAmt += random(-0.04, 0.04);
	sleuthCar.rumbleAmt = constrain(sleuthCar.rumbleAmt, 0.04, 1.11);
	driveCarMotor(sleuthCar);
}


function changeLanes(car) {
	/*
	This function should do the following: 
	 - move car from one lane to the other.
	 - do the move in a single step without any extra animation.
	 - use Lane_Coord_a and Lane_Coord_b to effect the change.
	 hint: You will need to modify the coordX property of car.
	*/
	if (car.coordX == Lane_Coord_a) {
		car.coordX = Lane_Coord_b;
	}
	else {
		car.coordX = Lane_Coord_a;
	}
}


function searchIsInfront(car_obj_a, car_obj_b) {
	/*
	This function should do the following: 
	 - determine if car_obj_a is in the same lane and less than 200px behind car_obj_b.
	 - do this by comparing the two cars' distanceDriven properties
	 - if these requirements are met then return car_obj_b. Otherwise return false.
	*/

	if (car_obj_a.coordX == car_obj_b.coordX) {
		if ((car_obj_b.distanceDriven - car_obj_a.distanceDriven <= 200)
			&& car_obj_b.distanceDriven > car_obj_a.distanceDriven) {
			return car_obj_b
		}
	}

	return false;
}


function carIsBySide(targetVehicle_a, targetVehicle_b) {
	/*
	This function should do the following: 
	 - determine if targetVehicle_ais parallel with targetVehicle_b.
	 - if targetVehicle_a is found to be parallel to targetVehicle_b then return targetVehicle_b.
	 - cars are considered parallel if the absolute difference between their distanceDriven properties is less than 25 px and they have non-matching coordX properties	*/


	if (abs(targetVehicle_b.distanceDriven - targetVehicle_a.distanceDriven) < 25
		&& targetVehicle_a.coordX !== targetVehicle_b.coordX) {
		return targetVehicle_b;
	}

	return false

}


function spotCriminal() {
	/*
	This function should do the following: 
	 - Check cars passing parallel to sleuthCar to see if they match the numberPlate property in the criminal description.
	 - it does this by traversing traffic_list and calling carIsBySide for each car
.	 - if a positive result is returned then the numberPlate property of the found car is then checked against the criminal description.
	 - if a match is found then the car in question is assigned to the global variable criminal.
	*/

	for (var i = 0; i < traffic_list.length; i++) {
		let k = carIsBySide(sleuthCar, traffic_list[i]);
		if (k) {
			if (k.numberPlate == "1TKBMC") {
				criminal = traffic_list[i];
			}
		}

	}
}


//////////////DO NOT CHANGE CODE BELOW THIS LINE//////////////////

var sleuthCar;

var roadWidth;
var roadLeftEdge;
var Lane_Coord_a;
var Lane_Coord_b;
var carImages = {};
var criminal;

var traffic_list = [
	{ coordX: 500, coordY: 0, distanceDriven: -200, vehicleType: 'blueCar', numberPlate: '6E88PT', gasVal: 2, exhaust: [] }, { coordX: 300, coordY: 0, distanceDriven: 200, vehicleType: 'greenCar', numberPlate: '6FQ19V', gasVal: 2, exhaust: [] }, { coordX: 300, coordY: 0, distanceDriven: 600, vehicleType: 'greenCar', numberPlate: '8K0VUE', gasVal: 2, exhaust: [] }, { coordX: 500, coordY: 0, distanceDriven: 1000, vehicleType: 'blueCar', numberPlate: 'GKTIGX', gasVal: 2, exhaust: [] }, { coordX: 500, coordY: 0, distanceDriven: 1400, vehicleType: 'blueCar', numberPlate: '1GGZ2P', gasVal: 2, exhaust: [] }, { coordX: 500, coordY: 0, distanceDriven: 1800, vehicleType: 'whiteCar', numberPlate: '1TKBMC', gasVal: 2, exhaust: [] }, { coordX: 300, coordY: 0, distanceDriven: 2200, vehicleType: 'blueCar', numberPlate: 'AUNHFE', gasVal: 2, exhaust: [] }, { coordX: 300, coordY: 0, distanceDriven: 2600, vehicleType: 'blueCar', numberPlate: 'B8NAU6', gasVal: 2, exhaust: [] }, { coordX: 500, coordY: 0, distanceDriven: 3000, vehicleType: 'blueCar', numberPlate: 'WEVZGP', gasVal: 2, exhaust: [] }, { coordX: 500, coordY: 0, distanceDriven: 3400, vehicleType: 'blueCar', numberPlate: 'FPC1BY', gasVal: 2, exhaust: [] }, { coordX: 500, coordY: 0, distanceDriven: 3800, vehicleType: 'redCar', numberPlate: 'OI66WU', gasVal: 2, exhaust: [] }, { coordX: 300, coordY: 0, distanceDriven: 4200, vehicleType: 'greenCar', numberPlate: '8VE2OQ', gasVal: 2, exhaust: [] }, { coordX: 500, coordY: 0, distanceDriven: 4600, vehicleType: 'redCar', numberPlate: '74WT8H', gasVal: 2, exhaust: [] }, { coordX: 500, coordY: 0, distanceDriven: 5000, vehicleType: 'blueCar', numberPlate: 'HZFSA5', gasVal: 2, exhaust: [] }, { coordX: 300, coordY: 0, distanceDriven: 5400, vehicleType: 'greenCar', numberPlate: 'QWXCX1', gasVal: 2, exhaust: [] }, { coordX: 300, coordY: 0, distanceDriven: 5800, vehicleType: 'redCar', numberPlate: '1V7KNK', gasVal: 2, exhaust: [] }, { coordX: 300, coordY: 0, distanceDriven: 6200, vehicleType: 'blueCar', numberPlate: 'HWMEIU', gasVal: 2, exhaust: [] }, { coordX: 500, coordY: 0, distanceDriven: 6600, vehicleType: 'whiteCar', numberPlate: '0CTVTF', gasVal: 2, exhaust: [] }, { coordX: 300, coordY: 0, distanceDriven: 7000, vehicleType: 'redCar', numberPlate: 'C38N92', gasVal: 2, exhaust: [] }, { coordX: 500, coordY: 0, distanceDriven: 7400, vehicleType: 'blueCar', numberPlate: '5IWUCM', gasVal: 2, exhaust: [] }
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
	textSize(30);
	textAlign(CENTER);

	roadWidth = 400;
	roadLeftEdge = 200;
	Lane_Coord_a = 300;
	Lane_Coord_b = 500;

	sleuthCar =
	{
		coordX: roadLeftEdge + roadWidth / 4,
		coordY: 550,
		distanceDriven: 0,
		gasVal: 3,
		rumbleAmt: 0,
		vehicleType: 'detective',
		numberPlate: '5L3UTH',
		exhaust: []
	}


}



function draw() {
	background(0);



	drawRoad();
	drawCars();

	if (criminal) {
		fill(255);

		text("criminal found !", width / 2, height / 2);
		return;
	}

	////////////////////// HANDLE DETECTIVE /////////////////////////

	driveVehicle();
	for (var i = 0; i < traffic_list.length; i++) {
		var b2b = searchIsInfront(sleuthCar, traffic_list[i]);
		if (b2b) changeLanes(sleuthCar);
	}
	spotCriminal();


	//////////////////////HANDLE THE OTHER CARS//////////////////////

	for (var i = 0; i < traffic_list.length; i++) {
		traffic_list[i].distanceDriven += traffic_list[i].gasVal;
		traffic_list[i].coordY = sleuthCar.coordY - traffic_list[i].distanceDriven + sleuthCar.distanceDriven;
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
			roadLeftEdge + roadWidth / 2, i * 100 + (sleuthCar.distanceDriven % 100),
			roadLeftEdge + roadWidth / 2, i * 100 + 70 + (sleuthCar.distanceDriven % 100)
		);
	}
}

function drawCars() {
	//draw the detective car

	image
	drawExhaust(sleuthCar);
	image
		(
			carImages["detective"],
			sleuthCar.coordX - carImages["detective"].width / 2 + random(-sleuthCar.rumbleAmt, sleuthCar.rumbleAmt),
			sleuthCar.coordY + random(-sleuthCar.rumbleAmt, sleuthCar.rumbleAmt)
		);

	//draw all other cars

	for (var i = 0; i < traffic_list.length; i++) {
		if (traffic_list[i].coordY < height && traffic_list[i].coordY > -height / 2) {
			image(
				carImages[traffic_list[i].vehicleType],
				traffic_list[i].coordX - carImages[traffic_list[i].vehicleType].width / 2,
				traffic_list[i].coordY
			);
			driveCarMotor(traffic_list[i]);

			drawExhaust(traffic_list[i]);
		}
	}

}

function driveCarMotor(car) {

	car.exhaust.push({ size: 2, x: car.coordX, y: car.coordY + carImages[car.vehicleType].height });

	for (var i = car.exhaust.length - 1; i >= 0; i--) {

		car.exhaust[i].y += max(0.75, car.gasVal / 3);
		if (car.vehicleType != "detective") car.exhaust[i].y += (sleuthCar.gasVal - car.gasVal);
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
