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
void setup()
{

  // LEDs as OUTPUT
  pinMode(red_led_pin, OUTPUT);
  pinMode(green_led_pin, OUTPUT);
  pinMode(blue_led_pin, OUTPUT);

  // Touch sensor and photoresistors as INPUT
  pinMode(touch_sensor, INPUT);
  pinMode(photo_sensor, INPUT);

  // Start the serial to debug the values
  Serial.begin(9600);
}

// put your main code here, to run repeatedly:
void loop()
{

  // Check the photoresistor threshold
  if (isNight())
  {
    // It is night, start the light show
    lightShow();
  }
  else
  {
    // It is not night, check for chair availability
    chairSignal();
  }
}

// Utility function to control the RGB led
void rgbLed(int red_led_amount, int green_led_amount, int blue_light_amount)
{

  analogWrite(red_led_pin, red_led_amount);
  analogWrite(green_led_pin, green_led_amount);
  analogWrite(blue_led_pin, blue_light_amount);
}

//  Utility function to control the chair availability
void chairSignal()
{

  chair_busy = digitalRead(touch_sensor); // Read the value of the touch sensor (0--1)
  Serial.println(chair_busy);

  if (chair_busy == HIGH)
  {
    rgbLed(255, 0, 0); // The chair is busy, RED
  }
  else
  {
    rgbLed(0, 255, 0); // The chair is free, GREEN
  }
}

// Utility function to check if it is night
bool isNight()
{

  photoValue = analogRead(photo_sensor); // Read the value of the photo resistor (0--1023)
  Serial.println(photoValue);

  if (photoValue > photoTreshold)
  { // Not night
    return false;
  }
  return true; // It is night
}

// Utility function to start the light show
void lightShow()
{

  rgbLed(255, 0, 0);
  delay(500);
  rgbLed(0, 255, 0);
  delay(500);
  rgbLed(0, 0, 255);
  delay(500);
}
