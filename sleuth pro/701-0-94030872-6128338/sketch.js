/*

Officer: 6128338
CaseNum: 701-0-94030872-6128338

Case 701 - Probable pick pocket - stage 1

There has been a spate of pickpocketing downtown and we’ve been asked to lend a hand down at the precinct.
They’ve managed to collect a witness statement from an unsuspecting tourist jesus willmar and also rounded up a bunch of the usual suspects.
We need you to unravel this mess and work out who is the guilty one.

Please create a function that takes a suspect object as parameter from the data structure below.
Your function should return a boolean value indicating whether or not they match the witness statement.
You should use conditional statements to compare the suspect's properties to the statement.
It should only return "true" if the suspect matches the description in full.

The function is already being called in draw() but it is your job to implement it.

There are many possible ways of carrying out your duties,
but you should complete this task using ONLY the following
commands:

 - function testSuspect(suspectObj){}
 - if()

Witness statement:

It all started when I was exiting the store. That's when I noticed them. The person I saw was male. I'll never forget their blue eyes. I distinctly remember that they were wearing a net weave shirt, I remember thinking that was quite unusual. It's hard to say. It's hard to say. I hope I never have to go through that again. 

*/

var suspectsArray = [
	{ 
		"name": "LARRAINE OORIN",
		"eyes": "pale",
		"gender": "male",
		"item": "purple hat"
	},
	{ 
		"name": "JESSIA ZETLAND",
		"eyes": "blue",
		"gender": "male",
		"item": "net weave shirt"
	},
	{ 
		"name": "MAJORIE WARMAN",
		"eyes": "brown",
		"gender": "female",
		"item": "fur vest"
	}
];

var myFont;
var backgroundImg;

function preload() {
  myFont = loadFont('SpecialElite.ttf');
  backgroundImg = loadImage("Background.png");
}

function setup()
{
	createCanvas(640,480);
	textFont(myFont);
}

// Declare your function here
function testSuspect(suspectObj){
	if(suspectObj.gender == "male" && suspectObj.eyes== "blue" && suspectObj.item=="net weave shirt") {
		return true;
	}
	return false;
}



function draw()
{
  //You don't need to alter this code
  image(backgroundImg, 0, 0);

  for(let i = 0 ; i < suspectsArray.length; i++){
    if(testSuspect(suspectsArray[i]) == true){
      fill(255,0,0);
      text(suspectsArray[i].name + " is guilty!", 60, 60 + i * 20);
    }else{
      fill(0,155,0);
      text(suspectsArray[i].name + " is not guilty", 60, 60 + i * 20 );
    }
  }
}
