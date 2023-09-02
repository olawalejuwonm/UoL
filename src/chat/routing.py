# chat/routing.py
from django.urls import re_path
from .consumers import ChatMessageConsumer

websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<user_id>\d+)/(?P<friend_id>\d+)/$', ChatMessageConsumer.as_asgi()),
    # concatenate user_id and friend_id to form chat_id
    # chat_id = str(user_id) + '_' + str(friend_id)
    # example: chat_id = '123_456'
    # I use chat_id in the ChatMessageConsumer
]