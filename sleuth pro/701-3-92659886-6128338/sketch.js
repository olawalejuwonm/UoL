/*

Officer: 6128338
CaseNum: 701-3-92659886-6128338

Case 701 - Believable burglar - stage 4

Those guys down at the precinct need to take your brain for one final spin.
This burglar has been a particularly slippery character and now they believe that they have them.
Luckily they have a have a witness statement from deedee crome.
All they need is for you to do the detective work.

This time you must implement two functions:

- A checkSuspectTraits function that takes a suspect object as parameter from the data structure below.
Your function should return a number value indicating how many of their properties match the witness statement.
You should use conditional statements to compare the suspect's properties to the statement.

- A traverseSuspects function which traverses the array of suspects and returns the object representing the guilty suspect,
otherwise - return an empty object.

There are many possible ways of carrying out your duties,
but you should complete this task using ONLY the following
commands:

 - function checkSuspectTraits(suspectObj){}
 - function traverseSuspects(){}
 - if()

Witness statement:

I remember walking down the street and then I saw them. It's hard to say. They brobably weigh between 70 and 95 kg. They were wearing a black hoodie. It was so scary! The person I saw was male. They wore thin metallic glasses. They had thin blond hair. They were fairly tall, I think between a height of 152 and 190 cm. It was very dark and I could barely see, They seemed to be between the age of 38 and 50 years old. I distinctly remember that they were wearing a dotted necktie, I remember thinking that was quite unusual. They were carrying a red backpack. That's all I know officer. 

*/

var lineupLog = [
	{
		"name": "GAYLA JACQUELIN",
		"hair": "shaved",
		"accessory": "plastic box",
		"glasses": "blue",
		"coat": "black overcoat",
		"age": 28,
		"height": 172,
		"weight": 91
	},
	{
		"name": "BRIDGET WARMAN",
		"hair": "thin blond",
		"accessory": "red backpack",
		"glasses": "thin metallic",
		"coat": "black hoodie",
		"age": 42,
		"height": 186,
		"weight": 84
	},
	{
		"name": "LINETTE COURTWOOD",
		"hair": "ginger",
		"accessory": "brown paper bag",
		"glasses": "black",
		"coat": "blue overcoat",
		"age": 37,
		"height": 171,
		"weight": 77
	},
	{
		"name": "JENIFFER THAXTER",
		"hair": "short black",
		"accessory": "glass bottle",
		"glasses": "very thin",
		"coat": "white fur coat",
		"age": 43,
		"height": 177,
		"weight": 65
	},
	{
		"name": "LIANNE ASHELY",
		"hair": "red",
		"accessory": "laptop bag",
		"glasses": "dark brown",
		"coat": "yellow poncho",
		"age": 32,
		"height": 169,
		"weight": 64
	},
	{
		"name": "MAJORIE OORIN",
		"hair": "no",
		"accessory": "metal briefcase",
		"glasses": "light tan",
		"coat": "red parka",
		"age": 54,
		"height": 156,
		"weight": 86
	},
	{
		"name": "LARRAINE WILLMAR",
		"hair": "dark brown",
		"accessory": "orange plasic bag",
		"glasses": "white",
		"coat": "green jacket",
		"age": 22,
		"height": 171,
		"weight": 75
	}
];

var myFont;
var backgroundImg;

function preload() {
	myFont = loadFont('SpecialElite.ttf');
	backgroundImg = loadImage("Background.png");
}

function setup() {
	createCanvas(640, 480);
	textFont(myFont);
}

// Declare both your functions here
function checkSuspectTraits(suspectObj) {
	var count = 0
	if (suspectObj.hair == "thin blond") {
		count++;
	}
	if (suspectObj.coat == "black hoodie") {
		count++;
	}
	if (suspectObj.accessory == "red backpack") {
		count++;
	} if (suspectObj.glasses == "thin metallic") {
		count++;
	} if (38 >= suspectObj.age <= 50) {
		count++;
	}
	if (152 >= suspectObj.height <= 190) {
		count++;
	}
	if (70 >= suspectObj.weight <= 95) {
		count++;
	}

	return count;
}

function traverseSuspects() {
	var traits = [];
	for (var i = 0; i < lineupLog.length; i++) {
		traits.push(checkSuspectTraits(lineupLog[i]));
	}
	return lineupLog[traits.indexOf(max(traits))] ? lineupLog[traits.indexOf(max(traits))] :  {}

}

function draw() {
	//You don't need to alter this code
	image(backgroundImg, 0, 0);

	fill(255, 0, 0);
	text(traverseSuspects().name + " is guilty!", 60, 80);
}
