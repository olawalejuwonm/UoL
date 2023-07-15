from django.contrib import admin

# Register your models here.
from . import models as Model

class ProteinAdmin(admin.ModelAdmin):
    list_display = ('protein_id', 'sequence')


admin.site.register(Model.Detail, ProteinAdmin)