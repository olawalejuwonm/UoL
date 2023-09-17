# chat/serializers.py
from rest_framework import serializers
from .models import Chat, ChatMessage


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ['id', 'users', 'created_at']

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ['id', 'chat', 'sender', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']

    # def to_representation(self, instance):
    #     representation = super().to_representation(instance)
    #     representation['user_list'] = [user['id'] for user in representation['users']]
    #     return representation
    
