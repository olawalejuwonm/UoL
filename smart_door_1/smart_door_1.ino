// Trigger Pin of Ultrasonic Sensor and  Echo Pin of Ultrasonic Sensor
const int trigPin = D4; 
const int echoPin = D8;

// Duration and distance variables
long duration = 0;
int distance= 0;

// put your setup code here, to run once:
void setup() {
  
  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT); // Sets the echoPin as an Input
  
  Serial.begin(9600); // Starts the serial communication

}

// put your main code here, to run repeatedly:
void loop() {

// Prints the distance on the Serial Monitor
  distanceCentimeter();
  
}

// Calculates the distance in cm
void distanceCentimeter() {
  
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
  distance = (duration * 0.034)/2;

  // Prints distance to Serial Monitor
  Serial.print(distance);
  Serial.println(": Centimeters");
 
}
