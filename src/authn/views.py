# Create your views here.
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from social.utils import response_format, upload_file
from .models import User
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from rest_framework import permissions
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
import cloudinary
from rest_framework.parsers import MultiPartParser, FormParser


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    # authentication_classes = []

    @action(detail=False, methods=['POST'], authentication_classes=[], permission_classes=[])
    def register(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(response_format(
                "Account created successfully",
                serializer.data
            ), status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['POST'], authentication_classes=[], permission_classes=[])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            serializer = UserSerializer(user)
            data = {
                'token': token.key,
                'user': serializer.data,
            }
            return Response(response_format(
                'Login successful',
                data
            ), status=status.HTTP_200_OK)
        else:
            return Response(response_format(
                'Invalid credentials',
            ), status=status.HTTP_401_UNAUTHORIZED)


    # Update user profile
    @action(detail=False, methods=['GET', 'PUT'], permission_classes=[IsAuthenticated])
    def profile(self, request):
        if request.method == 'GET':
            serializer = UserSerializer(request.user)
            return Response(response_format(
                'Profile retrieved successfully',
                serializer.data
            ), status=status.HTTP_200_OK)
        elif request.method == 'PUT':
            upload_file(request, 
                    resource_type="image",
                    transformation={"quality": "auto:eco"},
                    folder="avatar")
            serializer = UserSerializer(request.user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(response_format(
                    'Profile updated successfully',
                    serializer.data
                ), status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=False, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def logout(self, request):
        # Get the user's authentication token
        token = Token.objects.get(user=request.user)

        # Delete the user's authentication token
        token.delete()

        # Return a success response
        return Response(response_format('Successfully logged out.'), status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['delete'], permission_classes=[permissions.IsAuthenticated])
    def delete_account(self, request):
        user = request.user
        user.delete()
        return Response(response_format('Account deleted successfully'), status=status.HTTP_200_OK)