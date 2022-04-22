/*

Officer: 6128338
CaseNum: 202-3-58998943-6128338

Case 202 - The case of Bob and Daisy - stage 4

Here’s the final letter from Daisy (aka. Woz). Decode it to uncover the
final details about Woz and Job’s dastardly plan.

Discover the hidden code by commenting out all text commands except
those which produce Dark Violet filled text with a Deep Sky Blue outline in Melissa font.
Only comment out text commands - leave fill & stroke, push and pop commands uncommented.

Use X11 colours. You can find a reference table at https://en.wikipedia.org/wiki/Web_colors.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

  // comments are all that are needed for this case.
  Do NOT add any new lines of code.

*/

var letterFont;

function preload()
{
	Ballpointprint = loadFont('Ballpointprint.ttf');
	Melissa = loadFont('Melissa.otf');
	Diggity = loadFont('Diggity.ttf');
	RonsFont = loadFont('RonsFont.ttf');
}

function setup()
{
	createCanvas(532,517);
	textSize(29);
}

function draw()
{
	background(255);

	fill(34,139,34);
	stroke(255,69,0);
	textFont(Melissa);
	//text("Perhaps", 159,179);
	push();
	fill(255,99,71);
	stroke(148,0,211);
	//text("If", 112,242);
	pop();
	fill(0,100,0);
	//text("a", 500,179);
	fill(255,165,0);
	stroke(0,128,128);
	textFont(Diggity);
	//text("can", 189,242);
	fill(0,0,255);
	stroke(255,0,0);
	textFont(Melissa);
	//text("these", 229,87);
	fill(139,0,0);
	stroke(0,128,128);
	textFont(Ballpointprint);
	//text("I", 12,87);
	push();
	fill(0,206,209);
	stroke(0,255,255);
	textFont(RonsFont);
	//text("The", 159,150);
	pop();
	stroke(165,42,42);
	textFont(RonsFont);
	//text("should", 276,179);
	fill(255,105,180);
	stroke(25,25,112);
	textFont(Ballpointprint);
	//text("Daisy", 16,392);
	fill(0,0,255);
	stroke(255,0,0);
	//text("da", 59,29);
	fill(199,21,133);
	stroke(210,105,30);
	//text("how", 313,118);
	fill(127,255,0);
	stroke(255,215,0);
	textFont(Melissa);
	//text("not", 239,118);
	fill(139,69,19);
	stroke(154,205,50);
	textFont(Ballpointprint);
	//text("?", 127,150);
	fill(32,178,170);
	stroke(184,134,11);
	textFont(Melissa);
	//text("silence.", 323,150);
	fill(100,149,237);
	stroke(154,205,50);
	textFont(Ballpointprint);
	//text("yours,", 113,334);
	fill(139,69,19);
	stroke(0,255,255);
	textFont(RonsFont);
	//text("you", 375,213);
	fill(30,144,255);
	stroke(0,0,139);
	textFont(Ballpointprint);
	//text("relationship", 17,118);
	fill(165,42,42);
	stroke(160,82,45);
	//text("can", 39,150);
	fill(0,0,205);
	stroke(107,142,35);
	textFont(Diggity);
	//text("?", 185,118);
	fill(65,105,225);
	stroke(165,42,42);
	textFont(RonsFont);
	//text("much", 363,118);
	fill(139,0,0);
	stroke(148,0,211);
	textFont(Ballpointprint);
	//text("so,", 136,242);
	fill(0,255,127);
	stroke(128,128,0);
	textFont(Diggity);
	//text("Are", 384,150);
	fill(220,20,60);
	stroke(0,255,127);
	textFont(RonsFont);
	//text("My", 16,29);
	fill(148,0,211);
	stroke(0,191,255);
	textFont(Melissa);
	text("guard", 11,276);
	text("take", 84,150);
	fill(218,165,32);
	stroke(255,0,255);
	textFont(Ballpointprint);
	//text("x", 92,392);
	fill(219,112,147);
	stroke(255,140,0);
	//text("?", 127,179);
	fill(0,100,0);
	stroke(34,139,34);
	textFont(RonsFont);
	//text("send", 231,242);
	fill(0,0,205);
	textFont(Diggity);
	//text("out.", 292,213);
	fill(222,184,135);
	stroke(165,42,42);
	//text("of", 486,213);
	fill(30,144,255);
	stroke(0,255,255);
	textFont(Ballpointprint);
	//text("for", 452,179);
	fill(139,69,19);
	stroke(107,142,35);
	//text("away", 391,179);
	fill(255,0,255);
	stroke(124,252,0);
	textFont(Diggity);
	//text("so", 453,242);
	fill(154,205,50);
	textFont(RonsFont);
	//text("?", 92,242);
	fill(127,255,0);
	stroke(0,191,255);
	textFont(Melissa);
	//text("I'm", 207,118);
	push();
	fill(128,0,128);
	stroke(128,0,0);
	textFont(RonsFont);
	//text("this", 214,213);
	pop();
	stroke(34,139,34);
	textFont(Ballpointprint);
	//text("we", 232,179);
	fill(160,82,45);
	stroke(255,255,0);
	textFont(Melissa);
	//text("longer", 123,87);
	fill(218,112,214);
	stroke(255,165,0);
	textFont(Diggity);
	//text("no", 92,87);
	push();
	fill(50,205,50);
	stroke(0,128,0);
	//text("go", 361,179);
	pop();
	stroke(0,100,0);
	textFont(RonsFont);
	//text("our", 465,87);
	push();
	fill(173,255,47);
	stroke(75,0,130);
	textFont(Ballpointprint);
	//text("cash.", 298,242);
	pop();
	fill(0,0,139);
	stroke(128,0,128);
	textFont(Melissa);
	//text("Is", 440,87);
	push();
	fill(240,230,140);
	stroke(139,0,0);
	textFont(RonsFont);
	//text("I", 14,150);
	pop();
	fill(154,205,50);
	stroke(75,0,130);
	//text("Are", 339,213);
	fill(72,209,204);
	stroke(124,252,0);
	//text("ed", 53,276);
	push();
	fill(0,255,255);
	stroke(0,191,255);
	textFont(Ballpointprint);
	//text("You", 359,242);
	pop();
	stroke(0,128,128);
	textFont(RonsFont);
	//text("sort", 153,213);
	push();
	fill(238,130,238);
	stroke(199,21,133);
	//text("more", 431,118);
	pop();
	fill(124,252,0);
	stroke(0,139,139);
	textFont(Diggity);
	//text("you", 432,150);
	fill(255,0,255);
	stroke(0,255,255);
	//text("delays.", 370,87);
	fill(100,149,237);
	stroke(128,128,0);
	textFont(RonsFont);
	//text("mon", 15,242);
	push();
	fill(0,128,0);
	stroke(127,255,0);
	textFont(Diggity);
	//text("are", 409,242);
	pop();
	fill(255,165,0);
	stroke(0,250,154);
	textFont(Diggity);
	//text("secrets,", 203,150);
	push();
	fill(0,0,205);
	stroke(0,0,139);
	textFont(Ballpointprint);
	//text("break", 20,213);
	pop();
	stroke(0,255,255);
	//text("iding", 50,179);
	push();
	fill(186,85,211);
	stroke(0,250,154);
	//text("avo", 18,179);
	pop();
	fill(255,69,0);
	stroke(0,0,139);
	textFont(Melissa);
	//text("sure", 272,118);
	fill(184,134,11);
	stroke(220,20,60);
	textFont(Diggity);
	//text("all", 265,213);
	fill(139,0,139);
	stroke(0,206,209);
	textFont(RonsFont);
	//text("and", 95,213);
	push();
	fill(106,90,205);
	stroke(255,255,0);
	textFont(Melissa);
	//text("I", 174,242);
	pop();
	fill(218,165,32);
	stroke(139,0,139);
	//text("ey", 62,242);
	fill(233,150,122);
	stroke(255,165,0);
	textFont(Melissa);
	//text("me", 97,179);
	fill(0,255,255);
	stroke(139,69,19);
	textFont(Diggity);
	//text("continual", 282,87);
	fill(148,0,211);
	stroke(0,191,255);
	textFont(Melissa);
	text("safe", 141,118);
	fill(0,0,255);
	stroke(127,255,0);
	textFont(Ballpointprint);
	//text("short", 425,213);
	fill(255,215,0);
	stroke(139,0,0);
	textFont(Diggity);
	//text("Bob,", 143,29);
	fill(0,0,255);
	stroke(50,205,50);
	textFont(RonsFont);
	//text("Forever", 16,334);
	push();
	fill(178,34,34);
	stroke(160,82,45);
	textFont(Ballpointprint);
	//text("sometimes.", 78,276);
	pop();
	fill(148,0,211);
	stroke(0,191,255);
	textFont(Melissa);
	text("ignore", 176,87);
	text("the", 289,150);
	fill(255,215,0);
	stroke(255,0,0);
	textFont(Ballpointprint);
	//text("can", 47,87);
	fill(127,255,212);
	stroke(148,0,211);
	//text("rling", 84,29);



}
