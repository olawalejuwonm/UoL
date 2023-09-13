#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

// Set the PORT for the web server
ESP8266WebServer server(80);

// The WiFi details 
const char* ssid = "9BAC Hyperoptic Fibre Broadband";
const char* password =  "SGsgeU4ZhWDK"; 

// Initialise the RGB pins
const int red_led_pin = D2;
const int green_led_pin = D3;
const int blue_led_pin = D4;

// Initialise the touch sensor pin
// The chair value coming from the touch sensor
const int touch_sensor = D5;
int chair_busy;

// Initialise the photoresistor pin
// The photoresisotr value coming from the photo sensor
// The photoresisotr night treshold
const int photo_sensor = A0;
int photoValue = 0;  
int photoTreshold = 550;


// Put your setup code here, to run once:
void setup() {

  //Connect to the WiFi network
  WiFi.begin(ssid, password);  
  
  // LEDs as OUTPUT
  pinMode(red_led_pin, OUTPUT);
  pinMode(green_led_pin, OUTPUT);
  pinMode(blue_led_pin, OUTPUT);
  
  // Touch sensor and photoresistors as INPUT  
  pinMode(touch_sensor, INPUT);
  pinMode(photo_sensor, INPUT);

  // Start the serial to debug the values
  Serial.begin(9600);

  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {  
      delay(500);
      Serial.println("Waiting to connect...");
  }

  //Print the board IP address
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());  

  server.on("/", get_index); // Get the index page on root route 
  server.on("/setLEDStatus", setLEDStatus); // Get the setLed page
  
  server.begin(); //Start the server
  Serial.println("Server listening");
}

// put your main code here, to run repeatedly:
void loop() {

  // This will keep the server and serial monitor available 
  Serial.println("Server is running");

  //Handling of incoming client requests
  server.handleClient(); 
  
  // Check the photoresistor threshold
  if(isNight()){
   // It is night, start the light show
   lightShow();
  }else{
   // It is not night, check for chair availability
   chairSignal();
  }
  
}


// Utility function to control the RGB led
void rgbLed(int red_led_amount, int green_led_amount, int blue_light_amount) {
  
  analogWrite(red_led_pin, red_led_amount);
  analogWrite(green_led_pin, green_led_amount);
  analogWrite(blue_led_pin, blue_light_amount);
  
}


//  Utility function to control the chair availability
void chairSignal(){
  
  chair_busy = digitalRead(touch_sensor); // Read the value of the touch sensor (0--1)
  Serial.println("");

  if(chair_busy == HIGH){
    rgbLed(255, 0, 0); // The chair is busy, RED
  }else{
   rgbLed(0, 255, 0); // The chair is free, GREEN
  }

}


// Utility function to check if it is night 
bool isNight (){
  
  photoValue = analogRead(photo_sensor); // Read the value of the photo resistor (0--1023)
  //Serial.println(photoValue);
  
  if ( photoValue > photoTreshold){ // Not night 
  return false;
  }
  return true; // It is night 
  
}


// Utility function to start the light show 
void lightShow(){
  
   rgbLed(255, 0, 0);
   delay(500);
   rgbLed(0, 255, 0);
   delay(500);
   rgbLed(0, 0, 255);
   delay(500); 
}


// Utility function to serve the home page dashboard
void get_index() {

  String html ="<!DOCTYPE html> <html> ";
  html += "<head><meta http-equiv=\"refresh\" content=\"2\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"></head>";
  html += "<body> <h1>The Smart Chair Dashboard</h1>";
  html +="<p> Welcome to the smart chair dashboard</p>";
  html += "<div> <p> <strong> The photoresistor value is: ";
  html += analogRead(photo_sensor);
  html +="</strong> </p>";
  html += "<p> <strong> The chair ";
  html += isNight()?"is in low light conditions":"is not in low light conditions";
  html +="</strong> </p> </div>";
  
  html += "<a href=\"/setLEDStatus?s=0\" target=\"_blank\"\"\"><button>Turn Off </button></a>";
  html += "<a href=\"/setLEDStatus?s=1\" target=\"_blank\"\"\"><button>Turn On </button></a>";
  
  html +="</body> </html>";
  
  //Print a welcoming message on the index page
  server.send(200, "text/html", html);
  
}

// Utility function to read the query string
void setLEDStatus(){
  
  int query_string = 0;
  
  // Check the query string 
  if (server.arg("s") != ""){ //Parameter found
    // Parse the value from the query
    query_string = server.arg("s").toInt();
    // Check the value and update the blue led pin of the RGB component
    if(query_string==1){
     analogWrite(blue_led_pin, 255);
     text = "The blue led is on";
    }else{
    analogWrite(blue_led_pin, 0);
    text = "The blue led is off";
    }
  }

  //Print the status of the blue led
  server.send(200, "text/html", text);
}
