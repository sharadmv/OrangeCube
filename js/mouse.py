#!/usr/bin/python
from pymouse import PyMouse
import sys

m = PyMouse()

print(sys.argv)
action = sys.argv[1]
x = int(sys.argv[2])
y = int(sys.argv[3])
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

