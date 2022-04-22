/*

Officer: 6128338
CaseNum: 303-2-20987637-6128338

Case 303 - The Case of the Crooked Attorney
Stage 3 - The Gates Bank

I’ve made an appointment for you at the Gates Bank to retrieve your safe deposit box from the vault.
Actually you will break into Torvalds’ one.

Crack the safe by doing the following:

	When the mouse button is released:
	- Make SecureStorageVal0 equal to the value of mouseY
	- Use the 'max' function to prevent SecureStorageVal0 from falling below 2

	When the mouse button is pressed:
	- Decrement SecureStorageVal1 by 2
	- Use the 'constrain' function to prevent SecureStorageVal1 from falling below 1 and going above 10

	When the mouse button is released:
	- Make SecureStorageVal2 equal to the value of mouseY
	- Use the 'constrain' function to prevent SecureStorageVal2 from falling below 2 and going above 15

	When the mouse button is pressed:
	- Increment SecureStorageVal3 by 3
	- Use the 'min' function to prevent SecureStorageVal3 from going above 15

	Whilst the mouse is being dragged:
	- Make SecureStorageVal4 equal to the value of mouseY
	- Use the 'max' function to prevent SecureStorageVal4 from falling below 11



This time you'll need to create the relevant event handlers yourself.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

	- The assignment operator aka. the equals sign !
	- mouseX, mouseY
	- Incrementing +=
	- Decrementing -=
	- min, max
	- constrain

*/

//declare the variables

var SecureStorageVal0;
var SecureStorageVal1;
var SecureStorageVal2;
var SecureStorageVal3;
var SecureStorageVal4;


function preload()
{
	//IMAGES WILL BE LOADED HERE

}

function setup()
{
	createCanvas(512,512);

	//initialise the variables
	SecureStorageVal0 = 0;
	SecureStorageVal1 = 0;
	SecureStorageVal2 = 0;
	SecureStorageVal3 = 0;
	SecureStorageVal4 = 0;

}

///////////////////EVENT HANDLERS///////////////////

//Create event handlers here to open the safe ...
function mouseReleased() {
	// When the mouse button is released:
	// - Make SecureStorageVal0 equal to the value of mouseY
	// - Use the 'max' function to prevent SecureStorageVal0 from falling below 2
	SecureStorageVal0 = max(mouseY, 2);

	// When the mouse button is released:
	// - Make SecureStorageVal2 equal to the value of mouseY
	// - Use the 'constrain' function to prevent SecureStorageVal2 from falling below 2 and going above 15
	SecureStorageVal2 = mouseY;
	SecureStorageVal2 = constrain(SecureStorageVal2, 2, 15);
}

function mousePressed() {
	// When the mouse button is pressed:
	// - Decrement SecureStorageVal1 by 2
	// - Use the 'constrain' function to prevent SecureStorageVal1 from falling below 1 and going above 10
	SecureStorageVal1 -= 2;
	SecureStorageVal1 = constrain(SecureStorageVal1, 1, 10);

	// When the mouse button is pressed:
	// - Increment SecureStorageVal3 by 3
	// - Use the 'min' function to prevent SecureStorageVal3 from going above 15
	SecureStorageVal3 += 3;
	SecureStorageVal3 = min(SecureStorageVal3, 15);
}



function mouseDragged() {
	// Whilst the mouse is being dragged:
	// - Make SecureStorageVal4 equal to the value of mouseY
	// - Use the 'max' function to prevent SecureStorageVal4 from falling below 11

	SecureStorageVal4 = mouseY;
	SecureStorageVal4 = max(SecureStorageVal4, 11);
}

///////////////DO NOT CHANGE CODE BELOW THIS POINT///////////////////

function draw()
{

	//Draw the safe door
	background(70);
	noStroke();
	fill(29,110,6);
	rect(26,26,width-52,width-52);

	//Draw the combination dials
	push();
	translate(120,170);
	drawDial(140,SecureStorageVal0, 20);
	pop();

	push();
	translate(120,380);
	drawDial(140,SecureStorageVal1, 14);
	pop();

	push();
	translate(280,170);
	drawDial(140,SecureStorageVal2, 20);
	pop();

	push();
	translate(280,380);
	drawDial(140,SecureStorageVal3, 18);
	pop();

	//Draw the lever
	push();
	translate(width - 125,256);
	drawLever(SecureStorageVal4);
	pop();


}

function drawDial(diameter,num,maxNum)
{
	//the combination lock

	var r = diameter * 0.5;
	var p = r * 0.6;

	stroke(0);
	fill(255,255,200);
	ellipse(0,0,diameter,diameter);
	fill(100);
	noStroke();
	ellipse(0,0,diameter*0.66,diameter*0.66);
	fill(150,0,0);
	triangle(
		-p * 0.4,-r-p,
		p * 0.4,-r-p,
		0,-r-p/5
	);

	noStroke();

	push();
	var inc = 360/maxNum;

	rotate(radians(-num * inc));
	for(var i = 0; i < maxNum; i++)
	{
		push();
		rotate(radians(i * inc));
		stroke(0);
		line(0,-r*0.66,0,-(r-10));
		noStroke();
		fill(0);
		text(i,0,-(r-10));
		pop();
	}

	pop();
}

function drawLever(rot)
{
	push();
	rotate(radians(-rot))
	stroke(0);
	fill(100);
	rect(-10,0,20,100);
	ellipse(0,0,50,50);
	ellipse(0,100,35,35);
	pop();
}
