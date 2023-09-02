# chat/serializers.py
from rest_framework import serializers
from .models import ChatMessage

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ['id', 'chat', 'sender', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ['id', 'chat', 'sender', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']