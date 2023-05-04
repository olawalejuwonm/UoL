from django.shortcuts import render

from .models import *

def index(request):
    response_string = Hello.objects.all()[0]
    return render(request, 'helloworld/index.html', {'data': response_string})
# Create your views here.
