# chat/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import User
from .models import Chat, ChatMessage
from .serializers import ChatMessageSerializer

class ChatMessageConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.chat_id = self.scope['url_route']['kwargs']['chat_id']
        self.chat_group_name = f'chat_{self.chat_id}'

        # Join chat group
        await self.channel_layer.group_add(
            self.chat_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave chat group
        await self.channel_layer.group_discard(
            self.chat_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']
        sender_id = data['sender_id']
        sender = User.objects.get(id=sender_id)
        chat = Chat.objects.get(id=self.chat_id)

        # Create chat message
        chat_message = ChatMessage.objects.create(
            chat=chat,
            sender=sender,
            message=message
        )

        # Serialize chat message
        serializer = ChatMessageSerializer(chat_message)

        # Send chat message to group
        await self.channel_layer.group_send(
            self.chat_group_name,
            {
                'type': 'chat_message',
                'message': serializer.data
            }
        )

    async def chat_message(self, event):
        message = event['message']

        # Send chat message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))