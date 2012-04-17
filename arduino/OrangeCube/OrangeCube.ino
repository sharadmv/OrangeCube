#include <CapSense.h>

//CapSense   cs_6_2 = CapSense(6,2);        // 10M resistor between pins 6 & 2, pin 2 is sensor pin, add a wire and or foil if desired
CapSense   cs_1_1 = CapSense(13,12);
CapSense   cs_1_2 = CapSense(13,10);
CapSense   cs_1_3 = CapSense(13,8);
CapSense   cs_2_1 = CapSense(13,6);
CapSense   cs_2_2 = CapSense(13,4);
CapSense   cs_2_3 = CapSense(13,2);

//int outLED = 9;

void setup()                    
{
   //cs_6_2.set_CS_AutocaL_Millis(0xFFFFFFFF);     // turn off autocalibrate on channel 1 - just as an example
   cs_1_1.set_CS_AutocaL_Millis(0xFFFFFFFF);
   cs_1_2.set_CS_AutocaL_Millis(0xFFFFFFFF);
   cs_1_3.set_CS_AutocaL_Millis(0xFFFFFFFF);
   cs_2_1.set_CS_AutocaL_Millis(0xFFFFFFFF);
   cs_2_2.set_CS_AutocaL_Millis(0xFFFFFFFF);
   cs_2_3.set_CS_AutocaL_Millis(0xFFFFFFFF);
   
   //pinMode(outLED, OUTPUT);
   Serial.begin(9600);
}

void loop()                    
{
    long start = millis();
    long total1 =  cs_1_1.capSense(30);
    long total2 =  cs_1_2.capSense(30);
    long total3 =  cs_1_3.capSense(30);
    long total4 =  cs_2_1.capSense(30);
    long total5 =  cs_2_2.capSense(30);
    long total6 =  cs_2_3.capSense(30);
    
    //int val = Serial.read();
    //Serial.println(val);
  
    //Serial.print(millis() - start);        // check on performance in milliseconds
    //Serial.print("\t");                    // tab character for debug windown spacing
    //analogWrite(outLED, (total1)/1000);
  
    Serial.print(total1);                  // print sensor output 
    Serial.print("\t");
    Serial.print(total2);
    Serial.print("\t");
    Serial.print(total3);
    Serial.print("\t");
    Serial.print(total4);
    Serial.print("\t");
    Serial.print(total5);
    Serial.print("\t");
    Serial.println(total6);

    //if(total1>200){
      //digitalWrite(outLED, HIGH);
    //}

    delay(100);                             // arbitrary delay to limit data to serial port 
}
