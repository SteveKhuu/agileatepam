'''
Created on Jan 29, 2013

@author: Stephen_Khuu
'''
from django.conf import settings
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect, get_object_or_404
from django.template.loader import render_to_string

from agileatepam.models import Comment

def index(request):
    
    context = {
               }
    
    return render(request, 'agileatepam/index.html', context)
