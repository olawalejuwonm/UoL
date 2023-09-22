from django.forms import ValidationError
from django.shortcuts import render

from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from authn.models import User
from authn.serializers import UserSerializer

from social.utils import populate_multiple, response_format
from .models import Friend
from .serializers import FriendSerializer
from django.db.models import Q
from rest_framework import status


class FriendViewSet(viewsets.ModelViewSet):
    queryset = Friend.objects.all()
    serializer_class = FriendSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        friends = Friend.objects.filter(user=request.user)
        return Response(populate_multiple(friends, ['user', 'friend'], FriendSerializer))

    @action(detail=False, methods=['get'])
    def search_users(self, request):
        query = request.query_params.get('keyword', '')
        # search by name only
        users = User.objects.filter(name__icontains=query).exclude(id=request.user.id)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    
    def create(self):
        # check if friend request already exists
        friend_request_exists = Friend.objects.filter(user=self.request.user, 
        friend=self.request.data['friend']).exists()
        if friend_request_exists:
            # pass
            return Response(
                response_format(
                    'You have already sent a friend request to this user',
                      friend_request_exists),
                      status=status.HTTP_406_NOT_ACCEPTABLE)
        else:
            serialized = FriendSerializer(data=self.request.data)
            if serialized.is_valid():
                serialized.save(user=self.request.user)
                return Response(
                    response_format(
                        'Friend request sent successfully',
                        serialized.data),
                        status=status.HTTP_201_CREATED)
            else:
                return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['put'])
    def confirm_friend_request(self, request, pk=None):
        friend = self.get_object()
        if friend.friend != request.user:
            return Response(response_format(
                'You are not authorized to confirm this friend request',
            ), status=status.HTTP_401_UNAUTHORIZED)
        # check if already confirmed
        if friend.confirmed:
            return Response(response_format(
                'You have already confirmed this friend request',
            ), status=status.HTTP_406_NOT_ACCEPTABLE)
        friend.confirmed = True
        friend.save()
        serializer = FriendSerializer(friend)
        return Response(response_format(
            'Friend request confirmed',
            serializer.data
        ), status=status.HTTP_200_OK)
    
    # deny friend request
    @action(detail=True, methods=['delete'])
    def delete_friend(self, request, pk=None):
        friend = self.get_object()
        if friend.friend != request.user:
            return Response(response_format(
                'You are not authorized to deny this friend request',
            ), status=status.HTTP_401_UNAUTHORIZED)
        friend.delete()
        return Response(response_format(
            'Friend request denied',
        ), status=status.HTTP_200_OK)




