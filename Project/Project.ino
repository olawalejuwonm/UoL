#include <DHT_U.h>
#include <DHT.h>

// #include <TinyDHT.h>
// #include "DHT.h"

// Define the pins for the soil moisture sensor and LED
const int waterLevelPin = A0; // Analog pin for soil moisture sensor
const int ledPin = D2;        // Digital pin for LED
const int buzzerPin = D3;     // Digital pin for the buzzer
const int switchPin = D1;
const int tempHumPin = D4;

int switch_value;
int ledBrightness = 0;

// Initialise variables to store the temperature and humidity values
int temperature = 0;
int humidity = 0;

// Initialise the DHT11 component
DHT dht(tempHumPin, DHT11);
void setup()
{
  // Initialize Serial communication for debugging
  Serial.begin(9600);

  // Set the LED pin as an OUTPUT
  pinMode(ledPin, OUTPUT);
  pinMode(switchPin, INPUT);

  // Start the dht component reading
  dht.begin();
}

void loop()
{

  float humidity = dht.readHumidity();
  float temperatureC = dht.readTemperature();
  float temperatureF = dht.readTemperature(true); // Read temperature in Fahrenheit

  if (isnan(humidity) || isnan(temperatureC) || isnan(temperatureF))
  {
    Serial.println("Failed to read from DHT sensor!");
  }
  else
  {
    Serial.print("Humidity: ");
    Serial.print(humidity);
    Serial.print("%\t");
    Serial.print("Temperature (C): ");
    Serial.print(temperatureC);
    Serial.print("°C\t");
    Serial.print("Temperature (F): ");
    Serial.print(temperatureF);
    Serial.println("°F");
  }
  
  int waterLevelValue = analogRead(waterLevelPin);

  if (detectorOn())
  {
    Serial.print("Detector is on");
    ledBrightness = 255;
  }
  else
  {
    Serial.print("Detector is off");
    ledBrightness = 0;
  }

  ledBrightness = map(waterLevelValue, 500, 1023, 255, 0);

  // Map the sensor value to the LED brightness

  // Set the LED brightness
  analogWrite(ledPin, ledBrightness);

  int buzzerFrequency = map(ledBrightness, 0, 255, 2000, 500); // Adjust frequency range as needed

  Serial.print("Buzzer Frequency: ");
  Serial.print(buzzerFrequency);

  // Set the buzzer frequency and duration
  tone(buzzerPin, buzzerFrequency);
  delay(50); // Adjust delay for buzzer tone duration

  // Print the sensor value and LED brightness to the Serial Monitor
  Serial.print("Soil Moisture: ");
  Serial.print(waterLevelValue);
  Serial.print(" | LED Brightness: ");
  Serial.println(ledBrightness);

  // Add a delay to avoid rapid updates
  delay(1000); // 1 second delay

  // Read the temperature and humidity
  readTempHum();
}

bool detectorOn()
{

  // read the switch pin value
  switch_value = digitalRead(switchPin);

  // Log switch value
  Serial.print("Switch value: ");
  Serial.println(switch_value);

  // check the status and return either true or false
  if (switch_value == 0)
  {
    return false;
  }
  return true;
}

// Read the temperature and humidity values
void readTempHum()
{

  temperature = dht.readTemperature();
  humidity = dht.readHumidity();
  Serial.println(temperature);
  Serial.println(humidity);

  Serial.println("Temperature: " + String(temperature) + " C");
  Serial.println("Humidity: " + String(humidity) + " %");
}

// Check water level
// if water level is low, turn on the pump
// if water level is high, turn off the pump
