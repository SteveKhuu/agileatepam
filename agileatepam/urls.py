from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

from agileatepam import views, api

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'agileatepam.views.home', name='home'),
    # url(r'^agileatepam/', include('agileatepam.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
     url(r'^$', views.index, name='index'),
     url(r'^admin/', include(admin.site.urls)),
     
     ### Actions ###
     url(r'^add_sticky_note/$', views.add_sticky_note, name='add_sticky_note'),
     url(r'^delete_sticky_note/$', views.delete_sticky_note, name='delete_sticky_note'),
     url(r'^edit_sticky_note/$', views.edit_sticky_note, name='edit_sticky_note'),
     url(r'^move_sticky_note/$', views.move_sticky_note, name='move_sticky_note'),
     
     ### APIS ###
     url(r'^api/get_all_open_issues/$', api.get_all_open_issues, name='get_all_open_issues'),
     url(r'^api/get_comments/$', api.get_comments, name='get_comments'),
     url(r'^api/create_json_issue/$', api.create_json_issue, name='create_json_issue'),
     url(r'^api/add_status/$', api.add_status, name='add_status'),
     url(r'^api/get_stickies/$', api.get_stickies, name='get_stickies'),
     url(r'^api/get_activities/$', api.get_activities, name='get_activities'),
)
