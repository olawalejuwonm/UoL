from django.test import TestCase, Client
from django.urls import reverse
from rest_framework import status
from authn.models import User
from timeline.models import Post, Timeline
from timeline.serializers import PostSerializer

class TimelineTestCase(TestCase):
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
        self.post1 = Post.objects.create(
            author=self.user1,
            content='Hello, world!'
        )
        self.post2 = Post.objects.create(
            author=self.user2,
            content='Hi there!'
        )
        self.timeline1 = Timeline.objects.create(
            user=self.user1,
            post=self.post1
        )
        self.timeline2 = Timeline.objects.create(
            user=self.user2,
            post=self.post2
        )

    def test_fetch_timelines(self):
        url = reverse('timeline-fetch')
        self.client.force_login(self.user1)
        response = self.client.get(url)
        timelines = Timeline.objects.all()
        serializer = PostSerializer([timeline.post for timeline in timelines], many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_my_timeline(self):
        url = reverse('timeline-my')
        self.client.force_login(self.user1)
        response = self.client.get(url)
        timelines = Timeline.objects.filter(user=self.user1)
        serializer = PostSerializer([timeline.post for timeline in timelines], many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_post_timeline(self):
        url = reverse('timeline-post')
        self.client.force_login(self.user1)
        data = {
            'content': 'My new post!'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Post.objects.filter(author=self.user1, content='My new post!').exists())
        self.assertTrue(Timeline.objects.filter(user=self.user1, post__content='My new post!').exists())