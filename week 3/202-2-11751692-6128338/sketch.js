/*

Officer: 6128338
CaseNum: 202-2-11751692-6128338

Case 202 - The case of Bob and Daisy - stage 3

Wow these two like to ham it up. Here’s the next letter. This time it’s from Bob (aka. Jobs).
I need you to decode it to uncover more details about their plan.

Discover the hidden code by commenting out all text commands except
those which produce Turquoise filled text in Melissa font.
Only comment out text commands - leave fill & stroke commands uncommented.

Use X11 colours. You can find a reference table at https://en.wikipedia.org/wiki/Web_colors.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

  // comments are all that are needed for this case.
  Do NOT add any new lines of code.

*/

var Ballpointprint;
var Melissa;
var Diggity;
var RonsFont;


function preload()
{
	Ballpointprint = loadFont('Ballpointprint.ttf');
	Melissa = loadFont('Melissa.otf');
	Diggity = loadFont('Diggity.ttf');
	RonsFont = loadFont('RonsFont.ttf');
}

function setup()
{
	createCanvas(552,500);
	textSize(25);
}

function draw()
{
	background(255);

	fill(25,25,112);
	textFont(Ballpointprint);
	//text("away", 480,105);
	fill(0,128,128);
	textFont(Diggity);
	//text("shall", 217,75);
	fill(106,90,205);
	textFont(Ballpointprint);
	//text("from", 17,136);
	fill(124,252,0);
	//text("playing", 314,225);
	fill(64,224,208);
	//text("we", 450,197);
	textFont(Melissa);
	text("at", 471,136);
	text("wine", 220,225);
	text("bar", 257,225);
	fill(255,140,0);
	textFont(Diggity);
	//text("car", 443,256);
	fill(176,224,230);
	textFont(RonsFont);
	//text("every", 13,168);
	fill(240,230,140);
	//text("the", 102,197);
	textFont(Ballpointprint);
	//text("days", 303,105);
	fill(0,0,205);
	textFont(Diggity);
	//text("in", 390,256);
	fill(184,134,11);
	textFont(Melissa);
	//text("the", 275,105);
	fill(250,128,114);
	textFont(Diggity);
	//text("We", 144,136);
	fill(160,82,45);
	textFont(Ballpointprint);
	//text("x", 52,381);
	fill(123,104,238);
	textFont(Melissa);
	//text("keep", 339,75);
	fill(173,216,230);
	//text("I", 162,168);
	fill(244,164,96);
	textFont(Diggity);
	//text("in", 384,168);
	fill(50,205,50);
	textFont(Ballpointprint);
	//text("lovely", 46,25);
	fill(210,105,30);
	//text("of", 244,168);
	textFont(Melissa);
	//text("right", 481,256);
	fill(0,255,255);
	//text("get", 452,105);
	textFont(Ballpointprint);
	//text("devotion", 334,136);
	fill(255,0,255);
	textFont(Diggity);
	//text("broad", 215,136);
	fill(135,206,250);
	textFont(Ballpointprint);
	//text("run", 93,281);
	fill(72,209,204);
	//text("am", 172,256);
	fill(0,0,205);
	textFont(Melissa);
	//text("until", 358,105);
	fill(0,255,127);
	textFont(Ballpointprint);
	//text("our", 376,75);
	fill(50,205,50);
	textFont(Melissa);
	//text("all", 451,136);
	//text("down", 235,105);
	fill(255,255,0);
	//text("jump", 351,256);
	fill(250,128,114);
	textFont(Ballpointprint);
	//text("at", 19,256);
	fill(173,216,230);
	//text("Soon", 396,197);
	fill(238,232,170);
	textFont(Melissa);
	//text("at", 145,225);
	fill(147,112,219);
	textFont(RonsFont);
	//text("our", 278,168);
	fill(152,251,152);
	textFont(Diggity);
	//text("and", 54,281);
	fill(255,0,255);
	textFont(RonsFont);
	//text("to", 418,136);
	fill(32,178,170);
	//text("by", 72,197);
	fill(147,112,219);
	textFont(Diggity);
	//text("Love", 11,331);
	fill(255,99,71);
	//text("too", 15,105);
	fill(100,149,237);
	textFont(Melissa);
	//text("and", 285,225);
	//text("kisses,", 101,331);
	fill(0,255,127);
	textFont(Diggity);
	//text("Do", 263,197);
	//text("longer", 286,75);
	fill(25,25,112);
	textFont(Melissa);
	//text("opportunity.", 74,168);
	fill(0,206,209);
	//text("Daisy,", 108,25);
	fill(64,224,208);
	text("Jerrys", 166,225);
	text("hidden", 444,75);
	text("gun", 113,105);
	fill(173,255,47);
	textFont(Diggity);
	//text("this.", 102,136);
	fill(240,230,140);
	textFont(Melissa);
	//text("will", 489,197);
	fill(255,255,0);
	textFont(RonsFont);
	//text("counting", 140,105);
	fill(107,142,35);
	textFont(Ballpointprint);
	//text("dream", 175,168);
	fill(127,255,212);
	textFont(RonsFont);
	//text("Oh", 14,25);
	fill(123,104,238);
	//text("I", 390,105);
	fill(65,105,225);
	textFont(Melissa);
	//text("love", 412,75);
	fill(0,0,128);
	textFont(Diggity);
	//text("my", 56,75);
	fill(184,134,11);
	//text("back", 131,281);
	fill(0,0,205);
	textFont(Ballpointprint);
	//text("we", 178,75);
	fill(152,251,152);
	textFont(Melissa);
	//text("arcade.", 86,256);
	fill(219,112,147);
	textFont(RonsFont);
	//text("all", 71,136);
	fill(32,178,170);
	textFont(Diggity);
	//text("you.", 207,281);
	fill(0,128,0);
	textFont(Melissa);
	//text("our", 307,136);
	fill(135,206,250);
	textFont(Diggity);
	//text("cast", 260,136);
	fill(220,20,60);
	textFont(RonsFont);
	//text("return", 88,75);
	fill(154,205,50);
	textFont(Ballpointprint);
	//text("Upon", 6,75);
	fill(135,206,235);
	//text("and", 56,331);
	fill(152,251,152);
	//text("I", 491,75);
	fill(0,139,139);
	textFont(Melissa);
	//text("despair", 330,197);
	fill(154,205,50);
	textFont(RonsFont);
	//text("Bob", 6,381);
	fill(152,251,152);
	textFont(Ballpointprint);
	//text("can", 412,105);
	fill(139,0,0);
	textFont(Diggity);
	//text("to", 323,256);
	fill(148,0,211);
	textFont(RonsFont);
	//text("old", 142,197);
	fill(100,149,237);
	textFont(Diggity);
	//text("to", 179,281);
	fill(220,20,60);
	//text("woods", 443,168);
	fill(186,85,211);
	textFont(Melissa);
	//text("and", 503,168);
	fill(139,0,139);
	textFont(Diggity);
	//text("not", 294,197);
	fill(75,0,130);
	textFont(Ballpointprint);
	//text("raising", 21,225);
	fill(139,0,139);
	textFont(Diggity);
	//text("the", 405,168);
	fill(186,85,211);
	textFont(Melissa);
	//text("be", 99,105);
	fill(255,140,0);
	//text("shooters", 386,225);
	fill(255,255,0);
	textFont(Ballpointprint);
	//text("tempted", 237,256);
	fill(218,165,32);
	//text("I", 141,256);
	fill(100,149,237);
	textFont(RonsFont);
	//text("down", 455,225);
	fill(220,20,60);
	textFont(Melissa);
	//text("be", 518,197);
	fill(135,206,235);
	//text("!", 387,197);
	fill(199,21,133);
	textFont(Diggity);
	//text("the", 48,256);
	fill(0,100,0);
	textFont(Ballpointprint);
	//text("walks", 327,168);
	textFont(RonsFont);
	//text("so", 208,256);
	fill(0,128,0);
	textFont(Melissa);
	//text("toasts", 91,225);
	fill(154,205,50);
	textFont(Diggity);
	//text("no", 259,75);
	fill(199,21,133);
	//text("now", 12,281);
	fill(218,165,32);
	textFont(RonsFont);
	//text("down", 11,197);
	fill(30,144,255);
	textFont(Diggity);
	//text("my", 411,256);
	fill(160,82,45);
	textFont(Melissa);
	//text("shall", 178,136);
	textFont(Diggity);
	//text("have", 51,105);
	fill(222,184,135);
	textFont(Ballpointprint);
	//text("harbour.", 184,197);



}
