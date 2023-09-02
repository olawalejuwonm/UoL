# friend/serializers.py
from rest_framework import serializers
from .models import Friend

class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friend
        fields = ['id', 'user', 'friend', 'created_at']
        read_only_fields = ['id', 'created_at', 'user']