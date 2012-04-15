#include <CapSense.h>

CapSense cs_6_2 = CapSense(10,9);        // 10M resistor between pins 6 & 2, pin 2 is sensor pin, add a wire and or foil if desired
//CapSense cs_7_3 = CapSense(13,12);        // 10M resistor between pins 7 & 3, pin 3 is sensor pin, add a wire and or foil if desired
CapSense cs_5_6 = CapSense(6,5);        // 10M resistor between pins 7 & 3, pin 3 is sensor pin, add a wire and or foil if desired

//int outLED = 9;

void setup()                    
{
   //cs_6_2.set_CS_AutocaL_Millis(0xFFFFFFFF);     // turn off autocalibrate on channel 1 - just as an example
   cs_6_2.set_CS_AutocaL_Millis(0xFFFFFFFF);
   cs_5_6.set_CS_AutocaL_Millis(0xFFFFFFFF);
   //pinMode(outLED, OUTPUT);
   Serial.begin(9600);
}

void loop()                    
{
    long start = millis();
    long total1 =  cs_6_2.capSense(30);
    //long total2 =  cs_7_3.capSense(30);
    long total3 =  cs_5_6.capSense(30);

    //int val = Serial.read();
    //Serial.println(val);
  
    // tab character for debug windown spacing
    //analogWrite(outLED, (total1)/1000);
  
    Serial.print(total3);                  // print sensor output 1
    Serial.print("\t");
    
    //Serial.print(total2);                  // print sensor output 1
    //Serial.print("\t");
   Serial.println(total1);
    //if(total1>200){
      //digitalWrite(outLED, HIGH);
    //}

    delay(100);                             // arbitrary delay to limit data to serial port 
}
