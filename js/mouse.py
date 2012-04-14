#!/usr/bin/python
from pymouse import PyMouse
import sys
# instantiate an mouse object
m = PyMouse()

x = int(sys.argv[1])
y = int(sys.argv[2])
# move the mouse to int x and int y (these are absolute positions)
m.move(x,y)
print("Mouse moved to "+str(x)+", "+str(y));
