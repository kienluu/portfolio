# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Project'
        db.create_table('projects_project', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('title', self.gf('django.db.models.fields.CharField')(max_length=50)),
            ('content', self.gf('django.db.models.fields.TextField')()),
        ))
        db.send_create_signal('projects', ['Project'])

        # Adding model 'ProjectGroupInfo'
        db.create_table('projects_projectgroupinfo', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('project', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['projects.Project'])),
            ('group', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['projects.Group'])),
            ('position', self.gf('django.db.models.fields.PositiveSmallIntegerField')(default=0)),
        ))
        db.send_create_signal('projects', ['ProjectGroupInfo'])

        # Adding model 'Group'
        db.create_table('projects_group', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=50)),
            ('description', self.gf('django.db.models.fields.CharField')(max_length=255)),
        ))
        db.send_create_signal('projects', ['Group'])


    def backwards(self, orm):
        # Deleting model 'Project'
        db.delete_table('projects_project')

        # Deleting model 'ProjectGroupInfo'
        db.delete_table('projects_projectgroupinfo')

        # Deleting model 'Group'
        db.delete_table('projects_group')


    models = {
        'projects.group': {
            'Meta': {'object_name': 'Group'},
            'description': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'}),
            'projects': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['projects.Project']", 'through': "orm['projects.ProjectGroupInfo']", 'symmetrical': 'False'})
        },
        'projects.project': {
            'Meta': {'object_name': 'Project'},
            'content': ('django.db.models.fields.TextField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'projects.projectgroupinfo': {
            'Meta': {'object_name': 'ProjectGroupInfo'},
            'group': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['projects.Group']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'position': ('django.db.models.fields.PositiveSmallIntegerField', [], {'default': '0'}),
            'project': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['projects.Project']"})
        }
    }

    complete_apps = ['projects']