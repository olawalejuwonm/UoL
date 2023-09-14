#include <Servo.h>
#include <PageBuilder.h>
#include <PageStream.h>
#include <DHT_U.h>
#include <DHT.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>

const int relayPin = D4; // Digital pin for the relay coil
// Trigger Pin of Ultrasonic Sensor and  Echo Pin of Ultrasonic Sensor
const int trigPin = D2;
const int echoPin = D1;
const int servoPin = D3; // Digital pin for the servo motor

// Initialise the DHT11 component

// Allocate the JSON document
// Allows to allocated memory to the document dinamically.
DynamicJsonDocument doc(1024);

// Set the PORT for the web server
ESP8266WebServer server(80);

// The WiFi details
const char *ssid = "Oluseed";
const char *password = "mic12345";

// Duration and distance variables
long duration = 0;
int distance = 0;

int waterLevelValue = 0;

// Close distance in cm
const int closeDistance = 30;

int noWaterLevel = 900; // Minimum water level in the tank
bool waterPumpStatus = LOW;

// create a servo object
Servo myservo;

void setup()
{
  // Initialize Serial communication for debugging
  Serial.begin(9600);
  // put your setup code here, to run once:

  // Connect to the WiFi network
  WiFi.begin(ssid, password);

  pinMode(relayPin, OUTPUT);

  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT);  // Sets the echoPin as an Input

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

  // Attach the servo to pin
  myservo.attach(servoPin);
}

void loop()
{
  server.handleClient();

  waterPumpStatus = digitalRead(relayPin);

  distanceCentimeter();

  // servoMovement();

  Serial.print("Water Pump: ");
  Serial.println(waterPumpStatus);
  // put your main code here, to run repeatedly:
  if (shouldTurnOnPump(waterLevelValue, noWaterLevel))
  {
    Serial.print("Should turn on pump");
    // Turn the relay ON (close the contacts)
    // delay(5000); // Wait for 5 second
    digitalWrite(relayPin, HIGH);
    // delay(1000); // Wait for 1 second

    // // Turn the relay OFF (open the contacts)
    // digitalWrite(relayPin, LOW);
    // delay(1000); // Wait for 1 second
  }
  else
  {
    Serial.print("Should turn off pump");
    // Turn the relay OFF (open the contacts)
    digitalWrite(relayPin, LOW);
    // delay(1000); // Wait for 1 second
  }

  const int buzzerPin = D3; // Digital pin for the buzzer

  // if someone is close turn off buzzer
  if (isSomeoneClose(distance))
  {
    noTone(buzzerPin);
  }
}

void servoMovement()
{

  // // Create an int variable called mappedValue
  // // The variable should contain a range of 0 - 180 mapped to the ultrosound distance
  // int mappedValue = map(distance, 0, 40, 0, 180);

  // // Use the mapped value to control the servo
  // myservo.write(mappedValue);

  // Set the servo to 0 degrees
  myservo.write(0);
  delay(1000);

  // Set the servo to 90 degrees
  myservo.write(90);
  delay(1000);
}

bool shouldTurnOnPump(int value, int threshold)
{

  if (value < threshold)
  {
    // Turn the relay ON (close the contacts)
    // digitalWrite(relayPin, HIGH);
    return true;
  }
  else
  {
    // Turn the relay OFF (open the contacts)
    // digitalWrite(relayPin, LOW);
    return false;
  }

  // // Map the sensor value to the LED brightness
  // int ledBrightness = map(waterLevelValue, 500, 1023, 255, 0);

  // // Set the LED brightness
  // analogWrite(ledPin, ledBrightness);

  // // Print the sensor value and LED brightness to the Serial Monitor
  // Serial.print("Water Level: ");
  // Serial.print(waterLevelValue);
  // Serial.print(" | LED Brightness: ");
  // Serial.println(ledBrightness);

  // // Add a delay to avoid rapid updates
  // delay(1000); // 1 second delay
}

void distanceCentimeter()
{

  // Clears the trigPin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);

  // Clears the trigPin
  digitalWrite(trigPin, LOW);

  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);

  // Calculating the distance in cm
  distance = (duration * 0.034) / 2;

  // Prints distance to Serial Monitor
  Serial.print(distance);
  Serial.println(": Centimeters");
}

// Check if someone is close
bool isSomeoneClose(int distance)
{
  if (distance < closeDistance)
  {
    return true;
  }
  else
  {
    return false;
  }
}

void get_index()
{

  waterPumpStatus = digitalRead(relayPin);

  // Create the HTML page with the current values
  String html = "<html><head><title>Dashboard</title></head><body>";
  html += "<h1>Remedy</h1>";
  // Display on or off for water pump
  html += "<p>Water Pump: " + String(waterPumpStatus == HIGH ? "ON" : "OFF") + "</p>";
  // Check if someone is close
  html += "<p>Someone is close: " + String(isSomeoneClose(distance) ? "YES" : "NO") + "</p>";
  // Servo motor position
  html += "<p>Servo Motor Position: " + String(myservo.read()) + "</p>";
  html += "</body></html>";

  // Send the HTML page to the client
  server.send(200, "text/html", html);
}

// if water level is high, turn off the pump
void jsonDetectorSensor()
{

  waterPumpStatus = digitalRead(relayPin);
  distanceCentimeter();

  // Add JSON request data
  doc["Content-Type"] = "application/json";
  doc["Status"] = 200;

  // // Add water level sensor JSON object data
  // JsonObject waterLevelSensor  = doc.createNestedObject("WaterLevelSensor");
  // waterLevelSensor["sensorName"] = "Water Level";
  // waterLevelSensor["sensorValue"] = waterLevelValue;

  // Add water pump status
  JsonObject waterPump = doc.createNestedObject("WaterPump");
  waterPump["description"] = "Water Pump";
  waterPump["status"] = shouldTurnOnPump(waterLevelValue, noWaterLevel) ? "ON" : "OFF";
  waterPump["value"] = waterPumpStatus;

  // Check closeness
  JsonObject closeness = doc.createNestedObject("Distance");
  closeness["description"] = "Ultrasound";
  closeness["value"] = distance;
  closeness["someoneClose"] = isSomeoneClose(distance) ? "YES" : "NO";

  // Add servo motor position
  JsonObject servoMotor = doc.createNestedObject("ServoMotor");
  servoMotor["description"] = "Servo Motor";
  servoMotor["position"] = myservo.read();
}

void get_json()
{

  // Create JSON data
  jsonDetectorSensor(); // This adds some data to doc

  // Make JSON data ready for the http request
  String jsonStr;
  serializeJsonPretty(doc, jsonStr); // The function is from the ArduinoJson library

  // Send the JSON data
  server.send(200, "application/json", jsonStr);
}