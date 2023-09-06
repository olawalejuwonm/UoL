from django.forms import model_to_dict
from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from authn.serializers import UserSerializer
from .models import StatusUpdate
from .serializers import StatusUpdateSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.decorators import action




class StatusUpdatePagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

# class StatusUpdateViewSet(viewsets.ModelViewSet):
#     queryset = StatusUpdate.objects.all()
#     serializer_class = StatusUpdateSerializer
#     permission_classes = [IsAuthenticated]
    # pagination_class = StatusUpdatePagination


#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)

# timeline/views.py
from rest_framework import viewsets, permissions, generics

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user

class TimelineViewSet(viewsets.ModelViewSet):
    queryset = StatusUpdate.objects.all().select_related('user')
    serializer_class = StatusUpdateSerializer
    # permission_classes = [permissions.IsAuthenticated]
    # pagination_class = StatusUpdatePagination

    # def get_queryset(self):
    #     print(self.request.user, "querySet")
    #     return StatusUpdate.objects.select_related('user').all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def list (self, request):
        queryset = StatusUpdate.objects.all().select_related('user')
        # serializer = StatusUpdateSerializer(queryset, many=True)
        # data = serializer.data
        # print(queryset, "queryset")
        for i in queryset:
            d = model_to_dict(i)
            u = model_to_dict(i.user)
            print("user", u)
            # print(model_to_dict(i.user), "user", d)
            # return Response(UserSerializer(model_to_dict(i.user), many=True).data)
            return Response(UserSerializer(u).data)

        # data['user'] = UserSerializer(model_to_dict(queryset.user)).data
        data = {}

    # def get_permissions(self):
    #     if self.action in ['update', 'partial_update', 'destroy']:
    #         permission_classes = [IsOwnerOrReadOnly]
    #     else:
    #         permission_classes = [permissions.AllowAny]
    #     return [permission() for permission in permission_classes]
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        queryset = StatusUpdate.objects.filter(user=request.user).select_related('user').all()
        serializer = StatusUpdateSerializer(queryset, many=True)
        return Response(serializer.data)
    
   




# class UserTimelineList(generics.ListAPIView):
#     serializer_class = StatusUpdateSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         return StatusUpdate.objects.filter(user=self.request.user).select_related('user').all()
    
#     # This will populate the user field with the current user
#     def list(self, request):
#         queryset = self.get_queryset()
#         serializer = StatusUpdateSerializer(queryset, many=True)
#         return Response(serializer.data)