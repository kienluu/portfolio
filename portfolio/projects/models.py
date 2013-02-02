from django.db import models
from django.template.defaultfilters import slugify

class Project(models.Model):
    slug = models.SlugField(null=True)
    title = models.CharField(max_length=50)
    content = models.TextField()

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super(Project, self).save(*args, **kwargs)

    def __unicode__(self):
        return u'%s' % self.title


class ProjectGroupInfo(models.Model):
    project = models.ForeignKey("Project")
    group = models.ForeignKey("Group")
    position = models.PositiveSmallIntegerField(default=0)

    def __unicode__(self):
        return u'%s:%s' % (self.project.title ,self.group.name)


class Group(models.Model):
    slug = models.SlugField(null=True, max_length=20)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    projects = models.ManyToManyField(Project, through=ProjectGroupInfo)

    def save(self, force_insert=False, force_update=False, using=None):
#    def save(self, *args, **kwargs):
        print 'saving'
        if not self.slug:
            self.slug = slugify(self.name)
#        super(Group, self).save(*args, **kwargs)
        super(Group, self).save(force_insert, force_update, using)

    def __unicode__(self):
        return u'%s' % self.name
