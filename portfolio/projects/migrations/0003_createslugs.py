# -*- coding: utf-8 -*-
import datetime
from django.template.defaultfilters import slugify
from south.db import db
from south.v2 import DataMigration
from django.db import models

class Migration(DataMigration):

    def forwards(self, orm):
        "Write your forwards methods here."
        # Note: Remember to use orm['appname.ModelName'] rather than "from appname.models..."

        print 'running', orm['projects.Group'].objects.count()
        # Save to compute and set the new slug field values.
        # If you look in south's orm.py  make_model method it appears that
        # only knowledge of the models base class are known.  Certain fields
        # are passed to it to simulate the real model.  The real models save
        # method is not called.  Must manually save here or call the real save
        # method by using the real model.  Of course this will crash if the real
        # model's save method do not contain the current fields!
        # A Manual save seems the best solution.
        for group in orm['projects.Group'].objects.all():
            group.slug = slugify(group.name)
            group.save()
        for project in orm.Project.objects.all():
            project.slug = slugify(project.title)
            project.save()

    def backwards(self, orm):
        "Write your backwards methods here."

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
    symmetrical = True
