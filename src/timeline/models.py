from django.db import models

from django.core.exceptions import ValidationError
from django.db import models
from authn.models import User

# StatusUpdate model was used as name so that the name on the table
# is timeline_statusupdate

class StatusUpdate(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,
         null=False, blank=False)
    text = models.TextField(blank=True)
    # medias = CloudinaryField('media', null=True, blank=True)
    # medias will be a list of urls
    media = models.URLField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.user.username}: {self.text}'

    def save(self, *args, **kwargs):
        self.full_clean()
        super(StatusUpdate, self).save(*args, **kwargs)
    
