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
    created_datetime = models.DateTimeField(default=datetime.now)
    
    def __unicode__(self):
        return self.comment