from tastypie import fields
from tastypie.fields import ToManyField
from portfolio.projects.models import Project, Group, ProjectGroupInfo
from portfolio.utilities.cache import SimpleCache
from portfolio.utilities.resources import CachedModelResource
from portfolio.utilities.serializers import camel_case_json_serializer


class OrderByTroughField(ToManyField):

    def __init__(self, *args, **kwargs):
        if kwargs.get('position_field_name'):
            self.position_field_name = kwargs.pop('position_field_name')
        else:
            self.position_field_name = 'position'
        super(OrderByTroughField, self).__init__(*args, **kwargs)

    def dehydrate(self, bundle):
        m2m_dehydrated = super(OrderByTroughField, self).dehydrate(bundle)
        group = bundle.obj
        for m2m_bundle in m2m_dehydrated:
            project = m2m_bundle.obj
            position = getattr(ProjectGroupInfo.objects.get(
                project=project, group=group), self.position_field_name)
            m2m_bundle.data[self.position_field_name] = position
        m2m_dehydrated.sort(
            key=lambda bundle: bundle.data[self.position_field_name])
        return m2m_dehydrated


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

    projects = OrderByTroughField(ProjectResource,'projects', full=True)
