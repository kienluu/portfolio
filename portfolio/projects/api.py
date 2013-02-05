from tastypie import fields
from tastypie.resources import ModelResource
from portfolio.projects.models import Project, Group
from portfolio.utilities.serializers import camel_case_json_serializer

class ProjectResource(ModelResource):
    class Meta:
        queryset = Project.objects.all()
        allowed_methods = ['get']
        serializer = camel_case_json_serializer


class GroupResource(ModelResource):
    class Meta:
        queryset = Group.objects.all()
        allowed_methods = ['get']
        serializer = camel_case_json_serializer

    projects = fields.ManyToManyField(ProjectResource,'projects', full=True)