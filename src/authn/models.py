from django.db import models

# Create your models here.
# auth/models.py
from django.contrib.auth.models import AbstractUser
import cloudinary
from cloudinary.models import CloudinaryField

class User(AbstractUser):
    avatar = CloudinaryField('media', null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.avatar:
            self.avatar = cloudinary.uploader.upload(self.avatar, 
                    resource_type="auto", folder="social" )['url']
        super(User, self).save(*args, **kwargs)


# from django.contrib.auth.models import User

# class User(models.Model):

#     user = models.OneToOneField(User, on_delete=models.CASCADE)

#     organisation = models.CharField(max_length=256, null=True, blank=True)

#     def __unicode__(self):
#         return self.user.username


