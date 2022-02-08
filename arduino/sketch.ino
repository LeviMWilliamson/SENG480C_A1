#define PHOTORESISTOR_PIN A0
#define SERIAL_PORT       9600

int photoSensorValue = 0;

void setup() {
  Serial.begin(SERIAL_PORT);
}

void loop() {
  photoSensorValue = analogRead(PHOTORESISTOR_PIN);
  if (Serial.availableForWrite()) {
    Serial.println(photoSensorValue);
  }
  delay(200);
}
