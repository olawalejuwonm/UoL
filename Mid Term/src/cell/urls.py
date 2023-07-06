"""
URL configuration for cell project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import  path
from protein import api as protein_api
from pfam import api as pfam_api

urlpatterns = [
    path('api/protein/<str:pk>/', protein_api.proteinRequestHandler, name='protein_api'),
    path('api/proteins/<int:pk>/', protein_api.organismProteins, name='proteins_api'),
    path('api/pfam/<str:pk>/', pfam_api.domainDetails, name='pfam_api'),
    path('api/pfams/<int:pk>/', pfam_api.domainByTaxaId, name='pfam_api'),
    path('admin/', admin.site.urls),
]
