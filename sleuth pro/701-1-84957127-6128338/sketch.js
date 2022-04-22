/*

Officer: 6128338
CaseNum: 701-1-84957127-6128338

Case 701 - Credible cat thief - stage 2

Kid they need you down at the precinct again.
This time it's a sneaky cat thief who has been absconding with the neighbourhoods felines for some time.
Luckily old Mrs Olivetti caught a glimpse of them as they disappeared over her back fence.
We’ve a bunch of likely characters lined-up but we need your brains to solve the mystery.

Please create a function that takes a suspect object as parameter from the data structure below.
Your function should return a boolean value indicating whether or not they match the witness statement.
You should use conditional statements to compare the suspect's properties to the statement.
It should only return "true" if the suspect matches the description in full.

The function is already being called in draw() but it is your job to implement it.

There are many possible ways of carrying out your duties,
but you should complete this task using ONLY the following
commands:

 - function testProperties(suspectObj){}
 - if()

Witness statement:

It was last Thursday, I heard noises outside so I looked out and saw a person in the steet. I remember they had a neck tattoo. They were quite big, they probably weigh more than 71 Kg. Their expression seemed nerveous. I'll never forget their brown eyes. It was so scary! They were wearing a red parka. It was so scary! I think they were more than 154 cm tall. I hope I never have to go through that again. 

*/

var suspectList = [
	{ 
		"name": "DRUSILLA CROME",
		"coat": "black overcoat",
		"tattoo": "jellyfish",
		"expression": "depressed",
		"height": 155,
		"weight": 78
	},
	{ 
		"name": "LOUISE TINTLE",
		"coat": "red parka",
		"tattoo": "neck",
		"expression": "nerveous",
		"height": 160,
		"weight": 80
	},
	{ 
		"name": "JACQUELINE DORCEY",
		"coat": "green army coat",
		"tattoo": "big arrow",
		"expression": "sad",
		"height": 185,
		"weight": 70
	},
	{ 
		"name": "BRAD THAXTER",
		"coat": "yellow poncho",
		"tattoo": "sword",
		"expression": "confused",
		"height": 192,
		"weight": 92
	},
	{ 
		"name": "JESSIA GOODBURY",
		"coat": "black hoodie",
		"tattoo": "facial",
		"expression": "menacing",
		"height": 171,
		"weight": 68
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
function testProperties(suspectObj){
	if(suspectObj.coat == "red parka" && suspectObj.expression == "nerveous" && suspectObj.weight > 71
	&& suspectObj.height > 154 && suspectObj.tattoo == "neck") {
		return true;
	}
	return false;
}

function draw()
{
  //You don't need to alter this code
  image(backgroundImg, 0, 0);

  for(let i = 0 ; i < suspectList.length; i++){
    if(testProperties(suspectList[i]) == true){
      fill(255,0,0);
      text(suspectList[i].name + " is guilty!", 60, 60 + i * 20);
    }else{
      fill(0,155,0);
      text(suspectList[i].name + " is not guilty", 60, 60 + i * 20 );
    }
  }
}
