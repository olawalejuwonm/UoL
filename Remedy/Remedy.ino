#include <Servo.h>

const int relayPin = D4; // Digital pin for the relay coil
// Trigger Pin of Ultrasonic Sensor and  Echo Pin of Ultrasonic Sensor
const int trigPin = D2;
const int echoPin = D1;
const int servoPin = D3; // Digital pin for the servo motor

// Duration and distance variables
long duration = 0;
int distance = 0;

// Close distance in cm
const int closeDistance = 30;

int noWaterLevel = 900; // Minimum water level in the tank

// create a servo object
Servo myservo;

void setup()
{
  // Initialize Serial communication for debugging
  Serial.begin(9600);
  // put your setup code here, to run once:

  pinMode(relayPin, OUTPUT);

  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT);  // Sets the echoPin as an Input

  // Attach the servo to pin
  myservo.attach(servoPin);
}

void loop()
{
  int waterLevelValue = 0;

  // servoMovement();

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

  int distance = distanceCentimeter();
  const int buzzerPin = D3; // Digital pin for the buzzer

  // if someone is close turn off buzzer
  if (isSomeoneClose(distance))
  {
    noTone(buzzerPin);
  }
}

void servoMovement() {

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

int distanceCentimeter()
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

  return distance;
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
