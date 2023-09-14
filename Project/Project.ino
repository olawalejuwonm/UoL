#include <PageBuilder.h>
#include <PageStream.h>
#include <DHT_U.h>
#include <DHT.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>

// #include <TinyDHT.h>
// #include "DHT.h"

// Define the pins for the soil moisture sensor and LED
const int waterLevelPin = A0; // Analog pin for soil moisture sensor
const int ledPin = D2;        // Digital pin for LED
const int buzzerPin = D3;     // Digital pin for the buzzer
const int switchPin = D1;
const int tempHumPin = D4;

// Initialise the DHT11 component
DHT dht(tempHumPin, DHT11);

// Allocate the JSON document
// Allows to allocated memory to the document dinamically.
DynamicJsonDocument doc(1024);

// Set the PORT for the web server
ESP8266WebServer server(80);

// The WiFi details
const char *ssid = "Oluseed";
const char *password = "mic12345";

int switch_value;
int waterLevelValue = 1024; // Highest value for the sensor
int ledBrightness = 0;
// Initialise variables to store the temperature and humidity values
int temperature = 0;
int humidity = 0;
int buzzerFrequency = 0;
void setup()
{
  // Initialize Serial communication for debugging
  Serial.begin(9600);

  // Connect to the WiFi network
  WiFi.begin(ssid, password);
  // Set the LED pin as an OUTPUT
  pinMode(ledPin, OUTPUT);
  pinMode(switchPin, INPUT);

  // Wait for connection
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.println("Waiting to connect... to: " + String(ssid));
  }

  // Print the board IP address
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  server.on("/", get_index);    // Get the index page on root route
  server.on("/json", get_json); // Get the json data on the '/json' route

  server.begin(); // Start the server
  Serial.println("Server listening");

  // Start the dht component reading
  dht.begin();
}

void loop()
{
  server.handleClient();

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

  waterLevelValue = analogRead(waterLevelPin);

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

  buzzerFrequency = map(ledBrightness, 0, 255, 2000, 500); // Adjust frequency range as needed

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

void get_index()
{
  // Read the temperature and humidity values
  readTempHum();

  // Read the water level value
  waterLevelValue = analogRead(waterLevelPin);

  // Create the HTML page with the current values
  String html = "<html><head><title>Dashboard</title></head><body>";
  html += "<h1>Detector</h1>";
  html += "<p>Water Level: " + String(waterLevelValue) + "</p>";
  html += "<p>Temperature: " + String(temperature) + " C</p>";
  html += "<p>Humidity: " + String(humidity) + " %</p>";
  // Include buzzer frequency
  html += "<p>Buzzer Frequency: " + String(buzzerFrequency) + " Hz</p>";
  html += "</body></html>";

  // Send the HTML page to the client
  server.send(200, "text/html", html);
}
// Check water level
// if water level is low, turn on the pump
// if water level is high, turn off the pump
void jsonDetectorSensor(){

  // Add JSON request data
  doc["Content-Type"] = "application/json";
  doc["Status"] = 200;

  // Add water level sensor JSON object data
  JsonObject waterLevelSensor  = doc.createNestedObject("WaterLevelSensor");
  waterLevelSensor["sensorName"] = "Water Level";
  waterLevelSensor["sensorValue"] = waterLevelValue;

  // Add temperature and humidity sensor JSON object data
  JsonObject tempHumSensor  = doc.createNestedObject("TempHum");
  tempHumSensor["sensorName"] = "Temperature and Humidity Sensor";
  tempHumSensor["temperature"] = temperature;
  tempHumSensor["humidity"] = humidity;

  // Add buzzer frequency JSON object data
  JsonObject buzzerSensor  = doc.createNestedObject("BuzzerSensor");
  buzzerSensor["sensorName"] = "Buzzer";
  buzzerSensor["frequency"] = buzzerFrequency;
}


void get_json(){
  
  // Create JSON data
  jsonDetectorSensor(); // This adds some data to doc

  // Make JSON data ready for the http request
  String jsonStr;
  serializeJsonPretty(doc, jsonStr); //The function is from the ArduinoJson library
  
  // Send the JSON data
  server.send(200, "application/json", jsonStr);
  
}