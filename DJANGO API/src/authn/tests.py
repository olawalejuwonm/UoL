from django.test import TestCase, Client
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from authn.models import User

class AuthenticationTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='testpass'
        )
        self.token = Token.objects.create(user=self.user)

    def test_register(self):
        url = "/user/register/"
        data = {
            'username': 'newuser',
            'email': 'newuser@example.com',
            'password': 'newpass'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username='newuser').exists())

    def test_login(self):
        url = '/user/login/'
        data = {
            'username': 'testuser',
            'password': 'testpass'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data['data'])

    def test_logout(self):
        url = '/user/logout/'
        auth_headers = {
            'HTTP_AUTHORIZATION': f'Bearer {self.token.key}'
        }
        response = self.client.post(url, **auth_headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(Token.objects.filter(user=self.user).exists())

    def test_profile_update(self):
        url = '/user/profile/'
        data = {
            'name': 'New Name',
        }
        # self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token.key}')
        auth_headers = {
            'HTTP_AUTHORIZATION': f'Bearer {self.token.key}'
        }
        response = self.client.put(url, data, format='json', **auth_headers)
        # self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertEqual(self.user.name, 'New Name')