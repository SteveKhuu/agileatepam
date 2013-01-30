'''
Created on Jan 29, 2013

@author: Stephen_Khuu
'''
import datetime
from datetime import datetime
from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.sites.models import Site
from django.db import models
from django.utils import timezone

class Comment(models.Model):
    user = models.ForeignKey(User)
    comment = models.CharField(max_length=1000)
    created_datetime = models.DateTimeField(auto_now_add=True)
    
    def __unicode__(self):
        return self.comment
    
class Sticky(models.Model):
    assigned_id = models.CharField(max_length=1000)
    text = models.CharField(max_length=1000)
    colour = models.CharField(max_length=50)
    position_x = models.IntegerField(default=1)
    position_y = models.IntegerField(default=1)
    size_x = models.IntegerField(default=1)
    size_y = models.IntegerField(default=1)

    def __unicode__(self):
        return str(self.assigned_id) + " " + self.text
  
class Activity(models.Model):
    type = models.CharField(max_length=20)
    event_time = models.DateTimeField()
    sticky_id = models.CharField(max_length=1000)
    configuration = models.CharField(max_length=5000)
  
    def __unicode__(self):
        return self.type + " on Sticky " + str(self.sticky_id)