/*
802 - The case of Monte Carlo
Stage 2 - King of Cards


Officer: 6128338
CaseNum: 802-1-11546337-6128338

You aren’t going to look like much of a Poker player unless you can do a good shuffle. We’ll need to be able to do this with one hand tied behind our back if we are going to pose as pros at the big game.

* Write a function called buildShuffleArray.
* Declare an empty array in the function.
* Using a for loop fill the array with 52 random integers between 4 and 54.
* Make sure you use the push method to add values to your array and the round function to convert your random values to integers.
* Return the array at the end of the function.
* Call buildShuffleArray in setup.
* Call Shuffle deck using the return value from buildShuffleArray as the argument.

*/

var playingCards = [{"s":"Spades","v":"A"},{"s":"Spades","v":"2"},{"s":"Spades","v":"3"},{"s":"Spades","v":"4"},{"s":"Spades","v":"5"},{"s":"Spades","v":"6"},{"s":"Spades","v":"7"},{"s":"Spades","v":"8"},{"s":"Spades","v":"9"},{"s":"Spades","v":"10"},{"s":"Spades","v":"J"},{"s":"Spades","v":"Q"},{"s":"Spades","v":"K"},{"s":"Clubs","v":"A"},{"s":"Clubs","v":"2"},{"s":"Clubs","v":"3"},{"s":"Clubs","v":"4"},{"s":"Clubs","v":"5"},{"s":"Clubs","v":"6"},{"s":"Clubs","v":"7"},{"s":"Clubs","v":"8"},{"s":"Clubs","v":"9"},{"s":"Clubs","v":"10"},{"s":"Clubs","v":"J"},{"s":"Clubs","v":"Q"},{"s":"Clubs","v":"K"},{"s":"Hearts","v":"A"},{"s":"Hearts","v":"2"},{"s":"Hearts","v":"3"},{"s":"Hearts","v":"4"},{"s":"Hearts","v":"5"},{"s":"Hearts","v":"6"},{"s":"Hearts","v":"7"},{"s":"Hearts","v":"8"},{"s":"Hearts","v":"9"},{"s":"Hearts","v":"10"},{"s":"Hearts","v":"J"},{"s":"Hearts","v":"Q"},{"s":"Hearts","v":"K"},{"s":"Diamonds","v":"A"},{"s":"Diamonds","v":"2"},{"s":"Diamonds","v":"3"},{"s":"Diamonds","v":"4"},{"s":"Diamonds","v":"5"},{"s":"Diamonds","v":"6"},{"s":"Diamonds","v":"7"},{"s":"Diamonds","v":"8"},{"s":"Diamonds","v":"9"},{"s":"Diamonds","v":"10"},{"s":"Diamonds","v":"J"},{"s":"Diamonds","v":"Q"},{"s":"Diamonds","v":"K"}];
var deck_img;
var table_img;
var drawCounter = 0;

function preload()
{
	deck_img = loadImage("deck.png");
	table_img = loadImage("table.png");
}
function setup()
{
	createCanvas(table_img.width, table_img.height);
	frameRate(30);


	//call your buildShuffleArray function here. Followed by a call to shuffleDeck with the return value of buildShuffleArray as an argument.
	var shuffled = buildShuffleArray();
	shuffleDeck(shuffled);
}

//write your buildShuffleArray function here
function buildShuffleArray() {
	var empty = [];
	for (var i = 0; i < 52; i++) {
		empty.push(round(random(4, 54)));
	}
	return empty;
}

/////////////////////DON'T CHANGE ANYTHING BELOW HERE/////////////////////////
function shuffleDeck(shuffleSeed)
{
		//shuffle the deck by rotating the cards location with the values in
		//shuffleSeed. Repeat this a random number of times between 20 and 50
    var shuffleIterations = parseInt(random(20, 50));
    for(var i = 0; i < shuffleIterations; i++)
    {
	   for (var j = 0; j < playingCards.length; j++)
	   {
		  var tempCard = playingCards.splice(j, 1);
          var newLoc = (j + shuffleSeed[j])%52;
          playingCards.splice(newLoc, 0, tempCard[0]);
	   }
    }
}

function draw()
{
	image(table_img, 0, 0);

	if (frameCount % 7 == 0)
	{
		drawCounter++;
		if (drawCounter == 52)
		{
			noLoop();
		}
	}
	for (var i = 0; i < drawCounter; i++)
	{
		if (playingCards[i].marked)
		{
			drawCard(playingCards[i], 400 + i * 18, 230);
		}
		else
		{
			drawCard(playingCards[i], 400 + i * 18, 250);
		}
	}


}


function drawCard(card, x, y)
{

	var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
	var suits = ["Spades", "Clubs", "Hearts", "Diamonds"];

	for (var i = 0; i < suits.length; i++)
	{
		for (var j = 0; j < values.length; j++)
		{
			if (card.v == values[j] && card.s == suits[i])
			{
			//img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
				image(deck_img, j * 200, i * 300, 200, 300, x, y, 100, 150);
				break;
			}
		}
	}
}
