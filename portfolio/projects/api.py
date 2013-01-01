from tastypie.resources import ModelResource
from portfolio.projects.models import Project, Group

class ProjectResource(ModelResource):
    class Meta:
        queryset = Project.objects.all()
        allowed_methods = ['get']


class GroupResource(ModelResource):
    class Meta:
        queryset = Group.objects.all()
        allowed_methods = ['get']