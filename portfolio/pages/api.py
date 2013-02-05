from tastypie import fields
from tastypie.resources import ModelResource
from portfolio.pages.models import Page
from portfolio.projects.models import Project, Group
from portfolio.utilities.serializers import camel_case_json_serializer

class PageResource(ModelResource):
    class Meta:
        queryset = Page.objects.all()
        allowed_methods = ['get']
        serializer = camel_case_json_serializer
