from django.forms import model_to_dict
from django.shortcuts import render

# Create your views here.
# views.py
from rest_framework import viewsets, permissions
from rest_framework.response import Response

from authn.serializers import UserSerializer
from social.utils import response_format
from .models import Chat, ChatMessage
from .serializers import ChatMessageSerializer, ChatSerializer
from authn.models import User
from rest_framework.decorators import action


class ChatViewSet(viewsets.ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.chats.all()

    def list(self, request, *args, **kwargs):
        chat = request.user.chats.all()
        serializer = self.get_serializer(chat, many=True)
        data = serializer.data
        # This populate the users id in each chat dictionary
        print(data, "data")
        for chat in data:
            print(chat)
            # OrderedDict([('id', 2), ('users', [1]) get id from the order dict
            users_id = chat.pop('users')
            print(users_id, "users_id")
            # users_id = chat
            # get all data of users_id in User model
            users = []
            for user_id in users_id:
                print(user_id, "user_id")
                user = User.objects.get(id=user_id)
                users.append(user)
            chat['users'] = UserSerializer(users, many=True).data
            print(chat)
        return Response(data)
    
    # get chat messages with a user
    @action(detail=False, methods=['get'])
    def messages(self, request):
        friend_id = request.query_params.get('friend_id')
        print(friend_id, "friend_id", request.user.id)
        chat_messages = ChatMessage.objects.filter(chat__users__id=request.user.id).filter(chat__users__id=friend_id)
        print(chat_messages, "chat_messages")
        serializer = ChatMessageSerializer(chat_messages, many=True)
        return Response(response_format(
            'Chat messages retrieved successfully',
            serializer.data
        ))
    