from django.urls import include, path
from . import views
from . import api
from django.contrib.auth.decorators import login_required

urlpatterns = [
    path('', views.GeneList.as_view(), name='index'),
    path('gene/<int:pk>', login_required(login_url='login')(views.GeneDetail.as_view()), name='gene'),
    path('delete/<int:pk>', login_required(login_url='login')(views.GeneDelete.as_view()), name='delete'),
    path('update/<int:pk>', login_required(login_url='login')(views.GeneUpdate.as_view()), name='update'),
    path('create_gene/', login_required(login_url='login')(views.GeneCreate.as_view()), name='create_gene'),
    path('list/<str:type>', views.GeneList.as_view(), name='list'),
    path('poslist/', views.GeneList.as_view(), name='poslist'),
    path('create_ec/', views.create_ec, name='create'),
    path('api/genes', api.GeneList.as_view(), name='genes_api'),
    path('api/gene/<int:pk>/', api.GeneDetail.as_view(), name='gene_api'),
    path('app/', views.SPA, name='spa'),
    path('register/', views.register, name='register'),
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout')
]
