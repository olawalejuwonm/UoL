# I wrote this code
# Importing the models module from the Django database library
from django.db import models

# Importing the User model from the authn app
from authn.models import User

# Defining a Friend model that inherits from Django's Model class
class Friend(models.Model):
    """
    A model representing a friendship between two users.

    A friendship is represented by two User objects, a creation timestamp, and a confirmation status.

    Attributes:
        user (ForeignKey): The user who initiated the friendship.
        friend (ForeignKey): The user who received the friendship request.
        created_at (DateTimeField): The timestamp when the friendship was created.
        confirmed (BooleanField): The status of the friendship confirmation.
    """

    # Defining a ForeignKey field that references the User model with the CASCADE deletion rule
    # and a related name of 'friends'
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friends')

    # Defining a ForeignKey field that references the User model with the CASCADE deletion rule
    # and a related name of 'friend_of'
    friend = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friend_of')

    # Defining a DateTimeField that automatically sets the current date and time when a new Friend object is created
    created_at = models.DateTimeField(auto_now_add=True)

    # Defining a BooleanField that defaults to False to represent the confirmation status of the friendship
    confirmed = models.BooleanField(default=False)

    # Defining a Meta class to specify that the combination of user and friend fields should be unique
    class Meta:
        unique_together = ('user', 'friend')

    # Defining a string representation of the Friend object
    def __str__(self):
        """
        Returns a string representation of the Friend object.

        The string representation consists of the usernames of the user and friend objects
        separated by a hyphen.

        :return: A string representation of the Friend object.
        """
        return f'{self.user.username} - {self.friend.username}'
# End of code I wrote