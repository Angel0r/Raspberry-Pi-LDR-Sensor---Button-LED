#!/usr/local/bin/python
import sys
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BOARD)
#define the pin that goes to the circuit
pin_to_circuit = 7

class Unbuffered(object):
   def __init__(self, stream):
       self.stream = stream
   def write(self, data):
       self.stream.write(data)
       self.stream.flush()
   def __getattr__(self, attr):
       return getattr(self.stream, attr)


def rc_time (pin_to_circuit):
    count = 0
    GPIO.setup(pin_to_circuit, GPIO.OUT)
    GPIO.output(pin_to_circuit, GPIO.LOW)
    time.sleep(0.1)
    
    GPIO.setup(pin_to_circuit, GPIO.IN)

    
    while (GPIO.input(pin_to_circuit) == GPIO.LOW):
       count += 1
    return count

try:
    # Main loop
    while True:
        if rc_time(pin_to_circuit) < 400:

                print(1)
                sys.stdout = Unbuffered(sys.stdout)
        else:

                print(0)
                sys.stdout = Unbuffered(sys.stdout)
#      print rc_time(pin_to_circuit)
except KeyboardInterrupt:
    pass
finally:
    GPIO.cleanup()



