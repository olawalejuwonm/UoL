from django.db import models

# Create your models here.
from django.db import models
from django.conf import settings
import cloudinary
from cloudinary.models import CloudinaryField

# StatusUpdate model was used as name so that the name on the table
# is timeline_statusupdate

class StatusUpdate(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
         null=False, blank=False)
    text = models.CharField(max_length=280)
    # medias = CloudinaryField('media', null=True, blank=True)
    # medias will be a list of urls
    media = CloudinaryField('media', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.user.username}: {self.text}'
    
    # This will automatically update the medias field to the cloudinary url
    # of the uploaded image
    # After save
    def save(self, *args, **kwargs):
        if self.media:
            self.media = cloudinary.uploader.upload(self.media, 
                    resource_type="auto", type="list", folder="social" )['url']
        super(StatusUpdate, self).save(*args, **kwargs)
