/*
802 - The case of Monte Carlo
Stage 4 - Club criminal


Officer: 6128338
CaseNum: 802-3-78335222-6128338

The card sharks from Rossling Polling are not pleased with your stellar performance and suspect foul play. They are challenging you to find a single card in the deck in just one cut.
The card you are looking for is stored in the cutPoint object. Cut the deck at this exact location and they will give up their secrets.

* Using a for loop search for the card represented by cutPoint in the playingCards array.
* Do this in a function called cutDeck and call it from setup.
* We need to be quick to not be spotted. Make sure you use a for loop and the break statement when you find a match in the deck.
* Store the cut card and all the elements after from the playingCards array in the top_of_deck array. Do this using the JavaScript splice() function
* You’ll then need to reverse the elements in top_of_deck so that the card we cut the deck at is the last element and not the first. Unfortunatly, if we use the JavaScript inbuilt reverse() function we’ll be spotted. You’ll have to write this yourself kid. Do this in the cutDeck after you have filled top_of_deck.


*You also need to write a shuffleSeed() function. Same as before, it needs to return an array of 52 random integers but set the random value to start at 1 and end at 66.
Make sure you use the push method to add values to your array and the round function to convert your random values to integers.
*Call shuffleSeed in setup and use the return value as the argument for shuffleDeck().

*/

var playingCards = [{"type":"Spades","v":"A"},{"type":"Spades","v":"2"},{"type":"Spades","v":"3"},{"type":"Spades","v":"4"},{"type":"Spades","v":"5"},{"type":"Spades","v":"6"},{"type":"Spades","v":"7"},{"type":"Spades","v":"8"},{"type":"Spades","v":"9"},{"type":"Spades","v":"10"},{"type":"Spades","v":"J"},{"type":"Spades","v":"Q"},{"type":"Spades","v":"K"},{"type":"Clubs","v":"A"},{"type":"Clubs","v":"2"},{"type":"Clubs","v":"3"},{"type":"Clubs","v":"4"},{"type":"Clubs","v":"5"},{"type":"Clubs","v":"6"},{"type":"Clubs","v":"7"},{"type":"Clubs","v":"8"},{"type":"Clubs","v":"9"},{"type":"Clubs","v":"10"},{"type":"Clubs","v":"J"},{"type":"Clubs","v":"Q"},{"type":"Clubs","v":"K"},{"type":"Hearts","v":"A"},{"type":"Hearts","v":"2"},{"type":"Hearts","v":"3"},{"type":"Hearts","v":"4"},{"type":"Hearts","v":"5"},{"type":"Hearts","v":"6"},{"type":"Hearts","v":"7"},{"type":"Hearts","v":"8"},{"type":"Hearts","v":"9"},{"type":"Hearts","v":"10"},{"type":"Hearts","v":"J"},{"type":"Hearts","v":"Q"},{"type":"Hearts","v":"K"},{"type":"Diamonds","v":"A"},{"type":"Diamonds","v":"2"},{"type":"Diamonds","v":"3"},{"type":"Diamonds","v":"4"},{"type":"Diamonds","v":"5"},{"type":"Diamonds","v":"6"},{"type":"Diamonds","v":"7"},{"type":"Diamonds","v":"8"},{"type":"Diamonds","v":"9"},{"type":"Diamonds","v":"10"},{"type":"Diamonds","v":"J"},{"type":"Diamonds","v":"Q"},{"type":"Diamonds","v":"K"}];
var deck_img;
var table_img;
var drawCounter = 0;

var cutPoint = {"suit":"Clubs","n":"5"};
var top_of_deck = [];

function preload()
{
	deck_img = loadImage("deck.png");
	table_img = loadImage("table.png");
}
function setup()
{
	createCanvas(table_img.width, table_img.height);
	frameRate(30);


	//call your shuffleSeed() function here. Followed by a call to shuffleDeck with the return value of shuffleSeed() as an argument.
	var shuffled = shuffleSeed();
	shuffleDeck(shuffled);
	//call your cutDeck function here
	cutDeck();
}

//write your cutDeck function here
function cutDeck() {
	for(var i = 0; i < playingCards.length; i++) {
		if (playingCards[i].type == cutPoint.suit && playingCards[i].v == cutPoint.n) {
			playingCards.splice(0, i);
			top_of_deck = playingCards;
			var newArray = [];
			for (var i = top_of_deck.length - 1; i >= 0; i--) {
				newArray.push(top_of_deck[i]);
			  }
			top_of_deck = newArray;
			break;
		}
	}
}
//write your shuffleSeed() function here.
function shuffleSeed() {
	var empty = [];
	for (var i = 0; i < 52; i++) {
		empty.push(round(random(1, 66)));
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
		if (drawCounter == 5)
		{
			noLoop();
		}
	}
	for (var i = 0; i < drawCounter; i++)
	{
		if(i < top_of_deck.length)
		{
			drawCard(top_of_deck[i], 880 + i * 18, 750);
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
			if (card.v == values[j] && card.type == suits[i])
			{
			//img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
				image(deck_img, j * 200, i * 300, 200, 300, x, y, 100, 150);
				break;
			}
		}
	}
}
