import tornado.httpserver
import tornado.ioloop
import tornado.web
from threading import Thread
from agileatepam.WebSockets import ChatHandler, StandupHandler

try:
    application = tornado.web.Application([
            (r'/chat', ChatHandler),
            (r'/status', StandupHandler),
        ])
         
    http_server = tornado.httpserver.HTTPServer(application)
    http_server.listen(16052)
    thread = Thread(target = tornado.ioloop.IOLoop.instance().start)
    thread.daemon = True
    thread.start()
except Exception as e:
    print 'swalloed exception from django fork'