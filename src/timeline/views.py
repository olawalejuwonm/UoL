from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import StatusUpdate
from .serializers import StatusUpdateSerializer
from rest_framework.pagination import PageNumberPagination


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

class StatusUpdateViewSet(viewsets.ModelViewSet):
    queryset = StatusUpdate.objects.all()
    serializer_class = StatusUpdateSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = StatusUpdatePagination

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            permission_classes = [IsOwnerOrReadOnly]
        else:
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]




class UserStatusUpdateList(generics.ListAPIView):
    serializer_class = StatusUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return StatusUpdate.objects.filter(user=self.request.user)