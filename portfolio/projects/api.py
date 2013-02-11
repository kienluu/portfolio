from tastypie import fields
from portfolio.projects.models import Project, Group
from portfolio.utilities.cache import SimpleCache
from portfolio.utilities.resources import CachedModelResource
from portfolio.utilities.serializers import camel_case_json_serializer

class ProjectResource(CachedModelResource):
    class Meta:
        queryset = Project.objects.all()
        allowed_methods = ['get']
        serializer = camel_case_json_serializer
        cache = SimpleCache()


class GroupResource(CachedModelResource):
    class Meta:
        queryset = Group.objects.all()
        allowed_methods = ['get']
        serializer = camel_case_json_serializer
        cache = SimpleCache()

    projects = fields.ManyToManyField(ProjectResource,'projects', full=True)