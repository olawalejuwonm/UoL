/*
The case of the Python Syndicate
Stage 1

Officer: 6128338
CaseNum: 301-0-23174811-6128338

I gotta give it to you kid, you’ve made an excellent start, but now it’s time
to take things up a level. For some time I’ve suspected that there’s something
big going down in Console City.

These cases that we’ve been working are all connected somehow. I need to use
that considerable brain of yours to work it all out. Let’s start by laying out
who we know.

Place each mugshot in its designated position by doing the following:

- Create a new variable for the X and Y coordinates of each mugshot.
    - One has already been done for you.
    - Make sure you use the same style and format for the variable name.
- Find coordinates for the mugshot and initialise your variable with these
values.
- Replace the hard-coded constants in the corresponding image command so that
the mugshot appears in its designated position.

*/

var photoBoard;
var robbie_kray_img;
var pawel_karpinski_img;
var lina_lovelace_img;
var countess_hamilton_img;
var anna_karpinski_img;
var rocky_kray_img;



//declare your new variables below
var countess_hamilton_pos_x = 115;
var countess_hamilton_pos_y = 309;
var robbie_kray_pos_x = 115;
var robbie_kray_pos_y = 40;
var pawel_karpinski_pos_x = 408;
var pawel_karpinski_pos_y = 40;
var lina_lovelace_pos_x = 701;
var lina_lovelace_pos_y = 40;
var anna_karpinski_pos_x = 408;
var anna_karpinski_pos_y = 309;
var rocky_kray_pos_x = 701;
var rocky_kray_pos_y = 309;




function preload()
{
	photoBoard = loadImage('photoBoard.png');
	robbie_kray_img = loadImage("krayBrothers2.png");
	pawel_karpinski_img = loadImage("karpinskiBros2.png");
	lina_lovelace_img = loadImage("lina.png");
	countess_hamilton_img = loadImage("countessHamilton.png");
	anna_karpinski_img = loadImage("karpinskiWoman.png");
	rocky_kray_img = loadImage("krayBrothers1.png");

}

function setup()
{
	createCanvas(photoBoard.width, photoBoard.height);
}

function draw()
{
	image(photoBoard, 0, 0);

 

	//And update these image commands with your x and y coordinates.
	image(countess_hamilton_img, countess_hamilton_pos_x, countess_hamilton_pos_y);

	image(robbie_kray_img, robbie_kray_pos_x, robbie_kray_pos_y );
	image(pawel_karpinski_img, pawel_karpinski_pos_x, pawel_karpinski_pos_y );
	image(lina_lovelace_img, lina_lovelace_pos_x, lina_lovelace_pos_y );
	image(anna_karpinski_img, anna_karpinski_pos_x , anna_karpinski_pos_y );
	image(rocky_kray_img, rocky_kray_pos_x, rocky_kray_pos_y);

}