'''
Created on Jan 29, 2013

@author: Stephen_Khuu
'''
import simplejson as json

from django.http import HttpResponse
from agileatepam.models import Comment

def get_comments(request):
    
    comments = Comment.objects.all()
    
    comment_data = []
    
    for comment in comments:
        
        comment_node = {
                        'comment' : comment.comment,
                        'user' : comment.user.username,
                        'posted_datetime' : comment.created_datetime.strftime('%Y-%m-%dT%H:%M:%S'),
                        }
        comment_data.append(comment_node)
        
    
    response_data = {
                     'comments' : comment_data
                     }
    
    return HttpResponse(json.dumps(response_data), content_type="application/json")