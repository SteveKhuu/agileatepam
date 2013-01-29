'''
Created on Jan 29, 2013

@author: Stephen_Khuu
'''
from django.contrib import admin
from agileatepam.models import Comment

class CommentAdmin(admin.ModelAdmin):
    list_display = ('comment', 'created_datetime')
    
admin.site.register(Comment, CommentAdmin)