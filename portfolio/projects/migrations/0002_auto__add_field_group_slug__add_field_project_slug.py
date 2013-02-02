# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding field 'Group.slug'
        db.add_column('projects_group', 'slug',
                      self.gf('django.db.models.fields.SlugField')(max_length=20, null=True),
                      keep_default=False)

        # Adding field 'Project.slug'
        db.add_column('projects_project', 'slug',
                      self.gf('django.db.models.fields.SlugField')(max_length=50, null=True),
                      keep_default=False)


    def backwards(self, orm):
        # Deleting field 'Group.slug'
        db.delete_column('projects_group', 'slug')

        # Deleting field 'Project.slug'
        db.delete_column('projects_project', 'slug')


    models = {
        'projects.group': {
            'Meta': {'object_name': 'Group'},
            'description': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'}),
            'projects': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['projects.Project']", 'through': "orm['projects.ProjectGroupInfo']", 'symmetrical': 'False'}),
            'slug': ('django.db.models.fields.SlugField', [], {'max_length': '20', 'null': 'True'})
        },
        'projects.project': {
            'Meta': {'object_name': 'Project'},
            'content': ('django.db.models.fields.TextField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'slug': ('django.db.models.fields.SlugField', [], {'max_length': '50', 'null': 'True'}),
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