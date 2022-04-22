/*

Officer: 6128338
CaseNum: 401-1-96291218-6128338

Case 401 - The Case of Norbert's Weiner Stand
Stage 2 - Toxic Burrito

Norbert is at it again. This time he’s set up a burrito stall and is lacing burritos
with his foul toxin. The chaos is spreading. People are dropping like flies and burrito
sales have fallen through the floor. To make matters worse it seems Norbert has cottoned
on to our methods and has upped the complexity of his poison. You’ll find the antidote
harder to develop this time. So kid, head down to the lab and get working.

You must develop the antidote by using conditional statements in the draw loop to
do the following.

	- If polonium goes above 0.34 or hemlock goes above 0.51, try decreasing Calcium_Gluconate by 0.02
	- When chlorine goes above 0.49 and lead goes above 0.46, increase Calcium_Gluconate by 0.02
	- If hemlock goes above 0.47, decrease HydrochloricAcid by 0.01
	- When lead goes above 0.59, increment HydrochloricAcid by 0.02
	- If chlorine goes above 0.71 and lead goes above 0.38, decrease charcoal by 0.01
	- When polonium dips below 0.33 or hemlock goes above 0.46, try increasing charcoal by 0.04
	- When polonium dips below 0.27, try decreasing sulphates by 0.04
	- When hemlock dips below 0.27 and chlorine goes above 0.75, raise sulphates by 0.04


Your conditional statements should:

consider the following poisons:

	- lead
	- hemlock
	- polonium
	- chlorine


and modify the following antidotes:

	- Calcium_Gluconate
	- HydrochloricAcid
	- charcoal
	- sulphates


- There are many ways to complete this task but you should only use the
following commands:

	if(){}
	+=
	-=

*/

//Declare the poison variables
var lead;
var hemlock;
var polonium;
var chlorine;


//Declare the antidote variables
var Calcium_Gluconate;
var HydrochloricAcid;
var charcoal;
var sulphates;


//This variable is used for drawing the graph
var graphs;


function setup()
{

	createCanvas(800,600);
	strokeWeight(2);

	//initialise the poisons and antidotes
	lead = 0.5;
	hemlock = 0.5;
	polonium = 0.5;
	chlorine = 0.5;
	Calcium_Gluconate = 0.5;
	HydrochloricAcid = 0.5;
	charcoal = 0.5;
	sulphates = 0.5;


	//fills the graph with empty values
	graphs = [];

	for(var i = 0; i < 4; i++)
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

	// - If polonium goes above 0.34 or hemlock goes above 0.51, try decreasing Calcium_Gluconate by 0.02
	// - When chlorine goes above 0.49 and lead goes above 0.46, increase Calcium_Gluconate by 0.02
	// - If hemlock goes above 0.47, decrease HydrochloricAcid by 0.01
	// - When lead goes above 0.59, increment HydrochloricAcid by 0.02
	// - If chlorine goes above 0.71 and lead goes above 0.38, decrease charcoal by 0.01
	// - When polonium dips below 0.33 or hemlock goes above 0.46, try increasing charcoal by 0.04
	// - When polonium dips below 0.27, try decreasing sulphates by 0.04
	// - When hemlock dips below 0.27 and chlorine goes above 0.75, raise sulphates by 0.04

	if (polonium > 0.34 || hemlock > 0.51) {
		Calcium_Gluconate -= 0.02;
	}

	if (chlorine > 0.49 && lead > 0.46) {
		Calcium_Gluconate += 0.02;
	}

	if (hemlock > 0.47) {
		HydrochloricAcid -= 0.01;
	}
	
	if (lead > 0.59) {
		HydrochloricAcid += 0.02;
	}

	if (chlorine > 0.71 && lead > 0.38) {
		charcoal -= 0.01;
	}

	if (polonium < 0.33 || hemlock > 0.46) {
		charcoal += 0.04;
	}
	if (polonium < 0.27) {
		sulphates -= 0.04;
	}
	if (hemlock < 0.27 && chlorine > 0.75) {
		sulphates += 0.04;
	}



	//////////////////////////////////////////////////////

	//the code below generates new values using random numbers

	/*
		For testing, you might want to temporarily comment out
		these lines and set the same variables to constant values
		instead.
	*/

	lead = nextValue(graphs[0],lead);
	hemlock = nextValue(graphs[1],hemlock);
	polonium = nextValue(graphs[2],polonium);
	chlorine = nextValue(graphs[3],chlorine);


	Calcium_Gluconate = constrain(Calcium_Gluconate, 0, 1);
	HydrochloricAcid = constrain(HydrochloricAcid, 0, 1);
	charcoal = constrain(charcoal, 0, 1);
	sulphates = constrain(sulphates, 0, 1);


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
	text('lead: ' + nf(lead,1,2), 20,20);
	fill(colors[1]);
	text('hemlock: ' + nf(hemlock,1,2), 20,40);
	fill(colors[2]);
	text('polonium: ' + nf(polonium,1,2), 20,60);
	fill(colors[3]);
	text('chlorine: ' + nf(chlorine,1,2), 20,80);


	//draw the antidotes bar chart
	drawBar(Calcium_Gluconate,50,'Calcium_Gluconate');
	drawBar(HydrochloricAcid,200,'HydrochloricAcid');
	drawBar(charcoal,350,'charcoal');
	drawBar(sulphates,500,'sulphates');


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
