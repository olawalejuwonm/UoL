/*

Officer: 6128338
CaseNum: 401-3-41217184-6128338

Case 401 - The Case of Norbert's Weiner Stand
Stage 4 - Mortal Cupcake

It seems that Norbert is getting desperate now. In what appears to be his final
stand he has set up his own cupcake shop. The laced cupcakes look delicious but
they are extremely dangerous. Just a brief whiff of one can induce a series of
deadly symptoms. This is Norbert’s most complex poison to date, so you’ll have
to work hard to produce a viable antidote.

You must develop the antidote by using conditional statements in the draw loop to
do the following.

	- When novichok goes above 0.42 and warfarin dips below 0.41, or on the other hand, insecticide dips below 0.37, try decreasing charcoal by 0.03
	- When cyanide dips below 0.53 or Spider_Venom dips below 0.56, or on the other hand, sarin dips below 0.68 and hemlock goes above 0.49, increment charcoal by 0.05
	- When insecticide dips below 0.43 or novichok goes above 0.58, whilst at the same time, sarin goes above 0.66, reduce Calcium_Gluconate by 0.05
	- If methanol goes above 0.47, hemlock goes above 0.32, and also warfarin dips below 0.43, raise Calcium_Gluconate by 0.03
	- When hemlock goes above 0.56, whilst at the same time, warfarin dips below 0.44 or cyanide goes above 0.73, try decreasing antibodies by 0.04
	- When novichok goes above 0.43 or sarin goes above 0.44, or on the other hand, Spider_Venom dips below 0.42 and methanol dips below 0.42, increase antibodies by 0.02
	- When Spider_Venom goes above 0.61 and warfarin dips below 0.28, or on the other hand, insecticide goes above 0.27 or sarin dips below 0.35, reduce insulin by 0.01
	- If novichok dips below 0.54, hemlock goes above 0.69, and also methanol goes above 0.31, try increasing insulin by 0.03
	- When sarin goes above 0.3 and novichok goes above 0.38, whilst at the same time, insecticide goes above 0.32 or Spider_Venom dips below 0.41, decrement calciumChloride by 0.02
	- When methanol goes above 0.63 and cyanide dips below 0.42, or on the other hand, hemlock dips below 0.47 or warfarin goes above 0.3, raise calciumChloride by 0.04


Your conditional statements should:

consider the following poisons:

	- cyanide
	- sarin
	- novichok
	- hemlock
	- insecticide
	- methanol
	- warfarin
	- Spider_Venom


and modify the following antidotes:

	- charcoal
	- Calcium_Gluconate
	- antibodies
	- insulin
	- calciumChloride


- There are many ways to complete this task but you should only use the
following commands:

	if(){}
	+=
	-=

*/

//Declare the poison variables
var cyanide;
var sarin;
var novichok;
var hemlock;
var insecticide;
var methanol;
var warfarin;
var Spider_Venom;


//Declare the antidote variables
var charcoal;
var Calcium_Gluconate;
var antibodies;
var insulin;
var calciumChloride;


//This variable is used for drawing the graph
var graphs;


