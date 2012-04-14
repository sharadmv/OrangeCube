#include <CapSense.h>

CapSense cs_6_2 = CapSense(6,2);        // 10M resistor between pins 6 & 2, pin 2 is sensor pin, add a wire and or foil if desired
//int outLED = 9;

void setup()                    
{
   //cs_6_2.set_CS_AutocaL_Millis(0xFFFFFFFF);     // turn off autocalibrate on channel 1 - just as an example
   cs_6_2.set_CS_AutocaL_Millis(0xFFFFFFFF);
   //pinMode(outLED, OUTPUT);
   Serial.begin(9600);
}

void loop()                    
{
    long start = millis();
    long total1 =  cs_6_2.capSense(30);
    //int val = Serial.read();
    //Serial.println(val);
  
    Serial.print(millis() - start);        // check on performance in milliseconds
    Serial.print("\t");                    // tab character for debug windown spacing
    //analogWrite(outLED, (total1)/1000);
  
    Serial.println(total1);                  // print sensor output 1
    //if(total1>200){
      //digitalWrite(outLED, HIGH);
    //}

    delay(10);                             // arbitrary delay to limit data to serial port 
}
