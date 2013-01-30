'''
Created on Jan 29, 2013

@author: Stephen_Khuu
'''
import simplejson as json

from django.conf import settings
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect, get_object_or_404
from django.template.loader import render_to_string
from django.views.decorators.csrf import csrf_exempt
from agileatepam.models import Comment, Sticky, Activity

from datetime import datetime

import uuid

def index(request):
    
    context = {
               }
    
    return render(request, 'agileatepam/index.html', context)

@csrf_exempt
def add_sticky_note(request):
  
    assigned_id = ""
  
    if request.method == 'POST':
    
        try:
            json_data = json.loads(request.raw_post_data)
            assigned_id=uuid.uuid1().hex
      
            new_text = json_data['text']
            new_colour = json_data['colour']
            sticky_object = Sticky.objects.create(assigned_id=str(assigned_id), text=new_text, colour=new_colour)
            sticky_object.save()
            
            config = {
                      'text' : new_text,
                      'colour' : new_colour,
                      }
            activity = Activity.objects.create(type='add', event_time=datetime.now(), sticky_id=assigned_id, configuration=json.dumps(config))
      
        except KeyError:
            return HttpResponse("Malformed data!")
    
    return HttpResponse(assigned_id)

@csrf_exempt
def delete_sticky_note(request):
  
    assigned_id = ""
  
    if request.method == 'POST':

      try:
          json_data = json.loads(request.raw_post_data)
          assigned_id = json_data['assigned_id']
      
          sticky_object = get_object_or_404(Sticky, assigned_id=assigned_id)
          sticky_object.delete()
      
          activity = Activity.objects.create(type='delete', event_time=datetime.now(), sticky_id=assigned_id, configuration={})
      
      except KeyError:
          return HttpResponse("Malformed data!")
      
    return HttpResponse("Sticky %s deleted" % assigned_id)

@csrf_exempt
def edit_sticky_note(request):
  
    assigned_id = ""
  
    if request.method == 'POST':
    
        try:
            json_data = json.loads(request.raw_post_data)
            assigned_id = json_data['assigned_id']
            new_text = json_data['text']
            new_colour = json_data['colour']
            
            sticky_object = get_object_or_404(Sticky, assigned_id=assigned_id)
            sticky_object.text = new_text
            sticky_object.colour = new_colour
            sticky_object.save()
            
            config = {
                      'text' : new_text,
                      'colour' : new_colour,
                      }
            activity = Activity.objects.create(type='edit', event_time=datetime.now(), sticky_id=assigned_id, configuration=json.dumps(config))
      
        except KeyError:
            return HttpResponse("Malformed data!")
    
    return HttpResponse("Sticky %s edited" % assigned_id)

@csrf_exempt
def move_sticky_note(request):
  
    assigned_id = ""
  
    if request.method == 'POST':
    
        try:
            json_data = json.loads(request.raw_post_data)
            assigned_id = json_data['assigned_id']
            new_x = json_data['position_x']
            new_y = json_data['position_y']
            
            sticky_object = get_object_or_404(Sticky, assigned_id=assigned_id)
            sticky_object.position_x = new_x
            sticky_object.position_y = new_y
            sticky_object.save()
            
            config = {
                      'position_x' : new_x,
                      'position_y' : new_y,
                      }
            activity = Activity.objects.create(type='move', event_time=datetime.now(), sticky_id=assigned_id, configuration=json.dumps(config))
            
        except KeyError:
            return HttpResponse("Malformed data!")
    
    return HttpResponse("Sticky %s moved" % assigned_id)