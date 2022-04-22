/*
802 - The case of Monte Carlo
Stage 1 - Card sharks

Officer: 6128338
CaseNum: 802-0-66871047-6128338

Time to pull on your best threads kid, grab a martini prepare for an evening at the Monte Carlo casino.

Our targets for this op are a gang of high rolling statisticians. They maintain an air of respectability as the board of Rossling Polling, a company used by the shady politicians of Console City to make them seem more popular than they really are. They’re prepared to give up the dirt on their techniques if we can beat them in a game of 5 card stud poker. We can’t go in and gamble away Sleuth & Co’s cash reserves. There isn’t that much green in the evidence room to compete with these card sharks. Let’s stack the odds in our favour. First let’s learn how to mark cards.

* Write a function called  pickCards.
* Using a for loop to set the marked property of the playingCards array elements to true when the suit is Clubs or the value is 3
* Call the function from within setup

*/

var playingCards = [{"marked":false,"cardSuit":"Spades","no":"A"},{"marked":false,"cardSuit":"Spades","no":"2"},{"marked":false,"cardSuit":"Spades","no":"3"},{"marked":false,"cardSuit":"Spades","no":"4"},{"marked":false,"cardSuit":"Spades","no":"5"},{"marked":false,"cardSuit":"Spades","no":"6"},{"marked":false,"cardSuit":"Spades","no":"7"},{"marked":false,"cardSuit":"Spades","no":"8"},{"marked":false,"cardSuit":"Spades","no":"9"},{"marked":false,"cardSuit":"Spades","no":"10"},{"marked":false,"cardSuit":"Spades","no":"J"},{"marked":false,"cardSuit":"Spades","no":"Q"},{"marked":false,"cardSuit":"Spades","no":"K"},{"marked":false,"cardSuit":"Clubs","no":"A"},{"marked":false,"cardSuit":"Clubs","no":"2"},{"marked":false,"cardSuit":"Clubs","no":"3"},{"marked":false,"cardSuit":"Clubs","no":"4"},{"marked":false,"cardSuit":"Clubs","no":"5"},{"marked":false,"cardSuit":"Clubs","no":"6"},{"marked":false,"cardSuit":"Clubs","no":"7"},{"marked":false,"cardSuit":"Clubs","no":"8"},{"marked":false,"cardSuit":"Clubs","no":"9"},{"marked":false,"cardSuit":"Clubs","no":"10"},{"marked":false,"cardSuit":"Clubs","no":"J"},{"marked":false,"cardSuit":"Clubs","no":"Q"},{"marked":false,"cardSuit":"Clubs","no":"K"},{"marked":false,"cardSuit":"Hearts","no":"A"},{"marked":false,"cardSuit":"Hearts","no":"2"},{"marked":false,"cardSuit":"Hearts","no":"3"},{"marked":false,"cardSuit":"Hearts","no":"4"},{"marked":false,"cardSuit":"Hearts","no":"5"},{"marked":false,"cardSuit":"Hearts","no":"6"},{"marked":false,"cardSuit":"Hearts","no":"7"},{"marked":false,"cardSuit":"Hearts","no":"8"},{"marked":false,"cardSuit":"Hearts","no":"9"},{"marked":false,"cardSuit":"Hearts","no":"10"},{"marked":false,"cardSuit":"Hearts","no":"J"},{"marked":false,"cardSuit":"Hearts","no":"Q"},{"marked":false,"cardSuit":"Hearts","no":"K"},{"marked":false,"cardSuit":"Diamonds","no":"A"},{"marked":false,"cardSuit":"Diamonds","no":"2"},{"marked":false,"cardSuit":"Diamonds","no":"3"},{"marked":false,"cardSuit":"Diamonds","no":"4"},{"marked":false,"cardSuit":"Diamonds","no":"5"},{"marked":false,"cardSuit":"Diamonds","no":"6"},{"marked":false,"cardSuit":"Diamonds","no":"7"},{"marked":false,"cardSuit":"Diamonds","no":"8"},{"marked":false,"cardSuit":"Diamonds","no":"9"},{"marked":false,"cardSuit":"Diamonds","no":"10"},{"marked":false,"cardSuit":"Diamonds","no":"J"},{"marked":false,"cardSuit":"Diamonds","no":"Q"},{"marked":false,"cardSuit":"Diamonds","no":"K"}];
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


	//call your pickCards function here
	pickCards();
}

//write your pickCards function here
function pickCards() {
	for (var i = 0; i < playingCards.length; i++) {
		if (playingCards[i].cardSuit == "Clubs" || playingCards[i].no == 3) {
			playingCards[i].marked = true;
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
			if (card.no == values[j] && card.cardSuit == suits[i])
			{
			//img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
				image(deck_img, j * 200, i * 300, 200, 300, x, y, 100, 150);
				break;
			}
		}
	}
}
