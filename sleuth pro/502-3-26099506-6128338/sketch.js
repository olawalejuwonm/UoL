/*

Officer: 6128338
CaseNum: 502-3-26099506-6128338

Case 502 - A donation - stage 4

This final document will seal the deal kid. C’mon kid. Let’s send these crooks down.

In setup, fill in the redactedText String variable by replacing the redacted words
with references to the two arrays containing the missing pieces.
you can do this by indexing the appropriate items from the respective arrays.

There are many possible ways of completing this task,
but you should ONLY use the following commands:

" + array[index].property[index] + "

*/

// you dont need to change these
var missingWords;
var redactedText;

// arrays containing the names needed to fill in the paragraph
var A_Evidence = [
{
	Detail_0: {Part_0: "fence", Part_1: "radiate", Part_2: "succeed", Part_3: "sail"}, 
	Detail_1: {Part_0: "mend", Part_1: "fence", Part_2: "hurry", Part_3: "charge"}, 
	Detail_2: {Part_0: "start", Part_1: "rejoice", Part_2: "bake", Part_3: "hurry"}
},
{
	Detail_0: {Part_0: "tug", Part_1: "tug", Part_2: "smile", Part_3: "meddle"}, 
	Detail_1: {Part_0: "you", Part_1: "protect", Part_2: "play", Part_3: "donation"}, 
	Detail_2: {Part_0: "ALGOL", Part_1: "start", Part_2: "rejoice", Part_3: "hurry"}
},
{
	Detail_0: {Part_0: "stuff", Part_1: "meddle", Part_2: "clip", Part_3: "meddle"}, 
	Detail_1: {Part_0: "start", Part_1: "meddle", Part_2: "sneeze", Part_3: "mend"}, 
	Detail_2: {Part_0: "stuff", Part_1: "meddle", Part_2: "plug", Part_3: "radiate"}
},
{
	Detail_0: {Part_0: "Governor Zuckerberg", Part_1: "charge", Part_2: "radiate", Part_3: "consider"}, 
	Detail_1: {Part_0: "protect", Part_1: "play", Part_2: "succeed", Part_3: "sneeze"}, 
	Detail_2: {Part_0: "meddle", Part_1: "mend", Part_2: "tug", Part_3: "smile"}
},
{
	Detail_0: {Part_0: "bake", Part_1: "bake", Part_2: "meddle", Part_3: "consider"}, 
	Detail_1: {Part_0: "sail", Part_1: "clip", Part_2: "stuff", Part_3: "start"}, 
	Detail_2: {Part_0: "Edsger", Part_1: "play", Part_2: "stuff", Part_3: "smile"}
}];
var B_Evidence = [
{
	Detail_0: {Part_0: "rejoice", Part_1: "consider", Part_2: "meddle", Part_3: "ALGOL fish wholesalers"}, 
	Detail_1: {Part_0: "charge", Part_1: "fence", Part_2: "smile", Part_3: "sneeze"}, 
	Detail_2: {Part_0: "meddle", Part_1: "sneeze", Part_2: "development", Part_3: "clip"}
},
{
	Detail_0: {Part_0: "consider", Part_1: "clip", Part_2: "rejoice", Part_3: "protect"}, 
	Detail_1: {Part_0: "plug", Part_1: "smile", Part_2: "sail", Part_3: "hurry"}, 
	Detail_2: {Part_0: "play", Part_1: "syndicate", Part_2: "stuff", Part_3: "hurry"}
},
{
	Detail_0: {Part_0: "radiate", Part_1: "smile", Part_2: "start", Part_3: "COBOL"}, 
	Detail_1: {Part_0: "mend", Part_1: "plug", Part_2: "rejoice", Part_3: "hurry"}, 
	Detail_2: {Part_0: "radiate", Part_1: "plug", Part_2: "smile", Part_3: "succeed"}
},
{
	Detail_0: {Part_0: "radiate", Part_1: "plug", Part_2: "succeed", Part_3: "tug"}, 
	Detail_1: {Part_0: "mend", Part_1: "tug", Part_2: "radiate", Part_3: "hurry"}, 
	Detail_2: {Part_0: "fence", Part_1: "plug", Part_2: "charge", Part_3: "$200,000"}
},
{
	Detail_0: {Part_0: "tug", Part_1: "rejoice", Part_2: "clip", Part_3: "charge"}, 
	Detail_1: {Part_0: "stuff", Part_1: "meddle", Part_2: "bake", Part_3: "meddle"}, 
	Detail_2: {Part_0: "hurry", Part_1: "smile", Part_2: "clip", Part_3: "hurry"}
}];

var myFont;
var backgroundImg;

function preload() {
  myFont = loadFont('SpecialElite.ttf');
  backgroundImg = loadImage("Background.png");
}

function setup()
{
  createCanvas(1280, 800);

  // replace all redacted words with the correct values from the data structures above

  missingWords = "Edsger, donation, $200,000, ALGOL, you, ALGOL fish wholesalers, syndicate, development, COBOL, Governor Zuckerberg";

  redactedText = "My dearest " + A_Evidence[4].Detail_2.Part_0  + ", I have just received your very generous " + A_Evidence[1].Detail_1.Part_3  + " of " + B_Evidence[3].Detail_2.Part_3  + ". Thank you. This will be invaluable to our campaign. " + A_Evidence[1].Detail_2.Part_0  + " is a stalwart part of the community and I look forward to continuing our strong partnership in the future. Regard the other matter, I think you will find that all has been satisfactorily dealt with. Just read this morning’s front pages. You can rest assured that no mention was made of " + A_Evidence[1].Detail_1.Part_0  + " or " + B_Evidence[0].Detail_0.Part_3  + " to the " + B_Evidence[1].Detail_2.Part_1  + ". Your new " + B_Evidence[0].Detail_2.Part_2  + " at the " + B_Evidence[2].Detail_0.Part_3  + " can now proceed without impediment. Yours sincerely, " + A_Evidence[3].Detail_0.Part_0  + "";

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
