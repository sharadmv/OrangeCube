#!/usr/bin/python
# import the module
from pymouse import PyMouse

# instantiate an mouse object
m = PyMouse()

# move the mouse to int x and int y (these are absolute positions)
m.move(200, 200)

# click works about the same, except for int button possible values are 1: left, 2: middle, 3: right
m.click(500, 300, 1)

# get the screen size
m.screen_size()
# (1024, 768)

# get the mouse position
m.position()
# (500, 300)

