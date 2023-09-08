from django.shortcuts import render

# Create your views here.
# friend/views.py
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User

from social.utils import populate_multiple
from .models import Friend
from .serializers import FriendSerializer

class FriendViewSet(viewsets.ModelViewSet):
    queryset = Friend.objects.all()
    serializer_class = FriendSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        friends = Friend.objects.filter(user=request.user)
        # serializer = FriendSerializer(friends, many=True)
        return Response(populate_multiple(friends, ['user', 'friend'], FriendSerializer))

    @action(detail=False, methods=['get'])
    def search_users(self, request):
        query = request.query_params.get('query', '')
        users = User.objects.filter(username__icontains=query).exclude(id=request.user.id)
        serializer = FriendSerializer(users, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def confirm_friend_request(self, request, pk=None):
        friend = self.get_object()
        friend.confirmed = True
        friend.save()
        serializer = FriendSerializer(friend)
        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)