function setup()
{

	createCanvas(800,600);
	strokeWeight(2);

	//initialise the poisons and antidotes
	cyanide = 0.5;
	sarin = 0.5;
	novichok = 0.5;
	hemlock = 0.5;
	insecticide = 0.5;
	methanol = 0.5;
	warfarin = 0.5;
	Spider_Venom = 0.5;
	charcoal = 0.5;
	Calcium_Gluconate = 0.5;
	antibodies = 0.5;
	insulin = 0.5;
	calciumChloride = 0.5;


	//fills the graph with empty values
	graphs = [];

	for(var i = 0; i < 8; i++)
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
	// - When novichok goes above 0.42 and warfarin dips below 0.41, or on the other hand, insecticide dips below 0.37, try decreasing charcoal by 0.03

	// - When cyanide dips below 0.53 or Spider_Venom dips below 0.56, or on the other hand, sarin dips below 0.68 and hemlock goes above 0.49, increment charcoal by 0.05
	
	// - When insecticide dips below 0.43 or novichok goes above 0.58, whilst at the same time, sarin goes above 0.66, reduce Calcium_Gluconate by 0.05
	


	// - If methanol goes above 0.47, hemlock goes above 0.32, and also warfarin dips below 0.43, raise Calcium_Gluconate by 0.03
	
	// - When hemlock goes above 0.56, whilst at the same time, warfarin dips below 0.44 or cyanide goes above 0.73, try decreasing antibodies by 0.04
	
	// - When novichok goes above 0.43 or sarin goes above 0.44, or on the other hand, Spider_Venom dips below 0.42 and methanol dips below 0.42, increase antibodies by 0.02
	
	// - When Spider_Venom goes above 0.61 and warfarin dips below 0.28, or on the other hand, insecticide goes above 0.27 or sarin dips below 0.35, reduce insulin by 0.01
	



	// - If novichok dips below 0.54, hemlock goes above 0.69, and also methanol goes above 0.31, try increasing insulin by 0.03
	
	// - When sarin goes above 0.3 and novichok goes above 0.38, whilst at the same time, insecticide goes above 0.32 or Spider_Venom dips below 0.41, decrement calciumChloride by 0.02
	
	// - When methanol goes above 0.63 and cyanide dips below 0.42, or on the other hand, hemlock dips below 0.47 or warfarin goes above 0.3, raise calciumChloride by 0.04
	if ((novichok > 0.42 && warfarin < 0.41) || insecticide < 0.37 ) {
		charcoal -= 0.03;
	}
	if (cyanide < 0.53 || Spider_Venom < 0.56 || (sarin < 0.68 && hemlock > 0.49)) {
		charcoal += 0.05;
	}
	if ((insecticide < 0.43 || novichok > 0.58 )&& sarin > 0.66 ) {
		Calcium_Gluconate -= 0.05;
	}
	if (methanol > 0.47 && hemlock > 0.32 && warfarin < 0.43) {
		Calcium_Gluconate += 0.03;
	}
	if (hemlock > 0.56 && (warfarin < 0.44 || cyanide > 0.73)) {
		antibodies -= 0.04;
	}
	if (novichok > 0.43 || sarin > 0.44 || (Spider_Venom < 0.42 && methanol < 0.42)) {
		antibodies += 0.02;
	}
	if ((Spider_Venom > 0.61 && warfarin < 0.28) || (insecticide > 0.27 || sarin < 0.35)) {
		insulin -= 0.01;
	}
	if (novichok < 0.54 && hemlock > 0.69 && methanol > 0.31) {
		insulin += 0.03;
	}
	if (sarin > 0.3 && novichok > 0.38 && (insecticide > 0.32 || Spider_Venom < 0.41)) {
		calciumChloride -= 0.02;
	}
	if ((methanol > 0.63 && cyanide < 0.42 )|| hemlock < 0.47 || (warfarin > 0.3 )) {
		calciumChloride += 0.04;
	}

	//////////////////////////////////////////////////////

	//the code below generates new values using random numbers

	/*
		For testing, you might want to temporarily comment out
		these lines and set the same variables to constant values
		instead.
	*/

	cyanide = nextValue(graphs[0],cyanide);
	sarin = nextValue(graphs[1],sarin);
	novichok = nextValue(graphs[2],novichok);
	hemlock = nextValue(graphs[3],hemlock);
	insecticide = nextValue(graphs[4],insecticide);
	methanol = nextValue(graphs[5],methanol);
	warfarin = nextValue(graphs[6],warfarin);
	Spider_Venom = nextValue(graphs[7],Spider_Venom);


	charcoal = constrain(charcoal, 0, 1);
	Calcium_Gluconate = constrain(Calcium_Gluconate, 0, 1);
	antibodies = constrain(antibodies, 0, 1);
	insulin = constrain(insulin, 0, 1);
	calciumChloride = constrain(calciumChloride, 0, 1);


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
		color(0, 255, 255),
		color(255, 100, 100),
		color(255, 100, 0)
	];

	for(var i = 0; i < graphs.length; i++)
	{
		stroke(colors[i]);
		drawGraph(graphs[i]);
	}

	//draw the poisons as text
	noStroke();
	fill(colors[0]);
	text('cyanide: ' + nf(cyanide,1,2), 20,20);
	fill(colors[1]);
	text('sarin: ' + nf(sarin,1,2), 20,40);
	fill(colors[2]);
	text('novichok: ' + nf(novichok,1,2), 20,60);
	fill(colors[3]);
	text('hemlock: ' + nf(hemlock,1,2), 20,80);
	fill(colors[4]);
	text('insecticide: ' + nf(insecticide,1,2), 20,100);
	fill(colors[5]);
	text('methanol: ' + nf(methanol,1,2), 20,120);
	fill(colors[6]);
	text('warfarin: ' + nf(warfarin,1,2), 20,140);
	fill(colors[7]);
	text('Spider_Venom: ' + nf(Spider_Venom,1,2), 20,160);


	//draw the antidotes bar chart
	drawBar(charcoal,50,'charcoal');
	drawBar(Calcium_Gluconate,200,'Calcium_Gluconate');
	drawBar(antibodies,350,'antibodies');
	drawBar(insulin,500,'insulin');
	drawBar(calciumChloride,650,'calciumChloride');


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
