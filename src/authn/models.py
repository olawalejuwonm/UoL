# I wrote this code following AbstractUser documentation from Django's official website 
# https://docs.djangoproject.com/en/3.2/topics/auth/customizing/#extending-the-existing-user-model
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    """
    A custom user model that extends Django's built-in AbstractUser model.
    """

    # This line defines a new model field called "name" that is a character field with a maximum length of 256 characters.
    # It is optional and can be blank.
    name = models.CharField(max_length=256, blank=True)

    # This line defines a new model field called "avatar" that is a URL field.
    # It is optional and defaults to a default image URL.
    avatar = models.URLField(blank=True, default="https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg")

# End of code I wrote