from django.contrib import admin

# Register your models here.
from . import models as PfamModel

class DomainAdmin(admin.ModelAdmin):
    list_display = ('domain_id', 'domain_description')

class DomainAnnotationAdmin(admin.ModelAdmin):
    list_display =('protein', 'pfam_id', 'start', 'stop', 'taxa_id', 'name',
                    'clade', 'description', 'length')
    exclude=('genus','species') # This exclude genus and species from the form
    # As documented at https://docs.djangoproject.com/en/4.2/ref/contrib/admin/#django.contrib.admin.ModelAdmin.exclude
    

admin.site.register(PfamModel.Domain, DomainAdmin)
admin.site.register(PfamModel.DomainAnnotation, DomainAnnotationAdmin)