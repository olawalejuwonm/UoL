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
from protein import views as protein_views
from pfam import api as pfam_api
from pfam import views as pfam_views
# from django.conf.urls import handler404 # Documented at https://docs.djangoproject.com/en/4.2/topics/http/views/#customizing-error-views
handler404 = "pfam.views.NotFound"

urlpatterns = [
    path('', pfam_views.Home.as_view(), name='index'),
    path('api/protein/<str:pk>/', protein_api.ProteinDetail.as_view(), name='protein_api'),
    path('api/proteins/<int:pk>/', protein_api.organismProteins, name='proteins_api'),
    path('api/pfam/<str:pk>/', pfam_api.domainDetails, name='pfam_api'),
    path('api/pfams/<int:pk>/', pfam_api.domainByTaxaId, name='pfam_api'),
    path('api/coverage/<str:pk>/', protein_api.coverage, name='coverage_api'),
    path('admin/', admin.site.urls),
]
