# I wrote this code
# Importing necessary modules
from django.shortcuts import render
from django.views.generic.base import TemplateView
from scripts.random_organism import API

# Getting a random organism name and its kingdom
organism_name, kingdom = API.get_random_species()

# Creating a class-based view for the home page


class Home(TemplateView):
    template_name = 'home.html'
# end of code I wrote

    # I modified this code according to https://docs.djangoproject.com/en/4.2/ref/class-based-views/base/#django.views.generic.base.TemplateView.get_context_data
    # Overriding the get_context_data method to add context to the template
    def get_context_data(self):
        # Calling the parent class's get_context_data method to get the default context
        context = super().get_context_data()
        try:
            # Adding the organism name and kingdom to the context
            context['organism_name'] = organism_name
            context['kingdom_name'] = kingdom
        except Exception as e:
            print(e)
            # If there is an exception, setting the organism name and kingdom to None
            context['organism_name'] = None
            context['kingdom_name'] = None
        return context
    # end of code I modified

# I modified this code according to https://docs.djangoproject.com/en/4.2/topics/http/views/#customizing-error-views
# Creating a custom view for 404 errors


def NotFound(request, exception):
    # Rendering the 404.html template with a 404 status code
    return render(request, '404.html', status=404)
# end of code I modified
