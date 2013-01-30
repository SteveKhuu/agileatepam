import tornado.websocket

from django.contrib.auth.models import User

from agileatepam.models import Comment

class ChatHandler(tornado.websocket.WebSocketHandler):
        def open(self):
            print 'new connection'
            self.write_message("Hello World")
              
        def on_message(self, message):                
            print 'new message'
            self.write_message(message)
            
            user = User.objects.get(pk=1)
            
            comment_obj = Comment.objects.create(user=user, comment=message)
            comment_obj.save()
            
        def on_close(self):
            print 'connection closed'