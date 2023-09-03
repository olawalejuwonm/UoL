# chat/consumers.py
import json
from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer

from friend.models import Friend
from .models import Chat, ChatMessage
from .serializers import ChatMessageSerializer

from authn.models import User



class ChatMessageConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print("connected")
        self.user_id = self.scope['url_route']['kwargs']['user_id']
        self.friend_id = self.scope['url_route']['kwargs']['friend_id']
        # check for chat with user and friend in chat.users many to many field
        # if not exists, create chat
        self.user = await sync_to_async(User.objects.get)(id=self.user_id)
        self.friend = await sync_to_async(User.objects.get)(id=self.friend_id)
        chat = await sync_to_async(Chat.objects.filter(users__id=self.user.id).filter(users__id=self.friend.id).first)()
        if not chat:
            chat = await sync_to_async(Chat.objects.create)()
            await sync_to_async(chat.users.add)(self.user, self.friend)
        self.chat_id = f'{chat.id}'
        # Check if chat exists
        # chat = Chat.objects.filter(id=self.chat_id)
       
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
            sender = await sync_to_async(User.objects.get)(id=sender_id)
            chat = await sync_to_async(Chat.objects.get)(id=self.chat_id)

            # Create chat message
            chat_message = await sync_to_async(ChatMessage.objects.create)(
                chat=chat,
                sender=sender,
                message=message
            )

            print(chat_message, "chat_message", self.chat_group_name)

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
        # message = event["message"]

        # # Send message to WebSocket
        # await self.send(text_data=json.dumps({"message": message}))