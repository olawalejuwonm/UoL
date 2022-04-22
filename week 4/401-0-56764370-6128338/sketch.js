/*

Officer: 6128338
CaseNum: 401-0-56764370-6128338

Case 401 - The Case of Norbert's Weiner Stand
Stage 1 - Noxious Weiner

Console city has been plunged into chaos. The notorious poisoner Norbert has struck the
population down with a potent poison. Word has it that he is smuggling his venomous filth
via a streetside weiner stand. Hundreds of people have been affected, and the municipal
water company tells me that their sewers are at full capacity. This is no laughing matter.
I need you to head down to our lab and work on an antidote.

You must develop the antidote by using conditional statements in the draw loop to
do the following:


You must develop the antidote by using conditional statements in the draw loop to
do the following.

	- When insecticide goes above 0.75, decrement antibodies by 0.02
	- If mercury dips below 0.48, increase antibodies by 0.01
	- When insecticide goes above 0.26, try decreasing antitoxin by 0.04
	- When deadly_nightshade goes above 0.56, increment antitoxin by 0.05
	- If deadly_nightshade goes above 0.4, decrease charcoal by 0.03
	- When mercury dips below 0.34, try increasing charcoal by 0.05


Your conditional statements should:

consider the following poisons:

	- deadly_nightshade
	- mercury
	- insecticide


and modify the following antidotes:

	- antibodies
	- antitoxin
	- charcoal


- There are many ways to complete this task but you should only use the
following commands:

	if(){}
	+=
	-=

*/

//Declare the poison variables
var deadly_nightshade;
var mercury;
var insecticide;


//Declare the antidote variables
var antibodies;
var antitoxin;
var charcoal;


//This variable is used for drawing the graph
var graphs;


function setup()
{

	createCanvas(800,600);
	strokeWeight(2);

	//initialise the poisons and antidotes
	deadly_nightshade = 0.5;
	mercury = 0.5;
	insecticide = 0.5;
	antibodies = 0.5;
	antitoxin = 0.5;
	charcoal = 0.5;


	//fills the graph with empty values
	graphs = [];

	for(var i = 0; i < 3; i++)
	{
		graphs.push([]);
		for(var j = 0; j < 512; j++)
		{
			graphs[i].push(0.5);
		}
	}

}

function draw()
{

	//Develop the antidote below
	//Write conditional statements to change the amount of each substance ...


	// - When insecticide goes above 0.75, decrement antibodies by 0.02

	// - If mercury dips below 0.48, increase antibodies by 0.01

	// - When insecticide goes above 0.26, try decreasing antitoxin by 0.04

	// - When deadly_nightshade goes above 0.56, increment antitoxin by 0.05
	
	// - If deadly_nightshade goes above 0.4, decrease charcoal by 0.03

	// - When mercury dips below 0.34, try increasing charcoal by 0.05


	if (insecticide > 0.75) {
		antibodies -= 0.02;
	}
	if (mercury < 0.48) {
		antibodies += 0.01;
	}
	if (insecticide > 0.26) {
		antitoxin -= 0.04;
	}
	if (deadly_nightshade > 0.56) {
		antitoxin += 0.05;
	}
	if (deadly_nightshade > 0.4) {
		charcoal -= 0.03;
	}
	if (mercury < 0.34) {
		charcoal += 0.05;
	}

	//////////////////////////////////////////////////////

	//the code below generates new values using random numbers

	/*
		For testing, you might want to temporarily comment out
		these lines and set the same variables to constant values
		instead.
	*/

	deadly_nightshade = nextValue(graphs[0],deadly_nightshade);
	mercury = nextValue(graphs[1],mercury);
	insecticide = nextValue(graphs[2],insecticide);


	antibodies = constrain(antibodies, 0, 1);
	antitoxin = constrain(antitoxin, 0, 1);
	charcoal = constrain(charcoal, 0, 1);


	///////// DO NOT CHANGE THE CODE BELOW ///////////

	//drawing code

	// set background
	background(0);
	noFill();

	//draw the graphs for the vitals
	var colors = [
	color(255, 0, 0),
	color(0, 255, 0),
	color(0, 0, 255),
	color(255, 0, 255),
	color(255, 255, 0),
	color(0, 255, 255)
	];

	for(var i = 0; i < graphs.length; i++)
	{
		stroke(colors[i]);
		drawGraph(graphs[i]);
	}

	//draw the poisons as text
	noStroke();
	fill(colors[0]);
	text('deadly_nightshade: ' + nf(deadly_nightshade,1,2), 20,20);
	fill(colors[1]);
	text('mercury: ' + nf(mercury,1,2), 20,40);
	fill(colors[2]);
	text('insecticide: ' + nf(insecticide,1,2), 20,60);


	//draw the antidotes bar chart
	drawBar(antibodies,50,'antibodies');
	drawBar(antitoxin,200,'antitoxin');
	drawBar(charcoal,350,'charcoal');


}

function nextValue(graph, val)
{
	//gets the next value for a vital and puts it in an array for drawing
	var delta = random(-0.03,0.03);

	val += delta;
	if(val > 1 || val < 0)
	{
		delta *= -1;
		val += delta * 2;
	}

	graph.push(val)
	graph.shift();
	return val;
}

function drawGraph(graph)
{
	//draws an array as a graph
	beginShape();
	for(var i = 0; i < graph.length; i++)
	{
			vertex(width * i/512, height * 0.5 - graph[i]* height/3)
	}
	endShape();
}


function drawBar(val, x, name)
{
	//draws the bars for bar chart
    noStroke();
    fill(0,100,100);
	var mh = height * 0.4 - 50;
	rect(x,(height - 50) - val*mh, 100, val*mh);
    fill(255);
	text(name + ": " + val, x, height - 20);
}
