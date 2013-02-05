from django.contrib import admin
from portfolio.pages.models import Page


class PageAdmin(admin.ModelAdmin):
    class Media:
        js = [
            '/static/grappelli/tinymce/jscripts/tiny_mce/tiny_mce.js',
            '/static/grappelli/tinymce_setup/tinymce_setup.js',
        ]
    prepopulated_fields = {"slug": ("title",)}

admin.site.register(Page, PageAdmin)