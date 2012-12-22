from django.contrib import admin
from django.contrib.admin.options import StackedInline
from portfolio.projects.models import ProjectGroupInfo, Project, Group


class ProjectAdmin(admin.ModelAdmin):
    pass


class ProjectGroupInfoInline(StackedInline):
    model = ProjectGroupInfo
    ordering = ['position']
class GroupAdmin(admin.ModelAdmin):
    inlines = [ProjectGroupInfoInline]

admin.site.register(Project, ProjectAdmin)
admin.site.register(Group, GroupAdmin)
