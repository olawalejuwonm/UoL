/*

Officer: 6128338
CaseNum: 702-3-22263698-6128338

Case 702 - The case of Vanishing Vannevar
Stage 4 - High speed chase

“All units: Vannevar is on the run. They are driving a blue car with a Licence_Plate of QMXWHC.  Pursue at speed.
I repeat pursue at speed.” Okay Vannevar’s game is nearly up. Go get him kid.
Complete the helper functions below to locate, chase and arrest Vannevar.

There are many possible ways of completing this task,
but you should ONLY use the following commands and techniques:

	- Incrementing and assiging variables
	- Maths function such as random, min, abs, and constrain
	- Conditional statements
	- Traversing arrays with for loops
	- calling functions and returning values

HINT: make sure you take a look at the initialisation of Chase_Car and the cars in
vehicleObjects_array to understand their properties.

*/

///////////////////////// HELPER FUNCTIONS /////////////////////

function driveVehicle() {
	/*
	This function should do the following: 
	 - increment Chase_Car's Dist_Travelled property by its Accel_Amount property 
	 - add a random amount between -0.06 and 0.06 to Chase_Car's Shudder_Value property
	 - use the constrain function to constrain Chase_Car's Shudder_Value property to values between 0.02 and 1.18
	 - call the driveCar_motor function passing Chase_Car as an argument
	*/
	Chase_Car.Dist_Travelled += Chase_Car.Accel_Amount;
	Chase_Car.Shudder_Value += random(-0.06, 0.06);
	Chase_Car.Shudder_Value = constrain(Chase_Car.Shudder_Value, 0.02, 1.18);
	driveCar_motor(Chase_Car);
}


function switchLanes(carObj) {
	/*
	This function should do the following: 
	 - move carObj from one lane to the other.
	 - do the move in a single step without any extra animation.
	 - use lanePosition_a and lanePosition_b to effect the change.
	 - finally you should return carObj at the end of the function.
	 hint: You will need to modify the Coordinate_X property of carObj.
	*/

	if (carObj.Coordinate_X == lanePosition_a) {
		carObj.Coordinate_X = lanePosition_b;

	}

	else {
		carObj.Coordinate_X = lanePosition_a;
	}

	return carObj;
}


function checkInfront(vehicle_a, vehicle_b) {
	/*
	This function should do the following: 
	 - determine if vehicle_a is in the same lane and less than 200px behind vehicle_b.
	 - do this by comparing the two cars' Dist_Travelled properties
	 - if these requirements are met then return the Licence_Plate property for vehicle_b. Otherwise return false.
	*/

	if (vehicle_a.Coordinate_X == vehicle_b.Coordinate_X) {
		if ((vehicle_b.Dist_Travelled - vehicle_a.Dist_Travelled) <= 200 &&
			vehicle_b.Dist_Travelled > vehicle_a.Dist_Travelled) {
			return vehicle_b.Licence_Plate
		}
	}

	return false;
}


function checkVehicleAtSide(target_car) {
	/*
	This function should do the following: 
	 - traverse vehicleObjects_array and determine if any of the cars are parallel with target_car.
	 - if a car is found to be parallel to target_car then return that car object.
	 - cars are considered parallel if the absolute difference between their Dist_Travelled properties is less than 25 px and they have non-matching Coordinate_X properties	*/

	 
	for (var i = 0; i < vehicleObjects_array.length; i++) {
		if (abs(vehicleObjects_array[i].Dist_Travelled - target_car.Dist_Travelled) < 25 &&
			vehicleObjects_array[i].Coordinate_X !== target_car.Coordinate_X) {
				return vehicleObjects_array[i];
		}
	}


}


function spotSuspect() {
	/*
	This function should do the following: 
	 - Check cars passing parallel to Chase_Car to see if they match the Licence_Plate property in the suspect description.
	 - it does this by calling checkVehicleAtSide.
	 - if a positive result is returned then the Licence_Plate property of the found car is then checked against the suspect description.
	 - if a match is found then the car in question is assigned to the global variable suspect.
	*/

	var k = checkVehicleAtSide(Chase_Car);
	if (k) {
		if (k.Licence_Plate == 'QMXWHC') {
			suspect = k;
		}
	}
}


function tailSuspect() {
	/*
	This function should do the following: 
	 - scale the Accel_Amount property of Chase_Car by a factor of 1.001.
	 - use the min function to make sure that Chase_Car's Accel_Amount property does not exceed 6.
	 - it should traverse vehicleObjects_array calling checkInfront for each car to detect any cars in front of Chase_Car.
	 - if a positive result is returned it should check to see if the Licence_Plate property of that car matches that of suspect.
	 - for a match, pullOverSuspect should be called, otherwise call switchLanes.
	*/

	Chase_Car.Accel_Amount *= 1.001;
	Chase_Car.Accel_Amount = min(Chase_Car.Accel_Amount, 6);
	for (var i = 0; i < vehicleObjects_array.length; i++) {
		var k = checkInfront(Chase_Car, vehicleObjects_array[i]);
		if (k) {
			if (k == 'QMXWHC') {
				pullOverSuspect();
			}
			else {
				switchLanes(Chase_Car);
			}
		}

		else {
			// switchLanes(Chase_Car);
		}
	}
	// switchLanes(Chase_Car);
}


