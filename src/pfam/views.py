from typing import Any, Dict
from django.shortcuts import render
from django.views.generic.base import TemplateView
from scripts.random_organism import API

organism_name, kingdom = API.get_random_species()


class Home(TemplateView):
    template_name = 'home.html'

    def get_context_data(self): # documentation at https://docs.djangoproject.com/en/4.2/ref/class-based-views/mixins-single-object/#django.views.generic.detail.SingleObjectMixin.get_context_data
        context = super().get_context_data()
        try:
            context['organism_name'] = organism_name
            context['kingdom_name'] = kingdom
        except Exception as e:
            context['organism_name'] = None
            context['kingdom_name'] = None
        return context


# implemented according to https://docs.djangoproject.com/en/4.2/topics/http/views/#customizing-error-views
def NotFound(request, exception):
    print("404 error")
    return render(request, '404.html', status=404)
