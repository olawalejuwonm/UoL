from django.shortcuts import render

# Create your views here.
# views.py
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Chat
from .serializers import ChatSerializer

class ChatViewSet(viewsets.ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.chats.all()

    def retrieve(self, request, *args, **kwargs):
        chat = self.get_object()
        serializer = self.get_serializer(chat)
        data = serializer.data
        data['users'] = [user.id for user in chat.users.all()]
        return Response(data)