# I wrote this code
# Importing the admin module from django.contrib package
from django.contrib import admin

# Importing the models module from the current package
from . import models as PfamModel

# Defining a custom admin class for the Domain model
class DomainAdmin(admin.ModelAdmin):
    # Specifying the fields to be displayed in the admin list view
    list_display = ('domain_id', 'domain_description')

# Defining a custom admin class for the DomainAnnotation model
class DomainAnnotationAdmin(admin.ModelAdmin):
    # Specifying the fields to be displayed in the admin list view
    list_display =('protein', 'pfam_id', 'start', 'stop', 'taxa_id', 'name',
                    'clade', 'description', 'length')
    # Excluding the genus and species fields from the admin form
    exclude=('genus','species') # This exclude genus and species from the form
    # As documented at https://docs.djangoproject.com/en/4.2/ref/contrib/admin/#django.contrib.admin.ModelAdmin.exclude

# Registering the Domain and DomainAnnotation models with their respective admin classes
admin.site.register(PfamModel.Domain, DomainAdmin)
admin.site.register(PfamModel.DomainAnnotation, DomainAnnotationAdmin)

# end of code I wrote