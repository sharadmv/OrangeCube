#include <CapSense.h>

//CapSense   cs_6_2 = CapSense(6,2);        // 10M resistor between pins 6 & 2, pin 2 is sensor pin, add a wire and or foil if desired
CapSense   cs_13_12 = CapSense(13,12);
CapSense   cs_10_9 = CapSense(10,9);
CapSense   cs_7_6 = CapSense(7,6);
CapSense   cs_5_4 = CapSense(5,4);
CapSense cs_3_2 = CapSense(3,2);


//int outLED = 9;

void setup()                    
{
   //cs_6_2.set_CS_AutocaL_Millis(0xFFFFFFFF);     // turn off autocalibrate on channel 1 - just as an example
   //cs_6_2.set_CS_AutocaL_Millis(0xFFFFFFFF);
   cs_13_12.set_CS_AutocaL_Millis(0xFFFFFFFF);
   cs_10_9.set_CS_AutocaL_Millis(0xFFFFFFFF);
   cs_7_6.set_CS_AutocaL_Millis(0xFFFFFFFF);
   cs_5_4.set_CS_AutocaL_Millis(0xFFFFFFFF);
   cs_3_2.set_CS_AutocaL_Millis(0xFFFFFFFF);
   
   //pinMode(outLED, OUTPUT);
   Serial.begin(9600);
}

void loop()                    
{
    long start = millis();
    long total1 =  cs_13_12.capSense(30);
    long total2 =  cs_10_9.capSense(30);
    long total3 =  cs_7_6.capSense(30);
    long total4 =  cs_5_4.capSense(30);
    long total5 =  cs_3_2.capSense(30);
    
    //int val = Serial.read();
    //Serial.println(val);
  
    //Serial.print(millis() - start);        // check on performance in milliseconds
    //Serial.print("\t");                    // tab character for debug windown spacing
    //analogWrite(outLED, (total1)/1000);
    
    Serial.print(total1);
    Serial.print("\t");
    Serial.print(total2);
    Serial.print("\t");
    Serial.print(total3);
    Serial.print("\t");
    Serial.print(total4);
    Serial.print("\t");
    Serial.print(total5);
    Serial.println("\t");
    //if(total1>200){
      //digitalWrite(outLED, HIGH);
    //}

    delay(10);                             // arbitrary delay to limit data to serial port 
}
