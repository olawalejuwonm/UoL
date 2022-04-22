/*
201 - The case of Judge Hopper
Stage 4 - The warehouse

Officer: 6128338
CaseNum: 201-3-87188522-6128338

As you enter the ALGOL warehouse you are struck by the most horrendous stench - it’s not the fish. Lying amongst piles of fish carcasses you find the body of Judge Hopper. Gathering yourself together, you tie a handkerchief around your nose and mouth and quickly set about recording the evidence.

Draw around the Judge’s body ...

You should need around 20 vertices to draw round the judge and make sure you close your shape!


*/

var img;

function preload() {
    img = loadImage('scene.png');
}

function setup() {
    createCanvas(img.width, img.height);
}

function draw() {

    image(img, 0, 0);
    stroke(255, 0, 0);
    strokeWeight(3);
    noFill();

    // write the code to draw around the Judge's body below
    beginShape();
    vertex(309, 165);
    vertex(389, 178);
    vertex(388, 231);
    vertex(403, 232);
    vertex(460, 231);
    vertex(522, 205);
    vertex(573, 192);
    vertex(579, 207);
    vertex(643, 201);
    vertex(670, 225);
    vertex(598, 237);
    vertex(601, 250);
    vertex(655, 240);
    vertex(655, 258);
    vertex(685, 283);
    vertex(682, 289);
    vertex(658, 283);
    vertex(627, 268);
    vertex(616, 273);
    vertex(643, 303);
    vertex(619, 312);
    vertex(577, 316);
    vertex(507, 328);
    vertex(438, 333);
    vertex(385, 342);
    vertex(406, 355);
    vertex(384, 354);
    vertex(415, 469);
    vertex(408, 495);
    vertex(393, 507);
    vertex(384, 501);
    vertex(393, 465);
    vertex(361, 384);
    vertex(345, 388);
    vertex(327, 366);
    vertex(315, 372);
    vertex(289, 318);
    vertex(321, 241);
    vertex(343, 241);
    vertex(367, 195);
    vertex(333, 181);
    vertex(306, 187);
    endShape(CLOSE);

}
