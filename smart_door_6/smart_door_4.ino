#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>
#include <Servo.h>

// create a servo object
Servo myservo;

String doorStatus = "closed";

int minDistance = 30;

// Allocate the JSON document
// Allows to allocated memory to the document dinamically.
DynamicJsonDocument doc(1024);

// Set the PORT for the web server
ESP8266WebServer server(80);

// The WiFi details
const char *ssid = "9BAC Hyperoptic Fibre Broadband";
const char *password = "SGsgeU4ZhWDK";

// Trigger Pin of Ultrasonic Sensor and  Echo Pin of Ultrasonic Sensor
const int trigPin = D4;
const int echoPin = D8;

// Duration and distance variables
long duration = 0;
int distance = 0;

// Initialise a const int variable called 'ledPin' to pin D0
const int ledPin = D0;

// put your setup code here, to run once:
void setup()
{

  // Connect to the WiFi network
  WiFi.begin(ssid, password);

  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT);  // Sets the echoPin as an Input

  Serial.begin(9600); // Starts the serial communication

  // Wait for connection
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.println("Waiting to connect...");
  }

  // Print the board IP address
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  server.on("/", get_index);                       // Get the index page on root route
  server.on("/json", get_json);                    // Get the json data on the '/json' route
  server.on("/changeMinDistance", setMinDistance); // Get the json data on the '/json' route

  server.begin(); // Start the server
  Serial.println("Server listening");
  // Set the LED pin Mode and initial analogWrite state
  pinMode(ledPin, OUTPUT);
  analogWrite(ledPin, 0);

  // Attach the servo to pin D3
  myservo.attach(D3);
}

// put your main code here, to run repeatedly:
void loop()
{

  // This will keep the server and serial monitor available
  Serial.println("Server is running");

  // Handling of incoming client requests
  server.handleClient();

  // Prints the distance on the Serial Monitor
  distanceCentimeter();

  // Call the ledControl function
  // The function should light up the led according to the ultrosound distance
  ledControl();

  // servoMovement();

  openDoor();
}

void setMinDistance()
{
  int query_string = 0;

  // check the query string for the minDistance value
  if (server.arg("dis") != "")
  {
    query_string = server.arg("dis").toInt();
    minDistance = query_string;
  }
  // // Get the value of the minDistance from the request
  // String minDistanceStr = server.arg("minDistance");
  // // Convert the string to an integer
  // minDistance = minDistanceStr.toInt();
  // // Print the minDistance to the serial monitor
  // Serial.println(minDistance);
  // Send a response to the client
  // server.send(200, "text/plain", "Min distance set");

  // Add JSON request data
  doc["Content-Type"] = "application/json";
  doc["Status"] = 200;

  // Add distance sensor JSON object data
  JsonObject distanceSensor = doc.createNestedObject("Sensor");
  distanceSensor["sensorName"] = "Distance Sensor";

  // Add distance sonsor JSON data to the object
  JsonArray pins = distanceSensor.createNestedArray("sensorPins");
  pins.add(trigPin);
  pins.add(echoPin);
  distanceSensor["sensorValue"] = distance;
  distanceSensor["thresholdValue"] = minDistance;

  // Make JSON data ready for the http request
  String jsonStr;
  serializeJsonPretty(doc, jsonStr); // The function is from the ArduinoJson library

  // Send the JSON data
  server.send(200, "application/json", jsonStr);
}

void openDoor()
{

  if (distance < minDistance)
  {
    // Set the servo to 0 degrees
    myservo.write(90);
    doorStatus = "open";
  }
  else
  {
    // Set the servo to 0 degrees
    myservo.write(0);
    doorStatus = "closed";
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
  myservo.write(45);
  delay(1000);
}

// Calculates the distance in cm
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

void get_index()
{

  String html = "<!DOCTYPE html> <html> ";
  html += "<head><meta http-equiv=\"refresh\" content=\"2\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"></head>";
  html += "<body> <h1>The Smart Door Dashboard</h1>";
  html += "<p> Welcome to the smart door dashboard </p>";
  html += "<div> <p> <strong> The distance from the door is: ";
  html += distance;
  html += "</strong> cm. </p> </div>";
  // Add door status to the index page
  html += "<div> <p> <strong> The door is: ";
  html += doorStatus;
  // form to change the minDistance
  html += "</strong> cm. </p> </div>";
  html += "<form action=\"/changeMinDistance\" method=\"GET\" target='_blank'>";
  html += "<label for=\"minDistance\">Min Distance:</label>";
  html += "<input type=\"number\" id=\"minDistance\" name=\"dis\" value=\"";
  html += minDistance;
  html += "\">";
  html += "<input type=\"submit\" value=\"Submit\">";
  html += "</form>";

  html += "</body> </html>";

  // Print a welcoming message on the index page
  server.send(200, "text/html", html);
}

// Utility function to send JSON data
void get_json()
{

  // Create JSON data
  jsonDistanceSensor(); // This adds some data to doc

  // Make JSON data ready for the http request
  String jsonStr;
  serializeJsonPretty(doc, jsonStr); // The function is from the ArduinoJson library

  // Send the JSON data
  server.send(200, "application/json", jsonStr);
}

void jsonDistanceSensor()
{

  // Add JSON request data
  doc["Content-Type"] = "application/json";
  doc["Status"] = 200;

  // Add distance sensor JSON object data
  JsonObject distanceSensor = doc.createNestedObject("Sensor");
  distanceSensor["sensorName"] = "Distance Sensor";

  // Add distance sonsor JSON data to the object
  JsonArray pins = distanceSensor.createNestedArray("sensorPins");
  pins.add(trigPin);
  pins.add(echoPin);
  distanceSensor["sensorValue"] = distance;
}

// Control the LED according to the ultrosound distance
void ledControl()
{

  // Create an int variable called mappedValue
  // The variable should contain a range of 0 - 255 mapped to the ultrosound distance
  int mappedValue = map(distance, 0, 40, 255, 0);

  // Use analogWirte to control the LED with the mapped value
  analogWrite(ledPin, mappedValue);
}
