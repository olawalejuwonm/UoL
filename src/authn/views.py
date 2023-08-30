# Create your views here.
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from social.utils import response_format
from .models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from rest_framework import permissions
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

@api_view(['POST'])
#This code adds the AllowAny permission class to the register view using the 
# @permission_classes decorator. This allows unauthenticated access to the view.
@permission_classes([AllowAny])
def register(request):
    print(request.data, "request.data")
    serializer = UserSerializer(data=request.data)
    print(serializer, "serializer")
    if serializer.is_valid():
        serializer.save()
        return Response(response_format(
            "User created successfully",
            serializer.data
        ), status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
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
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)