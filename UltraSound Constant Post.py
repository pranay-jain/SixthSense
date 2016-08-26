#from https://electrosome.com/hc-sr04-ultrasonic-sensor-raspberry-pi/

import RPi.GPIO as GPIO                    #Import GPIO library
import time                                #Import time library
import requests
def run():
  answer=False
  GPIO.setmode(GPIO.BCM)                     #Set GPIO pin numbering 

  TRIG = 23                                  #Associate pin 23 to TRIG
  ECHO = 24                                  #Associate pin 24 to ECHO
  while True:
    print "Distance measurement in progress"

    GPIO.setup(TRIG,GPIO.OUT)                  #Set pin as GPIO out
    GPIO.setup(ECHO,GPIO.IN)                   #Set pin as GPIO in

    GPIO.output(TRIG, False)                 #Set TRIG as LOW
    print "Waitng For Sensor To Settle"
    time.sleep(2)                            #Delay of 2 seconds

    GPIO.output(TRIG, True)                  #Set TRIG as HIGH
    time.sleep(0.00001)                      #Delay of 0.00001 seconds
    GPIO.output(TRIG, False)                 #Set TRIG as LOW

    while GPIO.input(ECHO)==0:               #Check whether the ECHO is LOW
      pulse_start = time.time()              #Saves the last known time of LOW pulse

    while GPIO.input(ECHO)==1:               #Check whether the ECHO is HIGH
      pulse_end = time.time()                #Saves the last known time of HIGH pulse 

    pulse_duration = pulse_end - pulse_start #Get pulse duration to a variable

    distance = pulse_duration * 17150        #Multiply pulse duration by 17150 to get distance
    distance = round(distance, 2)            #Round to two decimal points

    if distance<200:
      answer=True
    else:
      answer=False
    r = requests.post('http://172.20.10.8:3000/hi', {'key': answer})
run()