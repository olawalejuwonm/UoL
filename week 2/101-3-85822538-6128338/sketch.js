/*

Officer: 6128338
CaseNum: 101-3-85822538-6128338

Case 101 - The Case of Lina Lovelace
Stage 4 - The Plaza Hotel

Okay this place is more Lina’s style. Now’s our chance to find out the root of all
of this. Lets see who is Lina meeting.

Identify Lina by drawing a Medium Blue filled rectangle with a Goldenrod outline.
She’s the woman in the red dress of course.

Identify the man with the monocle smoking the cigar by drawing a Dodger Blue filled
rectangle with a Medium Purple outline around him.

Identify the man reading the newspaper by drawing a Dark Magenta filled rectangle
with a Dark Violet outline around him.

Identify the woman with the dog by drawing a Cornflower Blue filled rectangle with a
Yellow Green outline around her. Make sure you include the dog too.

The rectangles should cover the targets as accurately as possible without
including anything else.

Use X11 colours. You can find a reference table at https://en.wikipedia.org/wiki/Web_colors.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

  rect()
  fill() Use r,g,b values between 0 and 255. Set alpha to 100 for some opacity.
	stroke() Use r,g,b values between 0 and 255.

*/

var img;

function preload()
{
	img = loadImage('img.jpg');
}

function setup()
{
	createCanvas(img.width,img.height);
	strokeWeight(2);
}

function draw()
{
	image(img,0,0);

	//Write your code below here ...
	fill(139,0,139,100);
	stroke(148,0,211);
	rect(70, 70, 160, 310);

	fill(0,0,205,100);
	stroke(218,165,32);
	rect(397, 22, 133, 270);

	fill(30,144,255,100);
	stroke(147,112,219);
	rect(652, 233, 268, 370);

	fill(100,149,237,100);
	stroke(154,205,50);
	rect(1100, 15, 215, 430);


}
