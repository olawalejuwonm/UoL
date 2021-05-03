var myRobot;
// var transmitButton;
// var rotationSlider;
// var nameText;
// var colorSelect;

function setup() {
	// put setup code here
	createCanvas(500, 500);
	myRobot = new Robot("grey", false, "marvin", 0);
	angleMode(DEGREES)

	

}

function draw() {
	// put drawing code here
	background(50);
	// myRobot.colour = colorSelect.selected();
	// myRobot.rotation = rotationSlider.value();
	// myRobot.name = nameText.value();
	myRobot.drawRobot();
}

function Robot(colour, transmitting, name, rotation) {
	this.colour = colour;
	this.rotation = rotation;
	this.transmitting = transmitting;
	this.name = name;

	var controlsDiv = select('#robotControls')
	//add dom controls
	var self = this;
	var transmitButton = createButton("transmit");

	var rotationSlider = createSlider(0, 360, 0);
	var rotationUpdate = function () {
		self.rotation = this.value();
	}
	rotationSlider.input(rotationUpdate);
	var nameText = createInput("Micheal");
	nameText.input(function() {
		self.name = this.value();
	})
	var colorSelect = createSelect();
	var colorOptions = ["grey", "brown", "red", "green", "yellow", "purple"];
	for (var i=0; i < colorOptions.length; i++) {
		colorSelect.option(colorOptions[i]);
	}

	colorSelect.input(function() {
		self.colour = this.value();
	})

	transmitButton.parent(controlsDiv);
	transmitButton.mousePressed(function() {
		self.transmitting = !self.transmitting
	})
	rotationSlider.parent(controlsDiv);
	nameText.parent(controlsDiv);
	colorSelect.parent(controlsDiv);
	this.drawRobot = function() {
		translate(width / 2, height / 2);
		rotate(this.rotation);
		//robots head
		fill(this.colour);
		strokeWeight(4);
		rect(-150, -150, 300, 300, 20);

		//robots antenna
		if (this.transmitting) {
			fill(250, 250, 0);
		} else {
			fill(255, 255, 200);
		}

		ellipse(0, -180, 60, 60);

		fill(200, 0, 200);
		rect(-40, -170, 80, 30);

		//robots eyes
		fill(255);
		ellipse(-75, -50, 80, 80);
		point(-75, -50);
		ellipse(75, -50, 80, 80);
		point(75, -50);


		//robots nose
		fill(255, 0, 0);
		triangle(0, -30, -50, 50, 50, 50);

		//robots ears
		rect(-170, -70, 30, 100);
		rect(140, -70, 30, 100);

		//robots mouth
		noFill();
		beginShape();
		vertex(-75, 90);
		vertex(-50, 120);
		vertex(-25, 90);
		vertex(0, 120);
		vertex(25, 90);
		vertex(50, 120);
		vertex(75, 90);
		endShape();

		//robots name
		textAlign(CENTER);
		textSize(48);
		fill(0);
		text(this.name, 0, 200);
	}
}