# chat/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import User

from friend.models import Friend
from .models import Chat, ChatMessage
from .serializers import ChatMessageSerializer

class ChatMessageConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print("connected")
        self.user_id = self.scope['url_route']['kwargs']['user_id']
        self.friend_id = self.scope['url_route']['kwargs']['friend_id']
        # check for chat with user and friend
        # if not exists, create chat
        chat = Chat.objects.filter(user1=self.user_id, user2=self.friend_id)
        if not chat:
            chat = Chat.objects.create(user1_id=self.friend_id, user2_id=self.user_id)
            if not chat:
                chat = Chat.objects.create(user1_id=self.user_id, user2_id=self.friend_id)
        chat = chat[0]
        self.chat_id = f'{chat.id}'
        # Check if chat exists
        chat = Chat.objects.filter(id=self.chat_id)
       
        self.chat_group_name = f'chat_{self.chat_id}'

        print(self.chat_group_name, self.chat_id, self.scope['user'])  


        # Join chat group
        await self.channel_layer.group_add(
            self.chat_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        print("disconnected")
        # Leave chat group
        await self.channel_layer.group_discard(
            self.chat_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        try: 
            print("received", text_data)
            data = json.loads(text_data)
            print(data)
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
        except Exception as e:
            print(e)

    async def chat_message(self, event):
        message = event['message']

        # Send chat message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))


#Mike

# import json

# from channels.generic.websocket import AsyncWebsocketConsumer


# class ChatConsumer(AsyncWebsocketConsumer):
    # async def connect(self):
    #     self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
    #     self.room_group_name = "chat_%s" % self.room_name

    #     # Join room group
    #     await self.channel_layer.group_add(self.room_group_name, self.channel_name)

    #     await self.accept()

    # async def disconnect(self, close_code):
    #     # Leave room group
    #     await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    # # Receive message from WebSocket
    # async def receive(self, text_data):
    #     text_data_json = json.loads(text_data)
    #     message = text_data_json["message"]

    #     # Send message to room group
    #     await self.channel_layer.group_send(
    #         self.room_group_name, {"type": "chat_message", "message": message}
    #     )

    # # Receive message from room group
    # async def chat_message(self, event):
        message = event["message"]

        # Send message to WebSocket
        await self.send(text_data=json.dumps({"message": message}))