from django.urls import path
from . import api


urlpatterns = [
    # TODO: Homepage that'll display all links
    path('<str:pk>/', api.proteinRequestHandler, name='protein_api'),
]
