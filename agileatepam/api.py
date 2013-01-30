'''
Created on Jan 29, 2013

@author: Stephen_Khuu
'''
import simplejson as json

from django.http import HttpResponse
from datetime import datetime, time
from time import strptime
import time

from agileatepam.models import Comment, Sticky, Activity
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
import requests
from requests.auth import HTTPBasicAuth

@csrf_exempt
def create_json_issue(request):
    if request.method == 'POST':
        try:
            json_data = json.loads(request.raw_post_data)
            
            submit_data = {
                           "fields": {
                                      "project":
                                   { 
                                      "key": "MH"
                                   },
                           "summary": json_data['title'],
                           "description": json_data['description'],
                           "issuetype": {
                              "name": json_data['issueType']
                           },
                           
                       }
                    }
            
            if json_data['storyPoints'] is not None and json_data['issueType'] == 'Story':
                submit_data["fields"]["customfield_10004"] = int(json_data['storyPoints'])
            
            headers = {'content-type': 'application/json'}
            
            result = requests.post("https://candianwolfpack.atlassian.net/rest/api/latest/issue",
                          data=json.dumps(submit_data),
                          headers=headers,
                          auth=HTTPBasicAuth('wolfpack', 'password1'))
            
            return HttpResponse(result.text)
        except Exception as e:
            print e.message
    return HttpResponse()
    
@csrf_exempt
def get_comments(request):
    
    datestring = "2010-01-30T21:49:36"
    
    '''
    if request.GET.get('lastDate') is not None: 
        datestring = request.GET.get('lastDate')
    '''
    date_query = datetime.strptime(datestring, '%Y-%m-%dT%H:%M:%S')
    
    comments = Comment.objects.filter(created_datetime__gte=date_query).order_by('created_datetime')
    
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

@csrf_exempt
def get_stickies(request):
    
    stickies = Sticky.objects.all()
    
    sticky_data = []
    
    for sticky in stickies:
        
        sticky_node = {
                        'id' : sticky.assigned_id,
                        'text' : sticky.text,
                        'colour' : sticky.colour,
                        'position_x' : sticky.position_x,
                        'position_y' : sticky.position_y,
                        'size_x' : sticky.size_x,
                        'size_y' : sticky.size_y,
                        }
        sticky_data.append(sticky_node)
        
    
    response_data = {
                     'stickies' : sticky_data,
                     'update_since' : datetime.now().strftime('%Y-%m-%dT%H:%M:%S')
                     }
    
    return HttpResponse(json.dumps(response_data), content_type="application/json")

@csrf_exempt
def get_activities(request):
    activities = Activity.objects.all().order_by('event_time')
    
    activity_data = []
    
    for activity in activities:
        
        activity_node = {
                        'type' : activity.type,
                        'event_time' : activity.event_time.strftime('%Y-%m-%dT%H:%M:%S'),
                        'sticky_id' : activity.sticky_id,
                        'configuration' : json.loads(activity.configuration),
                        }
        activity_data.append(activity_node)
        
    
    response_data = {
                     'activities' : activity_data
                     }
    
    return HttpResponse(json.dumps(response_data), content_type="application/json")

@csrf_exempt
def add_status(request):
    if request.method == 'POST':
        try:
            json_data = json.loads(request.raw_post_data)
            user = User.objects.get(pk=1)
            comment_obj = Comment.objects.create(user=user, comment=json_data['message'])
            comment_obj.save()
        except KeyError:
            return HttpResponse("Malformed data!")
    
    return HttpResponse()

@csrf_exempt
def get_all_open_issues(request):
    headers = {'content-type': 'application/json'}
            
    result = requests.get("https://candianwolfpack.atlassian.net/rest/api/latest/search?jql=project=MH AND status in (Open,\"In Progress\",Reopened)",
                          headers=headers,
                          auth=HTTPBasicAuth('wolfpack', 'password1'))
    
    return HttpResponse(result.text)

@csrf_exempt
def modify_storypoints(request):
    if request.method == 'POST':
        try:
            
            json_data = json.loads(request.raw_post_data)
            
            changedObject = {
                           "fields": {
                                "customfield_10004" : int(json_data['storyPoints'])
                                      }                           
                       }
                    
            
            issue_number = json_data['issueNumber']
            
            headers = {'content-type': 'application/json'}
            
            result = requests.put("https://candianwolfpack.atlassian.net/rest/api/latest/issue/" + issue_number,                         
                          headers=headers,
                          data=json.dumps(changedObject),
                          auth=HTTPBasicAuth('wolfpack', 'password1'));
                        
            return HttpResponse(result.text)
        
        except Exception as e:
            print e.message
    return HttpResponse()