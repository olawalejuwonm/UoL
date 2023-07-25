#include "DHT.h"
#include <LiquidCrystal_I2C.h>

// Initialise the switch pin
// The variable to store the switch value
const int switch_pin = D0;
int switch_value;

// Initialise the potentiometer pin
// The value coming from the potentiometer
const int potentiometer_pin  = A0;
int poteValue;

// Initialise the buzzer pin and a variable to check if already signaled
const int buzzer_pin = D5;
bool signaled = false;

// Initialise the Temperature and Humidity pin
const int temp_hum_pin = D6;

// Initialise variables to store the temperature and humidity values
int temperature = 0;


// Initialise the DHT11 component
DHT dht(temp_hum_pin, DHT11);

// I2C address 0x27, 16 column and 2 rows
LiquidCrystal_I2C lcd(0x27, 16, 2); 

// put your setup code here, to run once:
void setup() {

  // Set the switch and potentiometer pins to INPUT
  // you want to read the state here
  pinMode(switch_pin, INPUT);
  pinMode(potentiometer_pin, INPUT);

  // Set the buzzer to OUTPUT
  // you want to set the state here
  pinMode(buzzer_pin, OUTPUT);
  // No sound initially
  digitalWrite(buzzer_pin, LOW);

   
  // Start the serial to debug the values
  Serial.begin(9600);


  // Start the dht component reading
  dht.begin();

  lcd.init(); // initialize the lcd
  lcd.backlight(); // initialise the lcd screen light
  

}

// put your main code here, to run repeatedly:
void loop() {


  // Only execute if the fridge is ON
  if (fridgeOn()){

    // Signal add water to the fridge
    trigBuzzer();

    // Display the messages on the LCD display
    lcdDisplay();
    
  }else{
    // No sound, fridge is off
    noTone(buzzer_pin);
  }
}


// Utility function to check whether the fridge is ON
bool fridgeOn(){
  
  // read the switch pin value
  switch_value = digitalRead(switch_pin);
 
  // check the status and return either true or false
  if(switch_value == 0){
    return false;
  }
  return true;
  
}

// Read the temperature and return the value
int readTemp(){
  
  temperature = dht.readTemperature();
  return temperature;
  
}

// Utility function to trigger the buzzer
void trigBuzzer(){
  
    // Check if the outside temperature is above 30 degrees
    if(readTemp() > 30 && !signaled){
       // High temperature, make a sound for few seconds 
       tone(buzzer_pin, 1000);
       delay(2000);
       noTone(buzzer_pin);
       signaled = true;
    }
    // reset the signal
    if (readTemp() < 29){
      signaled = false;
    }
    
}

// Utility function to read the value of the potentiometer
int potentiomerterValue(){
  
  // Read the value of the potentiometer (0--1023)
  poteValue = analogRead(potentiometer_pin); 

  return poteValue;
}


// Display the messages on the LCD screen
void lcdDisplay(){
  
  // Map the potentiometer for the screen modes
  int screenMode = map(potentiomerterValue(),0,1023,1,3);
  String message;
  // Check which message to print to the LCD screen
  if(screenMode == 1){
   // Welcome message
   lcd.clear();
   message ="Smart Fridge";
   lcd.setCursor(0, 0);  
   lcd.print(message);
   delay(200);
    
  }else if(screenMode == 2){
   // Temperature message
   lcd.clear();
   String tmp ="Temp: ";
   tmp += temperature;
   tmp += " degrees";
  
   lcd.setCursor(0, 0);  
   lcd.print(tmp);
   delay(200);
    
  }else if (screenMode == 3){
   // Dynamic message based on temperature
   lcd.clear();
   if(readTemp() > 30  && signaled){
     message ="Add water";
   }else if (readTemp() < 29  && !signaled){
     message ="All good";
   }else{
    message ="All good";
   }
   lcd.setCursor(0, 0);  
   lcd.print(message);
   delay(200);
   
  }
  
}
