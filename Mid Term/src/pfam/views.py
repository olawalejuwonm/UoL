from django.shortcuts import render
from django.views.generic.base import TemplateView

# Create your views here.

class Home(TemplateView):
    template_name = 'home.html'

def NotFound(request, exception): #implemented according to https://docs.djangoproject.com/en/4.2/topics/http/views/#customizing-error-views
    print("404 error")
    return render(request, '404.html', status=404)