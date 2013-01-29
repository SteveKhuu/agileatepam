import tornado.httpserver
import tornado.ioloop
import tornado.web
from threading import Thread
from agileatepam.WebSockets import ChatHandler

try:
    application = tornado.web.Application([
            (r'/chat', ChatHandler),
        ])
         
    http_server = tornado.httpserver.HTTPServer(application)
    http_server.listen(8888)
    thread = Thread(target = tornado.ioloop.IOLoop.instance().start)
    thread.daemon = True
    thread.start()
except Exception as e:
    print 'swalloed exception from django fork'