/*
802 - The case of Monte Carlo
Stage 3 - Counting Cards


Officer: 6128338
CaseNum: 802-2-57633796-6128338

These sharks don’t mess about. One hand, winner takes all. What kind of chief would I be if I let you go in alone! I’ve counted the cards and I know what you need to win. Make sure you deal yourself the hand in handToWin from the deck and store it in the hand array.

*Write a function called setWinningHand and call it from setup.
*We need to be quick so our ruse isn’t spotted. Make sure you use a nested for loop and the break statement in the inner loop when you find a match in the deck.
*When you find a card in the deck that matches one in handToWin add it to the handArray. Then break and search for the next card.

*You also need to write a shuffleSeed() function. Same as before, it needs to return an array of 52 random integers but set the random value to start at 1 and end at 78.
*Make sure you use the push method to add values to your array and the round function to convert your random values to integers.
*Call shuffleSeed in setup and use the return value as the argument for shuffleDeck().


*/

var card_deck = [{"suit":"Spades","no":"A"},{"suit":"Spades","no":"2"},{"suit":"Spades","no":"3"},{"suit":"Spades","no":"4"},{"suit":"Spades","no":"5"},{"suit":"Spades","no":"6"},{"suit":"Spades","no":"7"},{"suit":"Spades","no":"8"},{"suit":"Spades","no":"9"},{"suit":"Spades","no":"10"},{"suit":"Spades","no":"J"},{"suit":"Spades","no":"Q"},{"suit":"Spades","no":"K"},{"suit":"Clubs","no":"A"},{"suit":"Clubs","no":"2"},{"suit":"Clubs","no":"3"},{"suit":"Clubs","no":"4"},{"suit":"Clubs","no":"5"},{"suit":"Clubs","no":"6"},{"suit":"Clubs","no":"7"},{"suit":"Clubs","no":"8"},{"suit":"Clubs","no":"9"},{"suit":"Clubs","no":"10"},{"suit":"Clubs","no":"J"},{"suit":"Clubs","no":"Q"},{"suit":"Clubs","no":"K"},{"suit":"Hearts","no":"A"},{"suit":"Hearts","no":"2"},{"suit":"Hearts","no":"3"},{"suit":"Hearts","no":"4"},{"suit":"Hearts","no":"5"},{"suit":"Hearts","no":"6"},{"suit":"Hearts","no":"7"},{"suit":"Hearts","no":"8"},{"suit":"Hearts","no":"9"},{"suit":"Hearts","no":"10"},{"suit":"Hearts","no":"J"},{"suit":"Hearts","no":"Q"},{"suit":"Hearts","no":"K"},{"suit":"Diamonds","no":"A"},{"suit":"Diamonds","no":"2"},{"suit":"Diamonds","no":"3"},{"suit":"Diamonds","no":"4"},{"suit":"Diamonds","no":"5"},{"suit":"Diamonds","no":"6"},{"suit":"Diamonds","no":"7"},{"suit":"Diamonds","no":"8"},{"suit":"Diamonds","no":"9"},{"suit":"Diamonds","no":"10"},{"suit":"Diamonds","no":"J"},{"suit":"Diamonds","no":"Q"},{"suit":"Diamonds","no":"K"}];
var deck_img;
var table_img;
var drawCounter = 0;

var handToWin = [{"suit":"Diamonds","value":"K"},{"suit":"Clubs","value":"10"},{"suit":"Spades","value":"Q"},{"suit":"Diamonds","value":"Q"},{"suit":"Hearts","value":"10"}];
var hand =[];

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
	//call your setWinningHand function here
	setWinningHand();
}

//write your setWinningHand function here
function setWinningHand() {
	
	for (var i = 0; i < card_deck.length; i++) {
		for (var k = 0; k < handToWin.length; k++) { 
			if (card_deck[i].suit == handToWin[k].suit && card_deck[i].no == handToWin[k].value) {
				hand.push(card_deck[i]);
				break;			
			}
		}
	}

}
//write your shuffleSeed() function here.
function shuffleSeed() {
	var empty = [];
	for (var i = 0; i < 52; i++) {
		empty.push(round(random(1, 78)));
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
	   for (var j = 0; j < card_deck.length; j++)
	   {
		  var tempCard = card_deck.splice(j, 1);
          var newLoc = (j + shuffleSeed[j])%52;
          card_deck.splice(newLoc, 0, tempCard[0]);
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
		if( i < hand.length)
		{
			drawCard(hand[i], 880 + i * 18, 750);
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
			if (card.no == values[j] && card.suit == suits[i])
			{
			//img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
				image(deck_img, j * 200, i * 300, 200, 300, x, y, 100, 150);
				break;
			}
		}
	}
}
