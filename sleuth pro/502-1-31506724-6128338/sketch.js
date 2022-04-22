/*

Officer: 6128338
CaseNum: 502-1-31506724-6128338

Case 502 - A delicate matter - stage 2

We’re hot on the trail kid, and another document has come my way.
It’s a little more tricky to decipher but I know you can do it.

In setup, fill in the redactedText String variable by replacing the redacted words
with references to the two arrays containing the missing pieces.
you can do this by indexing the appropriate items from the respective arrays.

There are many possible ways of completing this task,
but you should ONLY use the following commands:

" + Array[index].property + "

*/

// you dont need to change these
var missingWords;
var redactedText;

// arrays containing the names needed to fill in the paragraph
var excerptA = [
	{element0: "meddle", element1: "start", element2: "succeed"}, 
	{element0: "clip", element1: "succeed", element2: "succeed"}, 
	{element0: "Edsger", element1: "sneeze", element2: "stuff"}, 
	{element0: "bake", element1: "protect", element2: "bake"}, 
	{element0: "meddle", element1: "mend", element2: "Governor Zuckerberg"}, 
	{element0: "bake", element1: "fence", element2: "consider"}, 
	{element0: "sail", element1: "meddle", element2: "syndicate"}, 
	{element0: "protect", element1: "charge", element2: "plug"}, 
	{element0: "consider", element1: "smile", element2: "delicate"}, 
	{element0: "fence", element1: "start", element2: "she has"}
];

var excerptB = [
	{element0: "clip", element1: "sail", element2: "stuff"}, 
	{element0: "mend", element1: "capital", element2: "fence"}, 
	{element0: "start", element1: "a donation", element2: "bake"}, 
	{element0: "sneeze", element1: "play", element2: "COBOL"}, 
	{element0: "fence", element1: "radiate", element2: "fence"}, 
	{element0: "protect", element1: "bake", element2: "fence"}, 
	{element0: "Hopper’s", element1: "sail", element2: "radiate"}, 
	{element0: "sneeze", element1: "sneeze", element2: "romantic"}, 
	{element0: "succeed", element1: "radiate", element2: "sail"}, 
	{element0: "protect", element1: "plug", element2: "fence"}
];

var myFont;
var backgroundImg;

function preload() {
  myFont = loadFont('SpecialElite.ttf');
  backgroundImg = loadImage("Background.png");
}

function setup()
{
  createCanvas(1280,800);

  // replace all redacted words with the correct values from the data structures above

  missingWords = "Edsger, Hopper’s, she has, romantic, COBOL, syndicate, delicate, capital, a donation, Governor Zuckerberg";

  redactedText = "My dearest " + excerptA[2].element0 + ", Please don’t doubt my sincerity when I say that I hadn’t the faintest idea about " + excerptB[6].element0  + " intervention. I suspect that " + excerptA[9].element2 + " a " + excerptB[7].element2 +" interest at the " + excerptB[3].element2 +". I and the " + excerptA[6].element2  +" appreciate your many contributions over the years. However, this is a most " + excerptA[8].element2 +" matter which would require significant " + excerptB[1].element1 +" for me to deal with it satisfactorily. I would not be so crude as to suggest a sum but perhaps " + excerptB[2].element1 +" to my forthcoming  campaign would help. Yours sincerely, " + excerptA[4].element2 +"";

}

function draw()
{
  // you don't need to change this
  image(backgroundImg, 0, 0);
  stroke(0);
  strokeWeight(3);
  line(width/2, 10, width/2, height - 10);
  noStroke();
  textFont(myFont);
  textSize(14);
  text(redactedText, 30, 100, 580, 600);
  text(missingWords, 670, 100, 580, 600);
}
