from django.conf.urls import patterns, include, url
from django.contrib import admin
from tastypie.api import Api
from portfolio.pages.api import PageResource
from portfolio.projects.api import ProjectResource, GroupResource

admin.autodiscover()

api_v1 = Api(api_name='v1')
api_v1.register(ProjectResource())
api_v1.register(GroupResource())
api_v1.register(PageResource())

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'portfolio.views.home', name='home'),
    # url(r'^portfolio/', include('portfolio.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^grappelli/', include('grappelli.urls')),

    url(r'^media/', include('blobstore_storage.urls')),

    url(r'^api/', include(api_v1.urls))
)
