from django.db import models

# Create your models here.
# chat/models.py
from django.db import models
from django.conf import settings
from authn.models import User


class Chat(models.Model):
    users = models.ManyToManyField(User, related_name='chats')
    created_at = models.DateTimeField(auto_now_add=True)
    # Date model was last updated
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Chat {self.id}'

class ChatMessage(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.sender.username} - {self.message}'