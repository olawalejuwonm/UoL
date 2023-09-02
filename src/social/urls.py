"""
URL configuration for social project.

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
from django.urls import include, path

from rest_framework import routers
from authn.views import UserViewSet
from friend.views import FriendViewSet
router = routers.DefaultRouter()
from django.urls import path, include
from django.views.generic import TemplateView
from chat.routing import websocket_urlpatterns
from django.conf.urls import url

router.register(r'user', UserViewSet)
router.register(r'friends', FriendViewSet)





urlpatterns = [
    path('admin/', admin.site.urls),
    # path('user/', include('authn.urls')),
    path('timeline/', include('timeline.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('friends/<int:pk>/confirm/', FriendViewSet.as_view({'post': 'confirm_friend_request'}), name='confirm_friend_request'),
    path('', include(router.urls)),
    url(r'^ws/$', TemplateView.as_view(template_name='chat/index.html'), name='index'),
    url(r'^ws/', include(websocket_urlpatterns)),
]
