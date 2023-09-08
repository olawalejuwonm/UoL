# timeline/serializers.py
from rest_framework import serializers
from .models import StatusUpdate

class StatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatusUpdate
        fields = ['id', 'user', 'text', 'media', 'created_at', 'updated_at']
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']