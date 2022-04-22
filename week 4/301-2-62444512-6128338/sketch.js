/*
The case of the Python Syndicate
Stage 3


Officer: 6128338
CaseNum: 301-2-62444512-6128338

Right kid let’s work out which of our ‘friends’ is connected to the syndicate.

- An object for Lina lovelace has been declared and initialised
- Modify the x and y parameters of each image command using the x and y
properties from the Lina lovelace object so the images remain at their correct
positions on the board.
- To do this you will need to combine add and subtract operators with the
relevant property for each parameter



*/

var photoBoard;
var rocky_kray_img;
var pawel_karpinski_img;
var lina_lovelace_img;
var cecil_karpinski_img;
var robbie_kray_img;
var bones_karpinski_img;

var lina_lovelace_object;




function preload()
{
	photoBoard = loadImage('photoBoard.png');
	rocky_kray_img = loadImage("krayBrothers1.png");
	pawel_karpinski_img = loadImage("karpinskiBros2.png");
	lina_lovelace_img = loadImage("lina.png");
	cecil_karpinski_img = loadImage("karpinskiBros1.png");
	robbie_kray_img = loadImage("krayBrothers2.png");
	bones_karpinski_img = loadImage("karpinskiDog.png");

}

function setup()
{
	createCanvas(photoBoard.width, photoBoard.height);
	lina_lovelace_object = {
		x: 701,
		y: 40,
		image: lina_lovelace_img
	};
}

function draw()
{
	image(photoBoard, 0, 0);

	//And update these image commands with your x and y coordinates.
	image(lina_lovelace_object.image, lina_lovelace_object.x, lina_lovelace_object.y);

	image(rocky_kray_img, lina_lovelace_object.x - 586, lina_lovelace_object.y);
	image(pawel_karpinski_img, lina_lovelace_object.x - 293, lina_lovelace_object.y);
	image(cecil_karpinski_img, lina_lovelace_object.x - 586, lina_lovelace_object.y + 269);
	image(robbie_kray_img, lina_lovelace_object.x - 293, lina_lovelace_object.y + 269);
	image(bones_karpinski_img, lina_lovelace_object.x, lina_lovelace_object.y + 269);

}