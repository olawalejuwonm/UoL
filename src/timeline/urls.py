# timeline/urls.py
from django.urls import path, include
from rest_framework import routers
from .views import StatusUpdateViewSet

router = routers.DefaultRouter()
router.register(r'', StatusUpdateViewSet)

urlpatterns = [
    path('', include(router.urls)),
]