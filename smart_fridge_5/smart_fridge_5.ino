

#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include "DHT.h"
#include <LiquidCrystal_I2C.h>

// Set the PORT for the web server
ESP8266WebServer server(80);

// The WiFi details 
const char* ssid = "9BAC Hyperoptic Fibre Broadband";
const char* password =  "SGsgeU4ZhWDK"; 

// Initialise the switch pin
// The variable to store the switch value
const int switch_pin = D0;
int switch_value;

// Initialise the potentiometer pin
// The value coming from the potentiometer
const int potentiometer_pin  = A0;
int poteValue;

// Initialise the minimum and maximum temperature of the fridge
int minTemp = -2;
int maxTemp = 6;

// Initialise the critical minimum and maximum temperature of the fridge
int criticalMinTemp = 2;
int criticalMaxTemp = 4;

// Initialise the buzzer pin
const int buzzer_pin = D5;

// Initialise the RGB pins
const int red_led_pin = D7;
const int green_led_pin = D3;
const int blue_led_pin = D4;

// Initialise the Temperature and Humidity pin
const int temp_hum_pin = D6;

// Initialise variables to store the temperature and humidity values
int temperature = 0;
int humidity = 0;

// Initialise the DHT11 component
DHT dht(temp_hum_pin, DHT11);

// I2C address 0x27, 16 column and 2 rows
LiquidCrystal_I2C lcd(0x27, 16, 2); 
// 0x27 is determined by running the I2C scanner sketch
// put your setup code here, to run once:
void setup() {

  //Connect to the WiFi network
  WiFi.begin(ssid, password);  
  
  // Set the switch and potentiometer pins to INPUT
  // you want to read the state here
  pinMode(switch_pin, INPUT);
  pinMode(potentiometer_pin, INPUT);

  // Set the buzzer to OUTPUT
  // you want to set the state here
  pinMode(buzzer_pin, OUTPUT);
  // No sound initially
  digitalWrite(buzzer_pin, LOW);

   // LEDs as OUTPUT
  pinMode(red_led_pin, OUTPUT);
  pinMode(green_led_pin, OUTPUT);
  pinMode(blue_led_pin, OUTPUT);
  

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
  server.on("/setBuzzerStatus", setBuzzerStatus); // Get the setBuzzer page
  
  server.begin(); //Start the server
  Serial.println("Server listening");

  // Start the dht component reading
  dht.begin();

  lcd.init(); // initialize the lcd
  lcd.backlight(); // initialise the lcd screen light
  

}

// put your main code here, to run repeatedly:
void loop() {

  // This will keep the server and serial monitor available 
  Serial.println("Server is running");

  //Handling of incoming client requests
  server.handleClient(); 

  // Only execute if the fridge is ON
  if (fridgeOn()){

    // Print the fridge temperature on the serial monitor
    Serial.println(fridgeTemperature());
    
    // Signal temperature status
    temperatureStatus(fridgeTemperature(), fridgeOn());
    
    // Signal critical temperatures
    trigBuzzer();

    // Read the temperature and humidity
    readTempHum();

    // Display the temperature and humidity on the LCD
    displayData();
    
  }else{
    // Signal temperature status (OFF)
    temperatureStatus(fridgeTemperature(),fridgeOn());
    // No sound, fridge is off
    noTone(buzzer_pin);
  }
}

// Utility function to check whether the fridge is ON
bool fridgeOn(){
  
  // read the switch pin value
  switch_value = digitalRead(switch_pin);
  //Serial.println(switch_value);
  
  // check the status and return either true or false
  if(switch_value == 0){
    return false;
  }
  return true;
  
}

// Utility function to set the fridge temperature
int fridgeTemperature(){
  
  // Read the value of the potentiometer (0--1023)
  poteValue = analogRead(potentiometer_pin); 

  // Map the potentiometer value in a range of minTemp - maxTemp
  poteValue = map(poteValue, 0, 1023, minTemp, maxTemp);

  return poteValue;
}


// Utility function to trigger the buzzer
void trigBuzzer(){
  
  // Check if your fridge temperature is acceptable
    if(fridgeTemperature() < criticalMinTemp || fridgeTemperature() > criticalMaxTemp){
       // Critical temperature, make a sound
       tone(buzzer_pin, 1000);
    }else{
       // Good temperature, no sound
       noTone(buzzer_pin);
    }
    
}


// Utility function to signal the temperature status
void temperatureStatus(int fridgeTemp, bool fridgeOn){
   
   // Turn off the RGB led (inverse mapping)
   if(!fridgeOn){
     analogWrite(red_led_pin, 255);
     analogWrite(green_led_pin, 255);
     analogWrite(blue_led_pin, 255);
     return;
   }

   // Turn on the red value of the RGB led (inverse mapping)
   if (fridgeTemp >= 0){
     int red_value = map(fridgeTemp,0,maxTemp,255,0); // mapping the red value 0 - maxTemp to 255 - 0
     analogWrite(red_led_pin,red_value );
     analogWrite(green_led_pin, 255);
     analogWrite(blue_led_pin, 255);
   }else{
     int blue_value =map(fridgeTemp,minTemp,0,0,255);  // mapping the blue value minTemp - 0 to 0 - 255
     analogWrite(red_led_pin, 255);
     analogWrite(green_led_pin, 255);
     analogWrite(blue_led_pin,blue_value );
   }
    
}


void get_index() {

  String html ="<!DOCTYPE html> <html> ";
  html += "<head><meta http-equiv=\"refresh\" content=\"2\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"></head>";
  html += "<body> <h1>The Smart Fridge Dashboard</h1>";
  html +="<p> Welcome to the smart fridge dashboard</p>";
  html += "<div> <p> <strong> The temperature preference is: ";
  html += fridgeTemperature();
  html +="</strong> degrees. </p>";
  html += "<div> <p> <strong> The temperature reading is: ";
  html += temperature;
  html +="</strong> degrees. </p>";
  html += "<div> <p> <strong> The humidity reading is: ";
  html += humidity;
  html +="</strong> % </p>";
  html += "<p> <strong> Buzzer Component ";
  html +="</strong> </p> </div>";
  
  html += "<a href=\"/setBuzzerStatus?s=0\" target=\"_blank\"\"\"><button>Turn Off </button></a>";
  html += "<a href=\"/setBuzzerStatus?s=1\" target=\"_blank\"\"\"><button>Turn On </button></a>";
  
  html +="</body> </html>";
  
  //Print a welcoming message on the index page
  server.send(200, "text/html", html);
  
}

// Call back function for the buzzer route
void setBuzzerStatus(){
  
  int query_string = 0;
  
  // Check the query string 
  if (server.arg("s") != ""){ //Parameter found
    // Parse the value from the query
    query_string = server.arg("s").toInt();
    // Check the value and update the blue led pin of the RGB component
    if(query_string==1){
     tone(buzzer_pin, 1000);
    }else{
     noTone(buzzer_pin);
    }
  }
}

// Read the temperature and humidity values
void readTempHum(){
  
  temperature = dht.readTemperature();
  humidity = dht.readHumidity();
  Serial.println(temperature);
  Serial.println(humidity);
  
}

// Display the the temperature and humidity values on the LCD
void displayData(){

  String tmp ="Temp: ";
  tmp += temperature;
  tmp += " degrees";

  String hum ="Hum : ";
  hum += humidity;
  hum += " %";
  
  lcd.setCursor(0, 0);  
  lcd.print(tmp);
  lcd.setCursor(0, 1);  
  lcd.print(hum);
  
}
