/*

Officer: 6128338
CaseNum: 701-2-68396988-6128338

Case 701 - Recognisable robber - stage 3

Kid you’re becoming a victim of your own success.
I just had a call from DI Max down at the precinct. He specifically requested your services.
They finally have a reliable witness for a robber who has been causing mayhem for some months.
Luckily they have a witness statement from jaunita silveira. You know what to do kid.

Please create a function that takes a suspect object as parameter from the data structure below.
Your function should return a number value indicating how many of their properties match the witness statement.
You should use conditional statements to compare the suspect's properties to the statement.

The function is already being called in draw() but it is your job to implement it.

There are many possible ways of carrying out your duties,
but you should complete this task using ONLY the following
commands:

 - function matchSuspect(suspectObj){}
 - if()

Witness statement:

It all started when I was exiting the store. That's when I noticed them. They were wearing a green jacket. The person I saw was male. They were fairly tall, I think between a height of 155 and 180 cm. They seemed to be between the age of 18 and 52 years old. I'll never forget their black eyes. I remember they had a neck tattoo. They brobably weigh between 70 and 76 kg. It's hard to say. They were carrying a plastic box. I'm not quite sure. I hope I never have to go through that again. 

*/

var suspectsArray = [
	{
		"name": "LAKESHA NIEMELA",
		"gender": "female",
		"coat": "white fur coat",
		"accessory": "metal briefcase",
		"eyes": "green",
		"age": 38,
		"height": 185,
		"weight": 75
	},
	{
		"name": "LESLEY SYMMES",
		"gender": "male",
		"coat": "green army coat",
		"accessory": "orange plasic bag",
		"eyes": "black",
		"age": 48,
		"height": 189,
		"weight": 64
	},
	{
		"name": "TU COURTWOOD",
		"gender": "male",
		"coat": "yellow poncho",
		"accessory": "laptop bag",
		"eyes": "blue",
		"age": 38,
		"height": 157,
		"weight": 72
	},
	{
		"name": "LAVERNE CASIMERE",
		"gender": "female",
		"coat": "black hoodie",
		"accessory": "red backpack",
		"eyes": "brown",
		"age": 44,
		"height": 153,
		"weight": 73
	},
	{
		"name": "TAMICA MYRLE",
		"gender": "male",
		"coat": "green jacket",
		"accessory": "plastic box",
		"eyes": "black",
		"age": 19,
		"height": 165,
		"weight": 74
	},
	{
		"name": "NICOLE GOODBURY",
		"gender": "female",
		"coat": "blue overcoat",
		"accessory": "brown paper bag",
		"eyes": "blue",
		"age": 33,
		"height": 162,
		"weight": 83
	},
	{
		"name": "JESUS FORSLIN",
		"gender": "female",
		"coat": "red parka",
		"accessory": "orange tote bag",
		"eyes": "grey",
		"age": 63,
		"height": 162,
		"weight": 78
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

// Declare your function here
function matchSuspect(suspectObj) {
	var count = 0
	if (suspectObj.gender == "male") {
		count++;
	}
	if (suspectObj.coat == "green jacket") {
		count++;
	}
	if (
		suspectObj.accessory == "plastic box") {
		count++;
	} if (suspectObj.eyes == "black") {
		count++;
	} if (18 >= suspectObj.age <= 52) {
		count++;
	}
	if (155 >= suspectObj.height <= 180) {
		count++;
	}
	if (70 >= suspectObj.weight <= 76) {
		count++;
	}

	return count;
}


function draw() {
	//You don't need to alter this code
	image(backgroundImg, 0, 0);

	for (let i = 0; i < suspectsArray.length; i++) {
		let matchingProperties = matchSuspect(suspectsArray[i]);
		fill(50 * matchingProperties, 250 - (50 * matchingProperties), 0);
		text("found " + matchingProperties + " matching properties for " + suspectsArray[i].name, 60, 60 + i * 20);
	}
}
