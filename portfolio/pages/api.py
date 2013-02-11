from portfolio.pages.models import Page
from portfolio.utilities.cache import SimpleCache
from portfolio.utilities.resources import CachedModelResource
from portfolio.utilities.serializers import camel_case_json_serializer

class PageResource(CachedModelResource):
    class Meta:
        queryset = Page.objects.all()
        allowed_methods = ['get']
        serializer = camel_case_json_serializer
        cache = SimpleCache()