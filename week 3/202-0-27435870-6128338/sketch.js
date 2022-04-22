/*

Officer: 6128338
CaseNum: 202-0-27435870-6128338

Case 202 - The case of Bob and Daisy - stage 1

That pair of notorious criminals Woz and Jobs are up to no good again.
I’ve intercepted letters sent between them. It seems that they are
communicating through an ingenious code in which they masquerade as
besotted lovers, Daisy and Bob. I need you crack their code and determine
the details of their next heist so that we can catch them in the act.

Discover the hidden code by commenting out all text commands except
those which produce Tomato text. Only comment out text commands.
Leave fill commands uncommented.

Use X11 colours. You can find a reference table at https://en.wikipedia.org/wiki/Web_colors.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

  // comments are all that are needed for this case.
  Do NOT add any new lines of code.

*/

var letterFont;

function preload()
{
	letterFont = loadFont('Ballpointprint.ttf');
}

function setup()
{
	createCanvas(564,613);
	textFont(letterFont);
	textSize(29);
}

function draw()
{
	background(255);

	fill(0,255,0);
	//text("true", 336,181);
	fill(244,164,96);
	//text("ne", 217,216);
	fill(139,0,139);
	//text("k", 149,476);
	fill(184,134,11);
	//text("like", 249,247);
	fill(138,43,226);
	//text("?", 366,87);
	fill(173,216,230);
	//text("I", 272,120);
	//text("in", 262,216);
	fill(255,69,0);
	//text("lovely", 430,120);
	//text("I", 502,216);
	fill(173,216,230);
	//text("think", 79,389);
	fill(0,0,128);
	//text("that", 10,181);
	//text("I", 386,316);
	//text("from", 198,149);
	fill(152,251,152);
	//text("our", 283,353);
	fill(128,128,0);
	//text("I", 475,353);
	//text("you", 77,181);
	//text("ha", 197,281);
	fill(72,209,204);
	//text("I", 94,149);
	fill(148,0,211);
	//text("Love", 9,476);
	//text("green", 389,389);
	fill(186,85,211);
	//text("fa", 14,149);
	fill(139,69,19);
	//text("You", 95,418);
	fill(186,85,211);
	//text("ce,", 42,149);
	fill(123,104,238);
	//text("darling,", 271,389);
	//text("of", 104,281);
	fill(176,224,230);
	//text("I", 281,281);
	fill(160,82,45);
	//text("the", 297,216);
	//text("your", 89,247);
	fill(240,230,140);
	//text("confession", 203,87);
	//text("are", 154,418);
	//text("day", 359,418);
	fill(255,69,0);
	//text("moment", 75,120);
	fill(135,206,250);
	//text("must", 299,281);
	fill(0,250,154);
	//text("my", 219,181);
	fill(128,0,128);
	//text("only", 9,389);
	fill(0,255,0);
	//text("of", 160,389);
	fill(128,0,0);
	//text("Daisy,", 161,29);
	fill(0,0,128);
	//text("be", 380,281);
	fill(240,128,128);
	//text("It", 483,181);
	fill(233,150,122);
	//text("rp.", 233,281);
	fill(255,99,71);
	text("chosen", 13,353);
	text("May", 9,87);
	text("date", 401,353);
	fill(178,34,34);
	//text("one", 273,181);
	fill(135,206,235);
	//text("Ever", 125,353);
	fill(139,69,19);
	//text("April.", 456,418);
	fill(0,100,0);
	//text("when", 13,216);
	fill(0,0,205);
	//text("makea", 96,87);
	fill(72,209,204);
	//text("saw", 290,120);
	//text("ive", 267,316);
	fill(32,178,170);
	//text("luckiest", 13,316);
	fill(218,112,214);
	//text("the", 308,247);
	fill(139,0,0);
	//text("since", 199,353);
	fill(255,215,0);
	//text("my", 210,418);
	fill(127,255,0);
	// text("that", 205,120);
	fill(222,184,135);
	//text("the", 141,281);
	fill(65,105,225);
	//text("From", 390,87);
	fill(250,128,114);
	//text("can", 493,353);
	fill(233,150,122);
	//text("the", 471,87);
	fill(173,255,47);
	//text("that", 435,216);
	fill(210,105,30);
	//text("your", 459,316);
	fill(148,0,211);
	//text("blessed", 364,247);
	fill(144,238,144);
	//text("music", 10,281);
	//text("eyes.", 9,418);
	fill(139,0,0);
	//text("that", 319,316);
	//text("I", 100,216);
	//text("seconds", 424,149);
	fill(148,0,211);
	//text("th", 274,149);
	fill(127,255,212);
	//text("x", 74,534);
	fill(0,0,139);
	//text("sunny", 264,418);
	//text("your", 197,389);
	fill(75,0,130);
	//text("in", 421,418);
	//text("were", 139,181);
	fill(219,112,147);
	//text("voice", 163,247);
	fill(165,42,42);
	//text("few", 363,149);
	fill(153,50,204);
	//text("Bob", 9,534);
	fill(64,224,208);
	//text("al", 241,316);
	fill(0,128,0);
	//text("quiet", 353,216);
	//text("am", 118,216);
	fill(173,255,47);
	//text("your", 356,120);
	fill(75,0,130);
	//text("the", 425,281);
	fill(240,128,128);
	//text("alo", 173,216);
	fill(255,127,80);
	// text("sses,", 174,476);
	fill(75,0,130);
	//text("lovely", 66,29);
	fill(34,139,34);
	//text("and", 86,476);
	fill(238,232,170);
	//text("am", 404,316);
	//text("I", 78,87);
	fill(107,142,35);
	//text("ose", 303,149);
	//text("Oh", 16,29);
	//text("i", 166,476);
	fill(0,139,139);
	//text("knew", 112,149);
	fill(0,0,139);
	//text("hear", 14,247);
	fill(220,20,60);
	//text("person", 133,316);
	fill(255,99,71);
	text("first", 10,120);
	fill(255,0,255);
	// text("last", 340,353);
	fill(0,139,139);
	//text("love.", 404,181);
	fill(255,99,71);
	text("is", 512,181);



}
