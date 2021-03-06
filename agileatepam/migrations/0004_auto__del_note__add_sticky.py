# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting model 'Note'
        db.delete_table('agileatepam_note')

        # Adding model 'Sticky'
        db.create_table('agileatepam_sticky', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('assigned_id', self.gf('django.db.models.fields.CharField')(max_length=1000)),
            ('text', self.gf('django.db.models.fields.CharField')(max_length=1000)),
            ('colour', self.gf('django.db.models.fields.CharField')(max_length=50)),
            ('position_x', self.gf('django.db.models.fields.IntegerField')(default=1)),
            ('position_y', self.gf('django.db.models.fields.IntegerField')(default=1)),
            ('size_x', self.gf('django.db.models.fields.IntegerField')(default=1)),
            ('size_y', self.gf('django.db.models.fields.IntegerField')(default=1)),
        ))
        db.send_create_signal('agileatepam', ['Sticky'])


    def backwards(self, orm):
        # Adding model 'Note'
        db.create_table('agileatepam_note', (
            ('size_x', self.gf('django.db.models.fields.IntegerField')(default=1)),
            ('size_y', self.gf('django.db.models.fields.IntegerField')(default=1)),
            ('position_x', self.gf('django.db.models.fields.IntegerField')(default=1)),
            ('position_y', self.gf('django.db.models.fields.IntegerField')(default=1)),
            ('text', self.gf('django.db.models.fields.CharField')(max_length=1000)),
            ('colour', self.gf('django.db.models.fields.CharField')(max_length=50)),
            ('assigned_id', self.gf('django.db.models.fields.CharField')(max_length=1000)),
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
        ))
        db.send_create_signal('agileatepam', ['Note'])

        # Deleting model 'Sticky'
        db.delete_table('agileatepam_sticky')


    models = {
        'agileatepam.activity': {
            'Meta': {'object_name': 'Activity'},
            'configuration': ('django.db.models.fields.CharField', [], {'max_length': '5000'}),
            'event_time': ('django.db.models.fields.DateTimeField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'note_id': ('django.db.models.fields.CharField', [], {'max_length': '1000'}),
            'type': ('django.db.models.fields.CharField', [], {'max_length': '20'})
        },
        'agileatepam.comment': {
            'Meta': {'object_name': 'Comment'},
            'comment': ('django.db.models.fields.CharField', [], {'max_length': '1000'}),
            'created_datetime': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['auth.User']"})
        },
        'agileatepam.sticky': {
            'Meta': {'object_name': 'Sticky'},
            'assigned_id': ('django.db.models.fields.CharField', [], {'max_length': '1000'}),
            'colour': ('django.db.models.fields.CharField', [], {'max_length': '50'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'position_x': ('django.db.models.fields.IntegerField', [], {'default': '1'}),
            'position_y': ('django.db.models.fields.IntegerField', [], {'default': '1'}),
            'size_x': ('django.db.models.fields.IntegerField', [], {'default': '1'}),
            'size_y': ('django.db.models.fields.IntegerField', [], {'default': '1'}),
            'text': ('django.db.models.fields.CharField', [], {'max_length': '1000'})
        },
        'auth.group': {
            'Meta': {'object_name': 'Group'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '80'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'})
        },
        'auth.permission': {
            'Meta': {'ordering': "('content_type__app_label', 'content_type__model', 'codename')", 'unique_together': "(('content_type', 'codename'),)", 'object_name': 'Permission'},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['contenttypes.ContentType']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'auth.user': {
            'Meta': {'object_name': 'User'},
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75', 'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Group']", 'symmetrical': 'False', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'}),
            'username': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '30'})
        },
        'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        }
    }

    complete_apps = ['agileatepam']