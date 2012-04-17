#!/usr/bin/python
from pymouse import PyMouse
import sys
import socket
# instantiate an mouse object
import SocketServer 

m = PyMouse()

class MyTCPHandler(SocketServer.BaseRequestHandler):
  def handle(self):
      while True:
        self.data = self.request.recv(1024).strip()
        action = self.data.split(" ")[0]
        x = float(self.data.split(" ")[1])
        y = float(self.data.split(" ")[2])
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
if __name__ == "__main__":
  HOST, PORT = "localhost",1234 
  server = SocketServer.TCPServer((HOST, PORT), MyTCPHandler)

    # Activate the server; this will keep running until you
    # interrupt the program with Ctrl-C
  server.serve_forever()

