/*

Officer: 6128338
CaseNum: 403-3-83366907-6128338

Case 403 - Captured - stage 4

A coordinated action is under way to arrest Shiffman. Police are currently in pursuit on Adele Street.
In order to catch him we must be able to alert all forces of his whereabouts according to the following rules:

- if Shiffman is within 64 meters from Jerry's Wine Bar then alert local police by drawing a Indigo circle around it with a radius of 64 pixels.
- if Shiffman is in Gates Department Store then the neighbourhood watch must be notified by drawing a DarkSalmon rectangle around it.
- if Shiffman is in neither position, a global alert must be issued by drawing a GreenYellow rectangle covering the area between Bereners-Lee Street, Gates Avenue, Adele Street and Packard Avenue.

Shiffman's position is signified by the mouse.

Note: all road coordinates are measured from their center.

Use X11 colours. You can find a reference table at https://en.wikipedia.org/wiki/Web_colors.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

  if()
  fill()
  rect()
  ellipse()
  dist()

*/

var img;

function preload()
{
	img = loadImage('map.jpg');
}

function setup()
{
	createCanvas(img.width,img.height);
}

function draw()
{
    // draw the image
    image(img,0,0);

    //Write your code below here ...
    if (dist(mouseX, mouseY, 2919, 996) < 64) {
      fill(75,0,130);
      ellipse(2919, 996, 128, 128);
    }
    else if ((mouseX >= 2621 && mouseX <= 2806) && (mouseY >= 378 && mouseY <= 468)) {
      fill(233,150,122);
      rect(2621, 378, 185, 90);
    }
    else {
      fill(173,255,47);
      rect(2128, 88,454, 804 );
    }

    // finally, draw Shiffman's position
    strokeWeight(2);
    stroke(255);
    fill(255,0,0);
    ellipse(mouseX, mouseY, 10, 10);
}
