# I wrote this code
# Import the admin module from Django
from django.contrib import admin

# Import the models module from the current package
from . import models as Model

# Define a custom admin class for the Protein model


class ProteinAdmin(admin.ModelAdmin):
    # Define the fields to display in the admin list view
    list_display = ('protein_id', 'sequence')


# Register the Protein model with the custom admin class
admin.site.register(Model.Detail, ProteinAdmin)

# end of code I wrote
