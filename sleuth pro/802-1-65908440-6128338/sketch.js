/*
802 - The case of Monte Carlo
Stage 2 - King of Cards


Officer: 6128338
CaseNum: 802-1-65908440-6128338

You aren’t going to look like much of a Poker player unless you can do a good shuffle. We’ll need to be able to do this with one hand tied behind our back if we are going to pose as pros at the big game.

* Write a function called fill_shuffle_array.
* Declare an empty array in the function.
* Using a for loop fill the array with 52 random integers between 2 and 71.
* Make sure you use the push method to add values to your array and the round function to convert your random values to integers.
* Return the array at the end of the function.
* Call fill_shuffle_array in setup.
* Call Shuffle deck using the return value from fill_shuffle_array as the argument.

*/

var cards = [{"cardSuit":"Spades","number":"A"},{"cardSuit":"Spades","number":"2"},{"cardSuit":"Spades","number":"3"},{"cardSuit":"Spades","number":"4"},{"cardSuit":"Spades","number":"5"},{"cardSuit":"Spades","number":"6"},{"cardSuit":"Spades","number":"7"},{"cardSuit":"Spades","number":"8"},{"cardSuit":"Spades","number":"9"},{"cardSuit":"Spades","number":"10"},{"cardSuit":"Spades","number":"J"},{"cardSuit":"Spades","number":"Q"},{"cardSuit":"Spades","number":"K"},{"cardSuit":"Clubs","number":"A"},{"cardSuit":"Clubs","number":"2"},{"cardSuit":"Clubs","number":"3"},{"cardSuit":"Clubs","number":"4"},{"cardSuit":"Clubs","number":"5"},{"cardSuit":"Clubs","number":"6"},{"cardSuit":"Clubs","number":"7"},{"cardSuit":"Clubs","number":"8"},{"cardSuit":"Clubs","number":"9"},{"cardSuit":"Clubs","number":"10"},{"cardSuit":"Clubs","number":"J"},{"cardSuit":"Clubs","number":"Q"},{"cardSuit":"Clubs","number":"K"},{"cardSuit":"Hearts","number":"A"},{"cardSuit":"Hearts","number":"2"},{"cardSuit":"Hearts","number":"3"},{"cardSuit":"Hearts","number":"4"},{"cardSuit":"Hearts","number":"5"},{"cardSuit":"Hearts","number":"6"},{"cardSuit":"Hearts","number":"7"},{"cardSuit":"Hearts","number":"8"},{"cardSuit":"Hearts","number":"9"},{"cardSuit":"Hearts","number":"10"},{"cardSuit":"Hearts","number":"J"},{"cardSuit":"Hearts","number":"Q"},{"cardSuit":"Hearts","number":"K"},{"cardSuit":"Diamonds","number":"A"},{"cardSuit":"Diamonds","number":"2"},{"cardSuit":"Diamonds","number":"3"},{"cardSuit":"Diamonds","number":"4"},{"cardSuit":"Diamonds","number":"5"},{"cardSuit":"Diamonds","number":"6"},{"cardSuit":"Diamonds","number":"7"},{"cardSuit":"Diamonds","number":"8"},{"cardSuit":"Diamonds","number":"9"},{"cardSuit":"Diamonds","number":"10"},{"cardSuit":"Diamonds","number":"J"},{"cardSuit":"Diamonds","number":"Q"},{"cardSuit":"Diamonds","number":"K"}];
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


	//call your fill_shuffle_array function here. Followed by a call to shuffleDeck with the return value of fill_shuffle_array as an argument.
 	var b = fill_shuffle_array();
	shuffleDeck(b);

}

//write your fill_shuffle_array function here
function fill_shuffle_array () {
	let Mas = [];
	for (var i = 0; i < 52; i++) {
		Mas.push(round(random(2, 71)));
	}
	return Mas;
}

/////////////////////DON'T CHANGE ANYTHING BELOW HERE/////////////////////////
function shuffleDeck(shuffleSeed)
{
		//shuffle the deck by rotating the cards location with the values in
		//shuffleSeed. Repeat this a random number of times between 20 and 50
    var shuffleIterations = parseInt(random(20, 50));
    for(var i = 0; i < shuffleIterations; i++)
    {
	   for (var j = 0; j < cards.length; j++)
	   {
		  var tempCard = cards.splice(j, 1);
          var newLoc = (j + shuffleSeed[j])%52;
          cards.splice(newLoc, 0, tempCard[0]);
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
		if (cards[i].marked)
		{
			drawCard(cards[i], 400 + i * 18, 230);
		}
		else
		{
			drawCard(cards[i], 400 + i * 18, 250);
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
			if (card.number == values[j] && card.cardSuit == suits[i])
			{
			//img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
				image(deck_img, j * 200, i * 300, 200, 300, x, y, 100, 150);
				break;
			}
		}
	}
}