function pullOverSuspect() {
	/*
	This function should do the following: 
	 - set the apprehended property of suspect to true.
	 - set the Arresting_Suspect property of Chase_Car to true.
	 - set the Accel_Amount properties of both vehicles to zero.
	*/
	suspect.apprehended = true;
	Chase_Car.Arresting_Suspect = true;
	suspect.Accel_Amount = 0;
	Chase_Car.Accel_Amount = 0;
}


//////////////DO NOT CHANGE CODE BELOW THIS LINE//////////////////

var Chase_Car;

var roadWidth;
var roadLeftEdge;
var lanePosition_a;
var lanePosition_b;
var carImages = {};
var suspect;

var vehicleObjects_array = [
	{ Coordinate_X: 300, Coordinate_Y: 0, Dist_Travelled: -200, Car_Classification: 'redCar', Licence_Plate: 'PHT45B', Accel_Amount: 2, exhaust: [] }, { Coordinate_X: 500, Coordinate_Y: 0, Dist_Travelled: 200, Car_Classification: 'blueCar', Licence_Plate: 'CFX5BK', Accel_Amount: 2, exhaust: [] }, { Coordinate_X: 300, Coordinate_Y: 0, Dist_Travelled: 600, Car_Classification: 'greenCar', Licence_Plate: 'NNGRDB', Accel_Amount: 2, exhaust: [] }, { Coordinate_X: 300, Coordinate_Y: 0, Dist_Travelled: 1000, Car_Classification: 'blueCar', Licence_Plate: 'LCQTD4', Accel_Amount: 2, exhaust: [] }, { Coordinate_X: 500, Coordinate_Y: 0, Dist_Travelled: 1400, Car_Classification: 'greenCar', Licence_Plate: 'X0E685', Accel_Amount: 2, exhaust: [] }, { Coordinate_X: 500, Coordinate_Y: 0, Dist_Travelled: 1800, Car_Classification: 'greenCar', Licence_Plate: 'SDJSHI', Accel_Amount: 2, exhaust: [] }, { Coordinate_X: 500, Coordinate_Y: 0, Dist_Travelled: 2200, Car_Classification: 'blueCar', Licence_Plate: 'I4KX6M', Accel_Amount: 2, exhaust: [] }, { Coordinate_X: 300, Coordinate_Y: 0, Dist_Travelled: 2600, Car_Classification: 'greenCar', Licence_Plate: 'FUOUB2', Accel_Amount: 2, exhaust: [] }, { Coordinate_X: 300, Coordinate_Y: 0, Dist_Travelled: 3000, Car_Classification: 'greenCar', Licence_Plate: 'MPLJZW', Accel_Amount: 2, exhaust: [] }, { Coordinate_X: 300, Coordinate_Y: 0, Dist_Travelled: 3400, Car_Classification: 'blueCar', Licence_Plate: 'QMXWHC', Accel_Amount: 2, exhaust: [] }, { Coordinate_X: 500, Coordinate_Y: 0, Dist_Travelled: 3800, Car_Classification: 'greenCar', Licence_Plate: 'RWRHGK', Accel_Amount: 2, exhaust: [] }, { Coordinate_X: 500, Coordinate_Y: 0, Dist_Travelled: 4200, Car_Classification: 'redCar', Licence_Plate: '3ZV0RI', Accel_Amount: 2, exhaust: [] }, { Coordinate_X: 300, Coordinate_Y: 0, Dist_Travelled: 4600, Car_Classification: 'blueCar', Licence_Plate: 'XQ3Q9L', Accel_Amount: 2, exhaust: [] }, { Coordinate_X: 500, Coordinate_Y: 0, Dist_Travelled: 5000, Car_Classification: 'whiteCar', Licence_Plate: 'PPMPL3', Accel_Amount: 2, exhaust: [] }, { Coordinate_X: 500, Coordinate_Y: 0, Dist_Travelled: 5400, Car_Classification: 'redCar', Licence_Plate: 'AJR0SW', Accel_Amount: 2, exhaust: [] }, { Coordinate_X: 500, Coordinate_Y: 0, Dist_Travelled: 5800, Car_Classification: 'whiteCar', Licence_Plate: '8CDIZF', Accel_Amount: 2, exhaust: [] }, { Coordinate_X: 300, Coordinate_Y: 0, Dist_Travelled: 6200, Car_Classification: 'redCar', Licence_Plate: 'BK0IXN', Accel_Amount: 2, exhaust: [] }, { Coordinate_X: 300, Coordinate_Y: 0, Dist_Travelled: 6600, Car_Classification: 'redCar', Licence_Plate: 'EG0XVH', Accel_Amount: 2, exhaust: [] }, { Coordinate_X: 300, Coordinate_Y: 0, Dist_Travelled: 7000, Car_Classification: 'whiteCar', Licence_Plate: '83RRYE', Accel_Amount: 2, exhaust: [] }, { Coordinate_X: 300, Coordinate_Y: 0, Dist_Travelled: 7400, Car_Classification: 'whiteCar', Licence_Plate: 'I6LMPT', Accel_Amount: 2, exhaust: [] }
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
	lanePosition_a = 300;
	lanePosition_b = 500;

	Chase_Car =
	{
		Coordinate_X: roadLeftEdge + roadWidth / 4,
		Coordinate_Y: 550,
		Dist_Travelled: 0,
		Accel_Amount: 3,
		Shudder_Value: 0,
		Car_Classification: 'detective',
		Licence_Plate: '5L3UTH',
		Arresting_Suspect: false,
		Following_Suspect: false,
		exhaust: []
	}


}



