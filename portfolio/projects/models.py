from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=50)
    content = models.TextField()


class ProjectGroupInfo(models.Model):
    project = models.ForeignKey("Project")
    groups = models.ForeignKey("Group")
    position = models.PositiveSmallIntegerField(default=0)


class Group(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    projects = models.ManyToManyField(Project, through=ProjectGroupInfo)
