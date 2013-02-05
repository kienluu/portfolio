from django.db import models
from django.template.defaultfilters import slugify

class Page(models.Model):
    """
    Simple page model to hold html content.

    fixtures/required_pages will hold the required pages.
    """
    slug = models.SlugField()
    title = models.CharField(max_length=255)
    content = models.TextField()

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super(Page, self).save(*args, **kwargs)

    def __unicode__(self):
        return unicode(self.title)