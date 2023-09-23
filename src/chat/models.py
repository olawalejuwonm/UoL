# I wrote this code
from django.db import models
from authn.models import User


class Chat(models.Model):
    """
    A model representing a chat between multiple users.
    """
    users = models.ManyToManyField(User, related_name='chats') # A many-to-many
    # relationship between the Chat and User models
    created_at = models.DateTimeField(auto_now_add=True) # A DateTimeField that
    # automatically sets the value to the current date and time when the object is created
    updated_at = models.DateTimeField(auto_now=True) # A DateTimeField that 
    # automatically updates the value to the current date and time whenever the object is saved

    def __str__(self):
        """
        Return a string representation of the chat.
        """
        return f'Chat {self.id}'


class ChatMessage(models.Model):
    """
    A model representing a chat message.
    """
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='messages') #
    # A foreign key relationship between the ChatMessage and Chat models, with the on_delete parameter set to CASCADE to delete all ChatMessage objects when the related Chat object is deleted
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    # A foreign key relationship between the ChatMessage and User models, with the on_delete parameter set to CASCADE to delete all ChatMessage objects when the related User object is deleted
    message = models.TextField() # A TextField to store the message content
    created_at = models.DateTimeField(auto_now_add=True) # A DateTimeField that
    # automatically sets the value to the current date and time when the object is created

    def __str__(self):
        """
        Return a string representation of the chat message.
        """
        return f'{self.sender.username} - {self.message}'

# End of code I wrote