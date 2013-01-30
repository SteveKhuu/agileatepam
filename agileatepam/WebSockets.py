import tornado.websocket

from django.contrib.auth.models import User

from agileatepam.models import Comment


class BroadcasterForAllOfType : 
    sockets = []
    
    def __init__(self):
        self.sockets = []
    
    def addSocket(self, socket):
        print self.sockets
        self.sockets.append(socket)
        
    def broadcast(self, message):
        for socket in self.sockets:
            socket.write_message(message)
            
    def remove(self, toRemoveSocket):
        self.sockets.remove(toRemoveSocket)

class ChatHandler(tornado.websocket.WebSocketHandler):
        broadcaster = BroadcasterForAllOfType()
        def open(self):
            print 'new connection'
            ChatHandler.broadcaster.addSocket(self)
              
        def on_message(self, message):                
            print 'new message'
            ChatHandler.broadcaster.broadcast(message)
            
        def on_close(self):
            print 'connection closed'
            ChatHandler.broadcaster.remove(self)
            
            
class StandupHandler(tornado.websocket.WebSocketHandler):
        broadcaster = BroadcasterForAllOfType()
        def open(self):
            print 'new connection'
            StandupHandler.broadcaster.addSocket(self)
              
        def on_message(self, message):                
            print 'new message'
            StandupHandler.broadcaster.broadcast(message)
            
            user = User.objects.get(pk=1)
            
            comment_obj = Comment.objects.create(user=user, comment=message)
            comment_obj.save()
            
        def on_close(self):
            print 'connection closed'
            StandupHandler.broadcaster.remove(self)
            
