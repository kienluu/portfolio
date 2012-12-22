from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=50)
    content = models.TextField()

    def __unicode__(self):
        return u'%s' % self.title


class ProjectGroupInfo(models.Model):
    project = models.ForeignKey("Project")
    group = models.ForeignKey("Group")
    position = models.PositiveSmallIntegerField(default=0)

    def __unicode__(self):
        return u'%s:%s' % (self.project.title ,self.group.name)


class Group(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    projects = models.ManyToManyField(Project, through=ProjectGroupInfo)

    def __unicode__(self):
        return u'%s' % self.name
