from django.forms import model_to_dict
from django.shortcuts import render

# Create your views here.
# views.py
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response

from authn.serializers import UserSerializer
from .models import Chat
from .serializers import ChatSerializer
from authn.models import User

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
    
    #  def list(self, request, *args, **kwargs):
        # print(request.user, "request.user")
        # chat = request.user.chats.all()
        # # data = serializers.serialize('json', chat)
        # data = chat
    

        # # data['users'] = [user for user in chat.users.all()]
        # return Response(data)