/*

Officer: 6128338
CaseNum: 202-1-69634857-6128338

Case 202 - The case of Bob and Daisy - stage 2

Here’s another letter kid. This time it’s from Daisy (aka. Woz).
Decode it to uncover more about Woz and Job’s dastardly plan.

Discover the hidden code by commenting out all text commands except
those which produce Saddle Brown filled text with a Midnight Blue outline.
Only comment out text commands - leave fill & stroke commands uncommented.

Use X11 colours. You can find a reference table at https://en.wikipedia.org/wiki/Web_colors.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

  // comments are all that are needed for this case.
  Do NOT add any new lines of code.

*/

var letterFont;

function preload()
{
	letterFont = loadFont('Melissa.otf');
}

function setup()
{
	createCanvas(621,709);
	textFont(letterFont);
	textSize(34);
}

function draw()
{
	background(255);

	fill(135,206,235);
	stroke(0,139,139);
	//text("much", 363,396);
	fill(255,140,0);
	stroke(0,0,205);
	//text("you", 334,102);
	fill(178,34,34);
	stroke(128,0,0);
	//text("I", 97,102);
	fill(244,164,96);
	stroke(255,69,0);
	//text("My", 8,34);
	fill(255,140,0);
	stroke(0,0,255);
	//text("te.", 221,396);
	fill(238,232,170);
	stroke(199,21,133);
	//text("my", 130,359);
	fill(0,206,209);
	stroke(255,0,255);
	//text("ing", 270,102);
	fill(124,252,0);
	stroke(124,252,0);
	//text("When", 17,477);
	fill(238,130,238);
	stroke(0,128,0);
	//text("the", 13,250);
	fill(255,0,255);
	stroke(160,82,45);
	//text("I", 395,176);
	fill(25,25,112);
	stroke(124,252,0);
	//text("How", 114,138);
	fill(199,21,133);
	stroke(255,255,0);
	//text("it", 485,138);
	fill(255,105,180);
	stroke(0,128,128);
	//text("on", 352,285);
	fill(0,255,255);
	stroke(255,255,0);
	//text("will", 127,477);
	fill(210,105,30);
	stroke(0,0,205);
	//text("How", 11,102);
	fill(255,0,255);
	stroke(0,255,255);
	//text("this", 275,359);
	fill(255,215,0);
	stroke(0,255,255);
	//text("Bob,", 198,34);
	fill(128,128,0);
	stroke(139,0,139);
	//text("aga", 427,477);
	fill(154,205,50);
	stroke(0,128,0);
	//text("long", 416,176);
	stroke(218,165,32);
	//text("your", 406,285);
	fill(244,164,96);
	stroke(124,252,0);
	//text("nths", 361,138);
	fill(240,128,128);
	stroke(0,0,139);
	//text("Fo", 11,545);
	fill(255,0,0);
	stroke(0,139,139);
	//text("without", 471,322);
	fill(0,206,209);
	stroke(255,215,0);
	//text("last", 175,176);
	fill(154,205,50);
	stroke(0,0,255);
	//text("in", 173,215);
	fill(240,230,140);
	stroke(154,205,50);
	//text("hold", 14,215);
	fill(255,105,180);
	stroke(0,139,139);
	//text("in", 491,477);
	fill(160,82,45);
	stroke(128,128,0);
	//text("in", 233,322);
	fill(0,191,255);
	stroke(128,0,0);
	//text("my", 215,215);
	fill(139,69,19);
	stroke(178,34,34);
	//text("at", 85,359);
	fill(0,0,255);
	stroke(160,82,45);
	//text("miss", 118,102);
	fill(218,112,214);
	stroke(0,0,139);
	//text("ar", 279,215);
	fill(184,134,11);
	stroke(220,20,60);
	//text("I", 67,435);
	fill(233,150,122);
	stroke(139,0,139);
	//text("banki", 203,285);
	fill(64,224,208);
	stroke(255,215,0);
	//text("the", 275,322);
	fill(65,105,225);
	stroke(25,25,112);
	//text("Even", 138,322);
	fill(153,50,204);
	stroke(255,0,255);
	//text("have", 88,435);
	fill(210,105,30);
	stroke(139,0,0);
	//text("r", 51,545);
	fill(0,206,209);
	stroke(255,255,0);
	//text("up", 505,215);
	fill(135,206,250);
	stroke(199,21,133);
	//text("ging", 450,435);
	fill(255,105,180);
	stroke(46,139,87);
	//text("since", 15,176);
	fill(0,255,127);
	stroke(139,0,0);
	//text("mo", 307,138);
	fill(148,0,211);
	stroke(0,250,154);
	//text("many", 200,138);
	fill(255,127,80);
	stroke(0,255,255);
	//text("I", 334,250);
	fill(199,21,133);
	stroke(153,50,204);
	//text("spring,", 342,322);
	fill(173,255,47);
	stroke(124,252,0);
	//text("desola", 109,396);
	fill(128,0,0);
	stroke(218,165,32);
	//text("kissed", 247,176);
	fill(255,140,0);
	stroke(0,128,0);
	//text("s,", 229,545);
	fill(0,0,255);
	stroke(127,255,0);
	//text("How", 277,396);
	fill(178,34,34);
	stroke(128,128,0);
	//text("I'm", 140,285);
	fill(0,128,0);
	stroke(0,191,255);
	//text("be", 253,477);
	fill(255,99,71);
	stroke(220,20,60);
	//text("ms.", 314,215);
	fill(199,21,133);
	stroke(0,191,255);
	//text("of", 11,285);
	fill(139,0,139);
	stroke(199,21,133);
	//text("darling", 68,34);
	fill(64,224,208);
	stroke(0,255,255);
	//text("this", 325,435);
	fill(147,112,219);
	stroke(210,105,30);
	//text("to", 183,435);
	fill(233,150,122);
	stroke(128,0,128);
	//text("you.", 55,285);
	fill(0,255,0);
	stroke(178,34,34);
	//text("I", 387,215);
	fill(0,128,128);
	stroke(0,250,154);
	//text("you", 11,359);
	fill(153,50,204);
	stroke(50,205,50);
	//text("ng", 297,285);
	fill(238,232,170);
	stroke(107,142,35);
	//text("around", 408,102);
	fill(127,255,212);
	stroke(255,165,0);
	//text("think", 428,250);
	fill(72,209,204);
	stroke(139,69,19);
	//text("?", 533,477);
	fill(154,205,50);
	stroke(0,139,139);
	//text("you", 99,215);
	fill(238,232,170);
	stroke(127,255,0);
	//text("night", 80,250);
	fill(72,209,204);
	stroke(0,139,139);
	//text("sky,", 179,250);
	fill(128,0,0);
	stroke(255,165,0);
	//text("ever", 65,545);
	fill(255,255,0);
	stroke(199,21,133);
	//text("to", 501,176);
	fill(0,0,128);
	//text("do", 13,435);
	fill(123,104,238);
	stroke(128,128,0);
	//text("?", 366,176);
	fill(106,90,205);
	stroke(127,255,0);
	//text("united", 307,477);
	fill(255,127,80);
	stroke(255,0,255);
	//text("feels", 17,396);
	fill(139,69,19);
	stroke(25,25,112);
	text("small", 348,359);
	text("store", 228,435);
	text("side", 194,359);
	fill(173,216,230);
	stroke(128,0,128);
	//text("hav", 207,102);
	fill(128,0,128);
	stroke(178,34,34);
	//text("only", 525,250);
	fill(244,164,96);
	stroke(32,178,170);
	//text("can", 355,250);
	fill(147,112,219);
	stroke(139,69,19);
	//text("and", 258,250);
	fill(139,69,19);
	stroke(25,25,112);
	text("is", 447,138);
	text("swift", 494,285);
	text("place", 11,138);
	text("the", 540,102);
	fill(0,0,128);
	stroke(255,0,0);
	//text("Daisy", 11,613);
	fill(139,69,19);
	stroke(220,20,60);
	//text("we", 115,176);
	fill(173,216,230);
	stroke(0,0,205);
	//text("longer", 470,396);
	fill(240,230,140);
	stroke(255,0,255);
	//text("x", 116,613);
	fill(219,112,147);
	stroke(34,139,34);
	//text("return.", 12,322);
	fill(148,0,211);
	stroke(255,0,0);
	//text("?", 536,435);
	fill(0,206,209);
	stroke(0,250,154);
	//text("at", 560,215);
	fill(139,69,19);
	stroke(25,25,112);
	text("town", 449,359);
	fill(255,99,71);
	stroke(153,50,204);
	//text("we", 193,477);
	fill(210,105,30);
	stroke(139,0,139);
	//text("stare", 408,215);
	fill(255,140,0);
	stroke(154,205,50);
	//text("your", 152,545);
	fill(0,0,128);
	stroke(107,142,35);
	//text("lon", 398,435);



}
