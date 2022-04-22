/*
The case of the Python Syndicate
Stage 4

Officer: 6128338
CaseNum: 301-3-84906218-6128338

To really crack the Python Syndicate we need to go in deep. I want to understand
all the connections. I have the data but it’s a mess and I need you to sort it out.

Organise each syndicate member into an object. I’ve done one for you as an example.
Be sure to replicate the naming conventions for your own objects.
Use image command together with the objects you created to organise the mugshots.

- Once you have done this you can comment out or delete the old variables.

*/

var photoBoard;
var anna_karpinski_image;
var countess_hamilton_image;
var lina_lovelace_image;
var pawel_karpinski_image;
var bones_karpinski_image;
var robbie_kray_image;

var pawel_karpinski_obj;


//declare your new objects below
var anna_karpinski_obj;
var countess_hamilton_obj;
var lina_lovelace_obj;
var bones_karpinski_obj;
var robbie_kray_obj;



var anna_karpinski_position_x = 115;
var anna_karpinski_position_y = 40;
var countess_hamilton_position_x = 408;
var countess_hamilton_position_y = 40;
var lina_lovelace_position_x = 701;
var lina_lovelace_position_y = 40;
var bones_karpinski_position_x = 408;
var bones_karpinski_position_y = 309;
var robbie_kray_position_x = 701;
var robbie_kray_position_y = 309;


function preload()
{
	photoBoard = loadImage('photoBoard.png');
	anna_karpinski_image = loadImage("karpinskiWoman.png");
	countess_hamilton_image = loadImage("countessHamilton.png");
	lina_lovelace_image = loadImage("lina.png");
	pawel_karpinski_image = loadImage("karpinskiBros2.png");
	bones_karpinski_image = loadImage("karpinskiDog.png");
	robbie_kray_image = loadImage("krayBrothers2.png");

}

function setup()
{
	createCanvas(photoBoard.width, photoBoard.height);
	pawel_karpinski_obj = {
		x: 115,
		y: 309,
		image: pawel_karpinski_image
	};



	//define your new objects below
	anna_karpinski_obj = {
		x: 115,
		y: 40,
		image: anna_karpinski_image
	};

	countess_hamilton_obj = {
		x: 408,
		y: 40,
		image: countess_hamilton_image
	};

	lina_lovelace_obj = {
		x: 701,
		y: 40,
		image: lina_lovelace_image
	};

	bones_karpinski_obj = {
		x: 408,
		y: 309,
		image: bones_karpinski_image
	};

	robbie_kray_obj = {
		x: 701,
		y: 309,
		image: robbie_kray_image
	};
}

function draw()
{
	image(photoBoard, 0, 0);

	//And update these image commands with your x and y coordinates.
	image(anna_karpinski_obj.image, anna_karpinski_obj.x, anna_karpinski_obj.y);
	image(countess_hamilton_obj.image, countess_hamilton_obj.x, countess_hamilton_obj.y);
	image(lina_lovelace_obj.image, lina_lovelace_obj.x, lina_lovelace_obj.y);
	image(pawel_karpinski_obj.image, pawel_karpinski_obj.x, pawel_karpinski_obj.y);
	image(bones_karpinski_obj.image, bones_karpinski_obj.x, bones_karpinski_obj.y);
	image(robbie_kray_obj.image, robbie_kray_obj.x, robbie_kray_obj.y);


}