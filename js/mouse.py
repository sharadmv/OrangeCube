#!/usr/bin/python
from pymouse import PyMouse
import sys
# instantiate an mouse object
m = PyMouse()

action = sys.argv[3]
x = int(sys.argv[1])
y = int(sys.argv[2])
# move the mouse to int x and int y (these are absolute positions)
if (action == "move"):
  m.move(x,y)
  print("Mouse moved to "+str(x)+", "+str(y));
if (action == "rightclick"):
  if (x == -1):
    m.click(m.position()[0],m.position()[1],2)
  else:
    m.move(x,y)
    m.click(x,y,2)
  print("Mouse right clicked at "+str(m.position()))
if (action == "leftclick"):
  if (x == -1):
    m.click(m.position()[0],m.position()[1],1)
  else:
    m.move(x,y)
    m.click(x,y,1)
  print("Mouse left clicked at "+str(m.position()))
