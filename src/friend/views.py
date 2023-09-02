from django.shortcuts import render

# Create your views here.
# friend/views.py
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Friend
from .serializers import FriendSerializer

class FriendViewSet(viewsets.ModelViewSet):
    queryset = Friend.objects.all()
    serializer_class = FriendSerializer

    @action(detail=False, methods=['get'])
    def my_friends(self, request):
        friends = Friend.objects.filter(user=request.user)
        serializer = FriendSerializer(friends, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def search_users(self, request):
        query = request.query_params.get('query', '')
        users = User.objects.filter(username__icontains=query).exclude(id=request.user.id)
        serializer = FriendSerializer(users, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)