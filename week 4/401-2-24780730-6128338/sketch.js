/*

Officer: 6128338
CaseNum: 401-2-24780730-6128338

Case 401 - The Case of Norbert's Weiner Stand
Stage 3 - Bilious bagel

As I suspected Norbert has struck again. Ever inventive he’s set up a bagel stand and
has laced the cream cheese with an ingenious but vicious toxin. This one is quite
deadly so get yourself down to the lab right away.

You must develop the antidote by using conditional statements in the draw loop to
do the following.

	- If either Spider_Venom dips below 0.51, ricin dips below 0.69, or perhaps chlorine dips below 0.52, decrease Sodium_Bicarbonate by 0.02
	- If arsenic goes above 0.56, or on the other hand, NerveGas dips below 0.33 and lead goes above 0.48, increment Sodium_Bicarbonate by 0.05
	- When Spider_Venom dips below 0.7 or NerveGas dips below 0.33, try decreasing calcium_gluconate by 0.05
	- If arsenic goes above 0.66 and chlorine goes above 0.59, increase calcium_gluconate by 0.05
	- If Spider_Venom dips below 0.37, or on the other hand, arsenic goes above 0.5 and chlorine dips below 0.27, decrement antitoxin by 0.02
	- When ricin goes above 0.51, NerveGas goes above 0.34, and also lead goes above 0.55, try increasing antitoxin by 0.04
	- If ricin goes above 0.75 or NerveGas goes above 0.55, whilst at the same time, Spider_Venom goes above 0.53, decrease opioids by 0.01
	- When lead dips below 0.29, or on the other hand, arsenic goes above 0.45 and chlorine dips below 0.63, increase opioids by 0.03


Your conditional statements should:

consider the following poisons:

	- chlorine
	- Spider_Venom
	- lead
	- NerveGas
	- ricin
	- arsenic


and modify the following antidotes:

	- Sodium_Bicarbonate
	- calcium_gluconate
	- antitoxin
	- opioids


- There are many ways to complete this task but you should only use the
following commands:

	if(){}
	+=
	-=

*/

//Declare the poison variables
var chlorine;
var Spider_Venom;
var lead;
var NerveGas;
var ricin;
var arsenic;


//Declare the antidote variables
var Sodium_Bicarbonate;
var calcium_gluconate;
var antitoxin;
var opioids;


//This variable is used for drawing the graph
var graphs;


function setup()
{

	createCanvas(800,600);
	strokeWeight(2);

	//initialise the poisons and antidotes
	chlorine = 0.5;
	Spider_Venom = 0.5;
	lead = 0.5;
	NerveGas = 0.5;
	ricin = 0.5;
	arsenic = 0.5;
	Sodium_Bicarbonate = 0.5;
	calcium_gluconate = 0.5;
	antitoxin = 0.5;
	opioids = 0.5;


	//fills the graph with empty values
	graphs = [];

	for(var i = 0; i < 6; i++)
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
	// - If either Spider_Venom dips below 0.51, ricin dips below 0.69, or perhaps chlorine dips below 0.52, decrease Sodium_Bicarbonate by 0.02
	// - If arsenic goes above 0.56, or on the other hand, NerveGas dips below 0.33 and lead goes above 0.48, increment Sodium_Bicarbonate by 0.05
	
	// - When Spider_Venom dips below 0.7 or NerveGas dips below 0.33, try decreasing calcium_gluconate by 0.05
	
	// - If arsenic goes above 0.66 and chlorine goes above 0.59, increase calcium_gluconate by 0.05
	
	// - If Spider_Venom dips below 0.37, or on the other hand, arsenic goes above 0.5 and chlorine dips below 0.27, decrement antitoxin by 0.02
	
	// - When ricin goes above 0.51, NerveGas goes above 0.34, and also lead goes above 0.55, try increasing antitoxin by 0.04
	
	// - If ricin goes above 0.75 or NerveGas goes above 0.55, whilst at the same time, Spider_Venom goes above 0.53, decrease opioids by 0.01
	
	// - When lead dips below 0.29, or on the other hand, arsenic goes above 0.45 and chlorine dips below 0.63, increase opioids by 0.03

	if ( (Spider_Venom < 0.51 || ricin < 0.69) || chlorine < 0.52) {
		Sodium_Bicarbonate -= 0.02;
	}
	if ( arsenic > 0.56 || NerveGas < 0.33 && lead > 0.48) {
		Sodium_Bicarbonate += 0.05;
	}
	if (Spider_Venom < 0.7 || NerveGas < 0.33) {
		calcium_gluconate -= 0.05;
	}
	if (arsenic > 0.66 && chlorine > 0.59) {
		calcium_gluconate += 0.05;
	}
	if (Spider_Venom < 0.37 || (arsenic > 0.5 && chlorine < 0.27)) {
		antitoxin -= 0.02;
	}
	if (ricin > 0.51 && NerveGas > 0.34 && lead > 0.55) {
		antitoxin += 0.04;
	}
	if ((ricin > 0.75 || NerveGas > 0.55) && Spider_Venom > 0.53) {
		opioids -= 0.01;
	}
	if (lead < 0.29 || arsenic > 0.45 && chlorine < 0.63) {
		opioids += 0.03;
	}


	//////////////////////////////////////////////////////

	//the code below generates new values using random numbers

	/*
		For testing, you might want to temporarily comment out
		these lines and set the same variables to constant values
		instead.
	*/

	chlorine = nextValue(graphs[0],chlorine);
	Spider_Venom = nextValue(graphs[1],Spider_Venom);
	lead = nextValue(graphs[2],lead);
	NerveGas = nextValue(graphs[3],NerveGas);
	ricin = nextValue(graphs[4],ricin);
	arsenic = nextValue(graphs[5],arsenic);


	Sodium_Bicarbonate = constrain(Sodium_Bicarbonate, 0, 1);
	calcium_gluconate = constrain(calcium_gluconate, 0, 1);
	antitoxin = constrain(antitoxin, 0, 1);
	opioids = constrain(opioids, 0, 1);


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
	text('chlorine: ' + nf(chlorine,1,2), 20,20);
	fill(colors[1]);
	text('Spider_Venom: ' + nf(Spider_Venom,1,2), 20,40);
	fill(colors[2]);
	text('lead: ' + nf(lead,1,2), 20,60);
	fill(colors[3]);
	text('NerveGas: ' + nf(NerveGas,1,2), 20,80);
	fill(colors[4]);
	text('ricin: ' + nf(ricin,1,2), 20,100);
	fill(colors[5]);
	text('arsenic: ' + nf(arsenic,1,2), 20,120);


	//draw the antidotes bar chart
	drawBar(Sodium_Bicarbonate,50,'Sodium_Bicarbonate');
	drawBar(calcium_gluconate,200,'calcium_gluconate');
	drawBar(antitoxin,350,'antitoxin');
	drawBar(opioids,500,'opioids');


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
