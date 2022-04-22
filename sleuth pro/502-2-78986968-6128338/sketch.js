/*

Officer: 6128338
CaseNum: 502-2-78986968-6128338

Case 502 - Out of the picture - stage 3

Yet another document has come my way. This one is even more tricky to decipher.
The Governor must really have something to hide.

In setup, fill in the redactedText String variable by replacing the redacted words
with references to the two arrays containing the missing pieces.
you can do this by indexing the appropriate items from the respective arrays.

There are many possible ways of completing this task,
but you should ONLY use the following commands:

" + object.property[index] + "

*/

// you dont need to change these
var missingWords;
var redactedText;

// arrays containing the names needed to fill in the paragraph
var archiveA = {
	bit0: [ "mend", "plug", "plug"], 
	bit1: [ "hit", "plug", "bake"], 
	bit2: [ "start", "fence", "Governor Zuckerberg"], 
	bit3: [ "clip", "protect", "consider"], 
	bit4: [ "syndicate", "ALGOL", "radiate"], 
	bit5: [ "Hopper", "sneeze", "clip"], 
	bit6: [ "sneeze", "bake", "sneeze"], 
	bit7: [ "meddle", "protect", "protect"], 
	bit8: [ "rejoice", "stuff", "smile"], 
	bit9: [ "mend", "stuff", "succeed"]
};

var archiveB = {
	bit0: [ "smile", "consider", "succeed"], 
	bit1: [ "play", "smile", "consider"], 
	bit2: [ "sneeze", "start", "rejoice"], 
	bit3: [ "rejoice", "Edsger", "smile"], 
	bit4: [ "protect", "a donation", "stuff"], 
	bit5: [ "sail", "bake", "$200,000"], 
	bit6: [ "fence", "clip", "consider"], 
	bit7: [ "sail", "clip", "campaign"], 
	bit8: [ "play", "play", "fence"], 
	bit9: [ "meddle", "hurry", "sneeze"]
};

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

  missingWords = "Governor Zuckerberg, a donation, campaign, $200,000, Hopper, syndicate, hit, ALGOL, Edsger";

  redactedText = "Dear " +archiveA.bit2[2] + ", I am sure that something could be worked out in terms of " +archiveB.bit4[1] + " for your " +archiveB.bit7[2] + ". How does " +archiveB.bit5[2] + " sound ? I am afraid I will need to be so crude as to spell out what ALGOL requires in return. " +archiveA.bit5[0] + "needs to be out of the picture. She’s caused enough trouble. Get the " +archiveA.bit4[0] + " to organise the " +archiveA.bit1[0] + " but I’d prefer it you don’t mention me or " +archiveA.bit4[1] + ". I owe them enough favours already. Your old friend, " + archiveB.bit3[1] + "";

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