function draw() {
	background(0);

	drawRoad();
	drawCars();

	if (suspect) {
		if (suspect.apprehended) {
			fill(255);

			text("suspect apprehended!", width / 2, height / 2);
		}

	}


	////////////////////// HANDLE DETECTIVE /////////////////////////

	if (!Chase_Car.Following_Suspect && !Chase_Car.Arresting_Suspect) {
		driveVehicle();
		for (var i = 0; i < vehicleObjects_array.length; i++) {
			var b2b = checkInfront(Chase_Car, vehicleObjects_array[i]);
			if (b2b) switchLanes(Chase_Car);
		}
		spotSuspect();
		if (suspect) Chase_Car.Following_Suspect = true;
	}
	else if (!Chase_Car.Arresting_Suspect) {
		tailSuspect();
		driveVehicle();
	}


	////////////////////// HANDLE ASSAILANT /////////////////////////

	if (suspect) {
		if (!suspect.apprehended) {
			suspect.Accel_Amount = 5;
			for (var i = 0; i < vehicleObjects_array.length; i++) {
				var b2b = checkInfront(suspect, vehicleObjects_array[i]);
				if (b2b) {
					if (b2b.Licence_Plate != suspect.Licence_Plate) {
						switchLanes(suspect);
					}
				}
			}
		}
	}


	//////////////////////HANDLE THE OTHER CARS//////////////////////

	for (var i = 0; i < vehicleObjects_array.length; i++) {
		vehicleObjects_array[i].Dist_Travelled += vehicleObjects_array[i].Accel_Amount;
		vehicleObjects_array[i].Coordinate_Y = Chase_Car.Coordinate_Y - vehicleObjects_array[i].Dist_Travelled + Chase_Car.Dist_Travelled;

		if (suspect) {
			if (suspect.apprehended) {
				if (vehicleObjects_array[i].Coordinate_X == Chase_Car.Coordinate_X) {
					if (vehicleObjects_array[i].Dist_Travelled < Chase_Car.Dist_Travelled) {
						if (vehicleObjects_array[i].Dist_Travelled - Chase_Car.Dist_Travelled < 200) {
							switchLanes(vehicleObjects_array[i]);
						}
					}
				}
			}
		}

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
			roadLeftEdge + roadWidth / 2, i * 100 + (Chase_Car.Dist_Travelled % 100),
			roadLeftEdge + roadWidth / 2, i * 100 + 70 + (Chase_Car.Dist_Travelled % 100)
		);
	}
}

function drawCars() {
	//draw the detective car

	drawExhaust(Chase_Car);
	image
		(
			carImages["detective"],
			Chase_Car.Coordinate_X - carImages["detective"].width / 2 + random(-Chase_Car.Shudder_Value, Chase_Car.Shudder_Value),
			Chase_Car.Coordinate_Y + random(-Chase_Car.Shudder_Value, Chase_Car.Shudder_Value)
		);

	//draw all other cars

	for (var i = 0; i < vehicleObjects_array.length; i++) {
		if (vehicleObjects_array[i].Coordinate_Y < height && vehicleObjects_array[i].Coordinate_Y > -height / 2) {
			image(
				carImages[vehicleObjects_array[i].Car_Classification],
				vehicleObjects_array[i].Coordinate_X - carImages[vehicleObjects_array[i].Car_Classification].width / 2,
				vehicleObjects_array[i].Coordinate_Y
			);
			driveCar_motor(vehicleObjects_array[i]);

			drawExhaust(vehicleObjects_array[i]);
		}
	}

}

function driveCar_motor(car) {

	car.exhaust.push({ size: 2, x: car.Coordinate_X, y: car.Coordinate_Y + carImages[car.Car_Classification].height });

	for (var i = car.exhaust.length - 1; i >= 0; i--) {

		car.exhaust[i].y += max(0.75, car.Accel_Amount / 3);
		if (car.Car_Classification != "detective") car.exhaust[i].y += (Chase_Car.Accel_Amount - car.Accel_Amount);
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
