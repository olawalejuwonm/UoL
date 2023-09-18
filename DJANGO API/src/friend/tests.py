from django.test import TestCase, Client
from django.urls import reverse
from rest_framework import status
from authn.models import User
from chat.models import FriendRequest, Friend
from chat.serializers import UserSerializer, FriendRequestSerializer, FriendSerializer

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
        self.user3 = User.objects.create_user(
            username='testuser3',
            email='testuser3@example.com',
            password='testpass'
        )
        self.friend_request = FriendRequest.objects.create(
            from_user=self.user1,
            to_user=self.user2
        )
        self.friend = Friend.objects.create(
            user=self.user1,
            friend=self.user2
        )

    def test_get_friends(self):
        url = reverse('chat-friends')
        self.client.force_login(self.user1)
        response = self.client.get(url)
        friends = Friend.objects.filter(user=self.user1)
        serializer = FriendSerializer(friends, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_search_users(self):
        url = reverse('chat-search')
        self.client.force_login(self.user1)
        response = self.client.get(url, {'query': 'testuser'})
        users = User.objects.filter(username__icontains='testuser').exclude(id=self.user1.id)
        serializer = UserSerializer(users, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_send_friend_request(self):
        url = reverse('chat-friend-requests')
        self.client.force_login(self.user1)
        data = {
            'to_user': self.user3.id
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(FriendRequest.objects.filter(from_user=self.user1, to_user=self.user3).exists())
