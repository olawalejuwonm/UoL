from django.db import models

# Create your models here.
# auth/models.py
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    # username = models.CharField(max_length=256, unique=True)
    pass


# from django.contrib.auth.models import User

# class User(models.Model):

#     user = models.OneToOneField(User, on_delete=models.CASCADE)

#     organisation = models.CharField(max_length=256, null=True, blank=True)

#     def __unicode__(self):
#         return self.user.username


