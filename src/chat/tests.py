from django.test import TestCase, Client
from django.urls import reverse
from rest_framework import status
from authn.models import User
from chat.models import Message, Friend
from chat.serializers import MessageSerializer

class ChatTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.user1 = User.objects.create_user(
            username='testuser1',
            email='testuser1@example.com',
            password='testpass'
        )
        self.user2 = User.objects.create_user(
            username='testuser2',
            email='testuser2@example.com',
            password='testpass'
        )
        self.friend = Friend.objects.create(
            user=self.user1,
            friend=self.user2
        )
        self.message1 = Message.objects.create(
            sender=self.user1,
            recipient=self.user2,
            content='Hello, friend!'
        )
        self.message2 = Message.objects.create(
            sender=self.user2,
            recipient=self.user1,
            content='Hi there!'
        )

    def test_get_messages(self):
        url = reverse('chat-messages')
        response = self.client.get(url, {'friend_id': self.friend.id})
        messages = Message.objects.filter(friend=self.friend)
        serializer = MessageSerializer(messages, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)