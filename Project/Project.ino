// Define the pins for the soil moisture sensor and LED
const int soilMoisturePin = A0; // Analog pin for soil moisture sensor
const int ledPin = D1;          // Digital pin for LED
const int buzzerPin = D3;       // Digital pin for the buzzer
const int relayPin = D2;        // Digital pin for the relay coil

void setup()
{
  // Initialize Serial communication for debugging
  Serial.begin(9600);

  // Set the LED pin as an OUTPUT
  pinMode(ledPin, OUTPUT);
  pinMode(relayPin, OUTPUT);
}

void loop()
{
  Serial.print("buzzerFrequency");
  // Turn the relay ON (close the contacts)
  digitalWrite(relayPin, HIGH);
  delay(1000); // Wait for 1 second

  // Turn the relay OFF (open the contacts)
  digitalWrite(relayPin, LOW);
  delay(1000); // Wait for 1 second

  // Read the soil moisture sensor value
  int soilMoistureValue = analogRead(soilMoisturePin);

  // Map the sensor value to the LED brightness
  int ledBrightness = map(soilMoistureValue, 500, 1023, 255, 0);

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
  Serial.print(soilMoistureValue);
  Serial.print(" | LED Brightness: ");
  Serial.println(ledBrightness);

  // Add a delay to avoid rapid updates
  delay(1000); // 1 second delay
}
