/*
The case of the Python Syndicate
Stage 2


Officer: 6128338
CaseNum: 301-1-66998439-6128338

- Word on the street is that there is a new gang in town - The Python Syndicate.
It seems my bones were correct on this one. I need you to organise the gang
around the suspected leader Countess hamilton

- The variables for Countess hamilton have been declared and
initialised.
- Modify the x and y parameters of each image command using these two variables
so the images maintain their correct positions their correct positions on the board.
- To do this you will need to combine add and subtract operators with variables
Countess hamilton for for each parameter.
- Do not create any new variables
- Do not add any additional commands


*/

var photoBoard;
var cecil_karpinski_img;
var lina_lovelace_img;
var anna_karpinski_img;
var countess_hamilton_img;
var robbie_kray_img;
var bones_karpinski_img;


var countess_hamilton_x_position = 115;
var countess_hamilton_y_position = 309;


function preload()
{
	photoBoard = loadImage('photoBoard.png');
	cecil_karpinski_img = loadImage("karpinskiBros1.png");
	lina_lovelace_img = loadImage("lina.png");
	anna_karpinski_img = loadImage("karpinskiWoman.png");
	countess_hamilton_img = loadImage("countessHamilton.png");
	robbie_kray_img = loadImage("krayBrothers2.png");
	bones_karpinski_img = loadImage("karpinskiDog.png");

}

function setup()
{
	createCanvas(photoBoard.width, photoBoard.height);
}

function draw()
{
	image(photoBoard, 0, 0);

	//And update these image commands with your x and y coordinates.
	image(countess_hamilton_img, countess_hamilton_x_position, countess_hamilton_y_position);

	image(cecil_karpinski_img, countess_hamilton_x_position, countess_hamilton_y_position - 269);
	image(lina_lovelace_img, countess_hamilton_x_position + 293, countess_hamilton_y_position - 269);
	image(anna_karpinski_img, countess_hamilton_x_position + 586, countess_hamilton_y_position - 269);
	image(robbie_kray_img, countess_hamilton_x_position + 293, countess_hamilton_y_position);
	image(bones_karpinski_img, countess_hamilton_x_position + 586, countess_hamilton_y_position);

}