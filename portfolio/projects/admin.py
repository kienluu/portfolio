from django.contrib import admin
from django.contrib.admin import TabularInline
from portfolio.projects.models import ProjectGroupInfo, Project, Group


class ProjectAdmin(admin.ModelAdmin):
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
