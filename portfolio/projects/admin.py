from django.contrib import admin
from django.contrib.admin import TabularInline
from portfolio.projects.models import ProjectGroupInfo, Project, Group


class ProjectAdmin(admin.ModelAdmin):
    class Media:
        js = [
            '/static/grappelli/tinymce/jscripts/tiny_mce/tiny_mce.js',
            '/static/grappelli/tinymce_setup/tinymce_setup.js',
    ]
    prepopulated_fields = {"slug": ("title",)}


class ProjectGroupInfoInline(TabularInline):
    model = ProjectGroupInfo
    ordering = ['position']
    sortable_field_name = 'position'
    extra = 0
class GroupAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}
    inlines = [ProjectGroupInfoInline]


admin.site.register(Project, ProjectAdmin)
admin.site.register(Group, GroupAdmin)
