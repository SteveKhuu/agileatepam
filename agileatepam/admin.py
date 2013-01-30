'''
Created on Jan 29, 2013

@author: Stephen_Khuu
'''
from django.contrib import admin
from agileatepam.models import Comment, Sticky, Activity

class CommentAdmin(admin.ModelAdmin):
    list_display = ('comment', 'created_datetime')

class StickyAdmin(admin.ModelAdmin):
    list_display = ('assigned_id', 'colour')

class ActivityAdmin(admin.ModelAdmin):
    list_display = ('type', 'event_time')
    
admin.site.register(Comment, CommentAdmin)
admin.site.register(Sticky, StickyAdmin)
admin.site.register(Activity, ActivityAdmin)